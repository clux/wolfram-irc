#!/usr/bin/env node
var cfgPath = require('confortable')('.wa.json', process.cwd());

if (!cfgPath) {
  throw new Error("When loading wolfram-irc externally, a local config is required");
}
console.log('using config: ' + cfgPath);
var cfg = require(cfgPath);

var bot = require('gu')(cfg.server, cfg.name, {
  userName: 'alpha',
  realName: 'wolfram',
  debug: false,
  channels: [cfg.chan],
}, require('path').join(__dirname, 'bot'), ['wlf.js']);
