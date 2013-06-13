# wolfram-irc
A simple IRC bot that connects to a server/channel of choice and will relay any messages addressed to it in the channel to [Wolfram Alpha](http://http://www.wolframalpha.com/) for quick answers to your precise questions.

## Usage/Installation
Install and modify the default config file to suit your needs:

```bash
sudo apt-get install libxml2-dev # for libxmljs
npm install -g wolfram-irc
curl https://raw.github.com/clux/wolfram-irc/master/.wa.json > .wa.json
gedit .wa.json # you must change the first 4 params in config
wlfbot
```

## Config options
The first 3 options are used directly to connect to IRC. Nickname, server, and channel to connect to.

`apiKey` you will get when you create a [development account](http://products.wolframalpha.com/developers/) (which is free for low intensity use).

`whitelist` a list of usernames that you will allow to use the bot. Given that there are usage limits/potential costs, you may not want people you don't know spamming it with a script.

`apiOpts` is a dictionary that will be merged into the query parameters. You can for example override your locatation and default unit selection with 
`{"location": "London, UK", "units": "nonmetric"}`.

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
