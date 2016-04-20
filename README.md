# wolfram-irc
[![npm status](http://img.shields.io/npm/v/wolfram-irc.svg)](https://www.npmjs.org/package/wolfram-irc)
[![build status](https://secure.travis-ci.org/clux/wolfram-irc.svg)](http://travis-ci.org/clux/wolfram-irc)
[![dependency status](https://david-dm.org/clux/wolfram-irc.svg)](https://david-dm.org/clux/wolfram-irc)
[![coverage status](http://img.shields.io/coveralls/clux/wolfram-irc.svg)](https://coveralls.io/r/clux/wolfram-irc)

A simple IRC bot that connects to a server/channel of choice and will relay any messages addressed to it in the channel to [Wolfram Alpha](http://http://www.wolframalpha.com/) for quick answers to your precise questions.

## Usage/Installation
You may need to install libxml outside npm first:

```sh
sudo apt-get install libxml2-dev # for libxmljs
```

Then either globally install the bot:

```sh
npm install -g wolfram-irc
curl https://raw.github.com/clux/wolfram-irc/master/.wa.json > .wa.json
# edit gedit .wa.json
wlfbot
```

Or, if you want to fork and work directly:

```sh
git clone https://github.com/clux/wolfram-irc.git
cd wolfram-irc
npm install
# edit .wa.json
npm start
```

## Config options
The first 2 options IRC nickname, server, then a bunch of option objects:

- `irc` options object for the [irc](https://npmjs.org/package/irc) module
- `stream` options object for [irc-stream](https://npmjs.org/package/irc-stream) module
- `wolfram` options object for the [wolfram-alpha](https://npmjs.org/package/wolfram-alpha`)

You can put the `apiKey` in your config, but it will be overridden if the `WOLFRAM_APPID` environment variable is set. 

The Wolfram|Alpha® API is available for free for non-commercial experimental use with a low monthly cap on queries.  For more information, visit [http://products.wolframalpha.com/developers/](http://products.wolframalpha.com/developers/). Wolfram is a registered trademark of the Wolfram Group of Companies.

`whitelist` a list of usernames that you will allow to use the bot. Given that there are usage limits/potential costs, you may not want people you don't know spamming it with a script. Remove this list to allow everyone.

`wolfram` is a dictionary that will be merged into the query parameters. You can for example override your locatation and default unit selection with
`{"location": "London, UK", "units": "nonmetric"}`.

`verbose` can be set to get the bot to dump the raw response object json to the console.

## Highlights

```
<clux> wolfram: lunchtime
<wolfram> clux: results for lunchtime  (English word):
<wolfram> noun | the customary or habitual hour for eating lunch
```

```
<ob> clvr: wii?
<rwge> go on then
<clvr> ob: Yes, the wii.
<ob> there's 2
<littlerob> wolfram: wii?
<rwge> go on then
<wolfram> littlerob: results for w | i | i | _:
<wolfram> (no complete common words)
<littlerob> wolfram: mario kart?
<wolfram> littlerob: results for Mario Kart  (video game):
<wolfram> platform | Nintendo Game Boy Advance
<wolfram> publisher | Nintendo
<littlerob> wolfram is not enthusiastic
<wolfram> littlerob: results for enthusiastic  (English word) | antonym:
<wolfram> unenthusiastic
<littlerob> yes
<littlerob> wolfram is unenthusiastic
<wolfram> littlerob: results for unenthusiastic  (English word):
<wolfram> adjective | not enthusiastic; lacking excitement or ardor
<littlerob> yes wolfram
<ob> he's adorable
<ob> he thinks he's being helpful but he's not
```

```
<littlerob> clvr: shall i bet red or blue?
<clvr> littlerob: Yes.
<littlerob> thanks, clvr
<clux> ^^
<tjw> clvr: shall i bet red or blue?
<clvr> tjw: Please.
<tjw> clvr: shall i bet red or blue?
<tjw> wolfram: red or blue?
<clvr> tjw: Blue.
<wolfram> tjw: results for red  (color)  |  blue  (color):
<wolfram> --link to image containing only the colors of blue and red next to their names--
* clux doesn't know what he expected
```

## License
MIT-Licensed. See LICENSE file for details.
