# wolfram-irc
A simple IRC bot that connects to a server/channel of choice and will relay any messages addressed to it in the channel to [Wolfram Alpha](http://http://www.wolframalpha.com/) for quick answers to your precise questions.

## Usage/Installation
Install and modify the default config file to suit your needs:

```bash
npm install -g wolfram-irc
curl https://raw.github.com/clux/wolfram-irc/master/.wa.json > .wa.json
gedit .wa.json # you must change the first 4 params in config
wlfbot
```

## Config options
The first 3 options are used directly to connect to IRC. Nickname, server, and channel to connect to.

`apiKey` you will get when you create a [development account](http://products.wolframalpha.com/developers/) (which is free for low intensity use).

`whitelist` a list of usernames that you will allow to use the bot. Given that there are usage limits/potential costs, you may not want people you don't know spamming it with a script.

## Example Results
TODO

## License
MIT-Licensed. See LICENSE file for details.
