var Wolf = require('wolfram-alpha')
  , cfgPath = require('confortable')('.wa.json', process.cwd())
  , cfg = require(cfgPath);

var wolfram = Wolf.createClient(cfg.apiKey, cfg.apiOpts || {});

module.exports = function (gu) {

  gu.handle(/(.*)/, function (content, say, user) {
    if (cfg.whitelist.indexOf(user) < 0) {
      return; // non-whitelisted person
    }

    // pass data onto wolfram alpha
    wolfram.query(content, function (err, rs) {
      if (err) {
        return console.error(err);
      }
      console.log("Result: %j", rs);

      if (rs !== null && rs.length === 1 && rs[0].primary && rs[0].subpods[0].image) {
        // exact maths questions just give an image result without interpretation
        say(rs[0].subpods[0].image);
        return;
      }

      if (rs === null || rs.length <= 1) {
        say('No results');
        return;
      }

      // first result is interpretation
      var res = rs[0].subpods[0].text.trim();

      // second one is usually the most important one
      for (var i = 0; i < rs[1].subpods.length; i += 1) {
        var pod = rs[1].subpods[i];
        if (!pod.text) { // sometimes there is no text, then do the image
          // TODO: also shorten the link
          res += '\n' + pod.image;
          break; // wolfram preferred the image => ignore the next pod
        }
        else {
          res += '\n' + pod.text;
        }
      }

      // keep answer on one line if it's a simple answer (interpretation + ans)
      if (res.split('\n').length === 2) {
        say(res.split('\n').join(' => '));
      }
      else {
        say(res);
      }

      // ignore remaining pods
    });
  });

};
