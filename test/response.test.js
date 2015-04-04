var Gu = require('gu')
  , guParams = require('../')
  , sulfur = require('sulfur')
  ;

exports.multiline = function (t) {
  var wlf = new Gu(guParams.scriptdir, guParams.files, { noReload: true });
  sulfur.absorb(wlf.log, 'gu');

  wlf.write({user: '#chan:clux', name: 'clux', message: '77kg in pounds'});

  wlf.on('readable', function () {
    var msg = wlf.read();
    t.ok(msg, 'got response');
    var lines = msg.message.split('\n');
    //console.log('raw lines:', lines)
    t.ok(lines[0].indexOf('convert 77') >= 0, "contains interpretation");
    t.ok(lines[1].indexOf('169.8') >= 0, "contains answer decimal");
    t.ok(lines[2].indexOf('ounces') >= 0, "contains answer with ounces");
    t.done();
    // also the third line in pounds and ounces - but not going too specific here
  });
};

exports.image = function (t) {
  var wlf = new Gu(guParams.scriptdir, guParams.files, { noReload: true });
  sulfur.absorb(wlf.log, 'gu');

  wlf.write({user: '#chan:clux', name: 'clux', message: 'plot x^3 - 6x^2 + 4x'});

  wlf.on('readable', function () {
    var msg = wlf.read();
    t.ok(msg, 'got response');
    var lines = msg.message.split('\n');
    t.ok(lines[0].indexOf('plot | x^3') >= 0, 'got plot');
    t.ok(lines[0].indexOf(' => http://') >= 0, 'plot is img link');
    t.done();
  });
};

exports.maths = function (t) {
  var wlf = new Gu(guParams.scriptdir, guParams.files, { noReload: true });
  sulfur.absorb(wlf.log, 'gu');

  wlf.write({user: '#chan:clux', name: 'clux',
    message: 'phi(28)'
  });

  wlf.on('readable', function () {
    var msg = wlf.read();
    t.ok(msg, 'got response');
    t.equal(msg.message, 'phi(28) => 12', 'single line answer');
    t.done();
  });


};

exports.nonwhite = function (t) {
  var wlf = new Gu(guParams.scriptdir, guParams.files, { noReload: true });
  sulfur.absorb(wlf.log, 'gu');

  wlf.write({user: '#chan:bot', name: 'bot', message: 'plot x^3 - 6x^2 + 4x'});
  setTimeout(function () {
    t.ok(!wlf.read(), 'no response for non-whitelisted person');
    t.done();
  }, 5000);
};

exports.noresults = function (t) {
    var wlf = new Gu(guParams.scriptdir, guParams.files, { noReload: true });
  sulfur.absorb(wlf.log, 'gu');

  wlf.write({user: '#chan:clux', name: 'clux', message: 'qqqqqqqqqqqqqqqqqqqqqqqq'});

  wlf.on('readable', function () {
    var msg = wlf.read();
    t.ok(msg, 'got response');
    t.equal(msg.message, 'No results', 'no results received');
    t.done();
  });
};
