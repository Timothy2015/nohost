const fse = require('fs-extra');
const { Socket } = require('net');
const { getWhistlePath } = require('whistle/lib/config');
// 避免第三方模块没处理好异常导致程序crash
const noop = () => {};
const destroySocket = Socket.prototype.destroy;
Socket.prototype.destroy = function(err) {
  if (err && this.listenerCount('error')) {
    this.on('error', noop);
  }
  destroySocket.call(this, err);
};
// process.env.PFORK_MODE = 'inline'
// 设置存储路径
process.env.WHISTLE_PATH = process.env.NOHOST_PATH || getWhistlePath();
fse.ensureDirSync(process.env.WHISTLE_PATH); // eslint-disable-line

module.exports = require('./lib');
