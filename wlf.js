#!/usr/bin/env node
var irc = require('irc')
  , Wolf = require('wolfram')
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

var wolfram = Wolf.createClient(cfg.apiKey);
var chanReg = new RegExp('^' + cfg.name + '[\\s,\\:](.*)');

bot.addListener('message' + cfg.chan, function (from, msg) {
  console.log(dye.blue(format(from, 'in', cfg.chan + ':', msg)));

  // cleverbot
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
      if (!results.length) {
        bot.say(cfg.chan, from + ': Dunno. Try clvr.');
        return;
      }

      // first result is interpretation
      bot.say(cfg.chan, from + ': results for ' + results[0].subpods[0].value + ':');
      // second one is usually the most important one
      results[1].subpods.forEach(function (pod) {
        if (!pod.value) { // sometimes there is no text, then do the image
          bot.say(cfg.chan, pod.image)
        }
        else {
          bot.say(cfg.chan, pod.value);
        }

      });
      // ignore remaining pods
    });
  }
});


// only errors are unhandled message types I think
bot.addListener('error', function (message) {
  console.warn(dye.red('error:'), message);
});
