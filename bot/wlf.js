var Wolf = require('wolfram-alpha')
  , dye = require('dye')
  , cfgPath = require('confortable')('.wa.json', process.cwd())
  , cfg = require(cfgPath);

var wolfram = Wolf.createClient(cfg.apiKey, cfg.apiOpts || {});

module.exports = function (gu) {

  gu.on(/(.*)/, function (content, from) {
    if (cfg.whitelist.indexOf(from) < 0) {
      return; // non-whitelisted person
    }

    // pass data onto wolfram alpha
    wolfram.query(content, function (err, results) {
      if (err) {
        return console.error(err);
      }
      console.log(dye.yellow("Result: %j"), results);

      if (results !== null && results.length === 1 && results[0].primary && results[0].subpods[0].image) {
        // exact maths questions just give an image result without interpretation
        gu.say(from + ': ' + results[0].subpods[0].image);
        return;
      }

      if (results === null || results.length <= 1) {
        gu.say(from + ': Dunno. Try clvr.');
        return;
      }

      // first result is interpretation
      gu.say(from + ': ' + results[0].subpods[0].text + ': ');

      // second one is usually the most important one
      for (var i = 0; i < results[1].subpods.length; i += 1) {
        var pod = results[1].subpods[i];
        if (!pod.text) { // sometimes there is no text, then do the image
          // TODO: also shorten the link
          gu.say(pod.image);
          break; // wolfram preferred the image => ignore the next pod
        }
        else {
          gu.say(pod.text);
        }
      }
      // ignore remaining pods
    });
  });

};
