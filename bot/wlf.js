var cfg = require(require('confortable')('.wa.json', process.cwd()));
var wolfram = require('wolfram-alpha').createClient(
  process.env.WOLFRAM_APPID || cfg.apiKey,
  cfg.wolfram
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
        return say('No results');
      }

      // first result is interpretation
      var res = [ rs[0].subpods[0].text.trim() ];

      // second one is usually the most important one
      for (var i = 0; i < rs[1].subpods.length; i += 1) {
        var pod = rs[1].subpods[i];
        // when no text - then usually there's an image - do one and stop
        if (!pod.text) {
          res.push(pod.image); // NB: link is temporary
          break;
        }
        // grab all the consecutive blobs of text
        res.push(pod.text);
      }

      // keep answer on one line if it's a simple answer (interpretation + ans)
      var response = (res.length === 2) ? res.join(' => ') : res.join('\n');
      gu.log.info(response);
      say(response);
      // ignore remaining pods
    });
  });

};
