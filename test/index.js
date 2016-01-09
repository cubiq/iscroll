global.chai = require('chai');
global.expect = global.chai.expect;

/* RAF immitation */
global.window = global;
var rafCallbacks = [];
global.requestAnimationFrame = function(callback) {
  return rafCallbacks.push(callback);
};

global.cancelAnimationFrame = function(index) {
  rafCallbacks.splice(index - 1);
};
global.nextFrame = function() {
  var callbacks = rafCallbacks;
  rafCallbacks = [];
  for (var i in callbacks) {
    callbacks[i]();
  }
};
/* ///////////////// */

// Load test suites
require('../src/libs/fps.spec.js');
require('../src/mixins/EventEmitter.spec.js');
require('../src/mixins/EventProcessor.spec.js');
require('../src/components/RenderLayer.spec.js');