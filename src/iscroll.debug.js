
window.debug = require('debug');
window.debug.enable();

module.exports = function(name){
  return window.debug(name);
};