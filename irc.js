#!/usr/bin/env node
var cfgPath = require('confortable')('.wa.json', process.cwd());
if (!cfgPath) {
  throw new Error("When loading wolfram-irc externally, a local config is required");
}
var cfg = require(cfgPath);

var scriptdir = require('path').join(__dirname, 'bot');
var gu = require('gu')(scriptdir, ['wlf.js']);
var ircStream = require('irc-stream')(cfg.server, cfg.name, {
  userName: 'alpha',
  realName: 'wolfram',
  debug: false,
  channels: [cfg.chan],
});

ircStream.pipe(gu).pipe(ircStream);
