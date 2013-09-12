#!/usr/bin/env node
var cfgPath = require('confortable')('.wa.json', process.cwd());

console.log('using: ' + cfgPath);
var cfg = require(cfgPath);

var bot = require('gu')(cfg.server, cfg.name, {
  userName: 'alpha',
  realName: 'wolfram',
  debug: false,
  channels: [cfg.chan],
}, , require('path').join(__dirname, 'bot'), ['wlf.js']);
