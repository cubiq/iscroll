/* globals jsdom */
global.chai = require('chai');
global.expect = global.chai.expect;
global.jsdom = require('jsdom').jsdom();
global.window = jsdom.defaultView;
global.document = window.document;

// Load test suites
require('../src/libs/fps.spec.js');
require('../src/mixins/EventEmitter.spec.js');
require('../src/mixins/EventProcessor.spec.js');
require('../src/components/RenderLayer.spec.js');