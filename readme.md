# Resumaker

Like favstar but open source and for allllll the social mediaz.

## Install

    npm install -g resumaker

If that doesn't work, try prepending `sudo`.

## Usage

Let's see what Oreo's most popular tweets are from the last [TODO] months.

    resumake --twitter oreo

That will give us something like this:

    TODO

Resumaker stores these results in a CouchDB or Cloudant instance, so that you can build up history over time. Whenever you run `resumake`, it collects data only since the last run.

Oh, let's try their Facebook, too:

    resumake -t oreo --facebook oreo

And maybe their LinkedIn:

    resumake -tf oreo --linkedin oreo

Want to save these results? Just output into a file:

    resumake -tfl oreo > oreo.txt

Want it in a different format? Like JSON?

    resumake -tfl oreo --format json > oreo.json

How many networks can you use? Here's a list:

* Twitter
* Facebook
* LinkedIn
* GitHub
* Tumblr
* ...request more by [filing an issue]() :D

The first time Resumaker attempts to use a social network, it'll ask for the credentials it needs to do so, and then store them in `~/.resumaker.json`. Here's how to get those credentials:

* Twitter
* Facebook
* LinkedIn
* GitHub
* Tumblr

## Testing

    npm test

## License

[MIT](http://opensource.org/licenses/MIT), yo.