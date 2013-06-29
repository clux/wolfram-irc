#!/usr/bin/env node
var irc = require('irc')
  , Wolf = require('wolfram-alpha')
  , dye = require('dye')
  , format = require('util').format
  , cfgPath = require('confortable')('.wa.json', process.cwd());

console.log(dye.green('using: ' + cfgPath));
var cfg = require(cfgPath);

var bot = new irc.Client(cfg.server, cfg.name, {
  userName: 'alpha',
  realName: 'wolfram',
  debug: false,
  channels: [cfg.chan],
});

var wolfram = Wolf.createClient(cfg.apiKey, cfg.apiOpts || {});
var chanReg = new RegExp('^' + cfg.name + '[\\s,\\:](.*)');

bot.addListener('message' + cfg.chan, function (from, msg) {
  console.log(dye.blue(format(from, 'in', cfg.chan + ':', msg)));

  if (chanReg.test(msg)) {
    var content = msg.match(chanReg)[1].trim();

    if (!content || cfg.whitelist.indexOf(from) < 0) {
      return; // empty string or non-whitelisted person
    }

    // pass data onto wolfram alpha
    wolfram.query(content, function (err, results) {
      if (err) {
        return console.error(err);
      }
      console.log(dye.yellow("Result: %j"), results);

      if (results !== null && results.length === 1 && results[0].primary && results[0].subpods[0].image) {
        // exact maths questions just give an image result without interpretation
        bot.say(cfg.chan, from + ': ' + results[0].subpods[0].image);
        return;
      }

      if (results === null || results.length <= 1) {
        bot.say(cfg.chan, from + ': Dunno. Try clvr.');
        return;
      }

      // first result is interpretation
      bot.say(cfg.chan, from + ': ' + results[0].subpods[0].text + ': ');

      // second one is usually the most important one
      for (var i = 0; i < results[1].subpods.length; i += 1) {
        var pod = results[1].subpods[i];
        if (!pod.text) { // sometimes there is no text, then do the image
          // TODO: also shorten the link
          bot.say(cfg.chan, pod.image);
          break; // wolfram preferred the image => ignore the next pod
        }
        else {
          bot.say(cfg.chan, pod.text);
        }
      }
      // ignore remaining pods
    });
  }
});


// only errors are unhandled message types I think
bot.addListener('error', function (message) {
  console.warn(dye.red('error:'), message);
});
