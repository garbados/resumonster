var Twit = require('twit'),
    async = require('async'),
    RateLimiter = require('limiter').RateLimiter,
    limiter = new RateLimiter(180, 900000),
    limit = limiter.removeTokens.bind(limiter, 1);

module.exports = function (pouch, config) {
  var T = new Twit({
    consumer_key:         config.consumer.key,
    consumer_secret:      config.consumer.secret,
    access_token:         config.access.key,
    access_token_secret:  config.access.secret
  });

  function save_tweets (tweets, done) {
    pouch.bulkDocs({
      docs: tweets
    }, function (err, response) {
      if (err) {
        done(err);
      } else {
        done(null, response);
      }
    });
  }

  function get_last_tweet (username, done) {
    pouch.query({
      map: function (doc) {
        if (doc.type === 'twitter') {
          emit(doc.username, doc._id);
        }
      }
    }, {
      limit: 1,
      key: username
    }, function (err, response) {
      var id;

      if (response.rows.length) {
        id = response.rows[0].value;
      }

      if (err) {
        done(err);
      } else {
        done(null, id);
      }
    });
  }

  function get_new_tweets (username, since_id, done) {
    var 
        // list of tweets gathered by `async.whilst`
        timeline = [],
        // the number of tweets returned by the last run.
        count,
        max_id = null,
        opts = {
          screen_name: username,
          trim_user: true,
          count: 200
        };

    if (since_id) opts.since_id = since_id;

    async.doWhilst(function (done) {
      if (max_id) opts.max_id = max_id - 1;

      limit(function (err) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          T.get('statuses/user_timeline', opts, function (err, tweets) {
            if (err) {
              done(err);
            } else {
              count = tweets.length;

              if (tweets.length) {
                max_id = tweets[tweets.length - 1].id_str;
                timeline = timeline.concat.apply(timeline, tweets);
              }

              done(null);
            }
          });
        }
      });
    }, function () {
      // return true while each iteration returned >1 tweets
      return count > 1;
    }, function (err) {
      if (err) {
        done(err);
      } else {
        done(null, timeline);
      }
    });
  }

  function format_timeline (username, timeline) {
    var tweets = timeline
      .map(function (tweet) {
        return {
          _id: tweet.id_str,
          type: 'twitter',
          username: username,
          created_at: tweet.created_at,
          text: tweet.text,
          favorite_count: tweet.favorite_count,
          retweet_count: tweet.retweet_count
        };
      });

    return tweets;
  }

  function get_all_tweets (username, done) {
    pouch.query({
      map: function (doc) {
        if (doc.type === 'twitter') {
          emit(doc.username, null);
        }
      }
    }, {
      key: username,
      include_docs: true
    }, function (err, response) {
      if (err) {
        done(err);
      } else {
        var rows = response.rows.map(function (row) {
          return row.doc;
        });

        done(null, rows);
      }
    });
  }

  return function (username, done) {
    async.waterfall([
      get_last_tweet.bind(null, username),
      get_new_tweets.bind(null, username),
      function (timeline, done) {
        var tweets = format_timeline(username, timeline);
        done(null, tweets);
      },
      save_tweets
    ], function (err) {
      if (err) {
        done(err);
      } else {
        get_all_tweets(username, function (err, tweets) {
          if (err) {
            done(err);
          } else {
            tweets = tweets.sort(function(a, b) {
              return (b.retweet_count + b.favorite_count) - (a.retweet_count + a.favorite_count);
            }).slice(0,5).map(function (tweet) {
              ['_id', '_rev', '_conflicts', 'type'].forEach(function (field) {
                delete tweet[field];
              });

              return tweet;
            });

            done(null, tweets);
          }
        });
      }
    });
  };
};
