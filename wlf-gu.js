var botdir = process.env.WOLFBOT_COV ? 'bot-cov' : 'bot';
exports.scriptdir = require('path').join(__dirname, botdir);
exports.files = ['wlf.js'];

// exports a ready to make instance of gu that uses the version of gu we require
exports.gu = require('gu').bind(null, exports.scriptdir, exports.files);
