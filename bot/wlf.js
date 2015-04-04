var Wolf = require('wolfram-alpha')
  , cfgPath = require('confortable')('.wa.json', process.cwd())
  , cfg = require(cfgPath);

var wolfram = Wolf.createClient(
  process.env.WOLFRAM_APPID || cfg.apiKey,
  cfg.wolfram || {}
);

module.exports = function (gu) {

  gu.handle(/(.*)/, function (say, content, user) {
    if (Array.isArray(cfg.whitelist) && cfg.whitelist.indexOf(user) < 0) {
      return; // non-whitelisted person
    }

    gu.log.info("query '%s'", content);
    // pass data onto wolfram alpha
    wolfram.query(content, function (err, rs) {
      if (err) {
        return gu.log.error(err);
      }
      if (cfg.verbose) {
        gu.log.info("query result: %j", rs); // huge log
      }

      if (rs === null || rs.length <= 1) {
        gu.log.info('No results');
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
      var response = (res.split('\n').length === 2) ?
        res.split('\n').join(' => ') :
        res;
      gu.log.info(response);
      say(response);
      // ignore remaining pods
    });
  });

};
