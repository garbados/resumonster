# Resumonster

Like favstar but open source and for allllll the social mediaz.

## Install

    npm install -g resumonster

If that doesn't work, try prepending `sudo`.

## Usage

Let's see Oreo's most popular tweets.

    resumake --twitter oreo

That will give us something like this:

    [ [ { created_at: 'Mon Feb 04 01:48:18 +0000 2013',
      text: 'Power out? No problem. http://t.co/dnQ7pOgC',
      favorite_count: 6351,
      retweet_count: 15891 },
    { created_at: 'Tue Jun 26 00:02:00 +0000 2012',
      text: 'Celebrate your pride for love! #dailytwist http://t.co/ryqS3HyK',
      favorite_count: 1058,
      retweet_count: 3117 },
    { created_at: 'Tue Oct 02 19:23:41 +0000 2012',
      text: 'Up high. Down low. Around the back. Oreo. #dailytwist #highfive http://t.co/VATHVgCR',
      favorite_count: 651,
      retweet_count: 1241 },
    { created_at: 'Mon Jul 22 19:42:48 +0000 2013',
      text: 'Prepare the royal bottle service! http://t.co/Nlks2kT7Sw',
      favorite_count: 428,
      retweet_count: 1032 },
    { created_at: 'Mon Aug 06 00:00:02 +0000 2012',
      text: 'We come in peace. With Oreo cookies. #dailytwist http://t.co/8pWggzzF',
      favorite_count: 212,
      retweet_count: 860 } ] ]

Resumonster stores these results locally using [PouchDB](http://pouchdb.com/), so that you can build up history over time. Whenever you run `resumake`, it collects data only since the last run.

Oh, let's try their Facebook, too:

    resumake -t oreo --facebook oreo

And maybe their LinkedIn:

    resumake -tf oreo --linkedin oreo

Want to save these results? Just output into a file:

    resumake -tfl oreo > oreo.json

How many networks can you use? Here's a list:

* Twitter
* Facebook (Coming soon!)
* LinkedIn (Coming soon!)
* GitHub (Coming soon!)
* Tumblr (Coming soon!)
* ...request more by [filing an issue]() :D

The first time Resumonster attempts to use a social network, it'll ask for the credentials it needs to do so, and then store them in `~/.resumonster.json`. Here's how to get those credentials:

* Twitter
* Facebook
* LinkedIn
* GitHub
* Tumblr

## Testing

Coming soon!

## License

[MIT](http://opensource.org/licenses/MIT), yo.