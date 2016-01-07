global.chai = require('chai');
global.expect = global.chai.expect;

// Load test suites
require('../src/libs/fps.spec.js');
require('../src/mixins/EventEmitter.spec.js');
require('../src/mixins/EventProcessor.spec.js');