/*jshint -W030 */
import { should, assert } from 'chai';
import { jsdom } from 'jsdom';
global.window = jsdom().defaultView;

import EventEmitter from './EventEmitter.js';
import EventProcessor from './EventProcessor.js';


describe('EventProcessor.js', function() {
  const prototypeMethods = [
      'handleEvent',
      '_eventStart',
      '_eventMove',
      '_eventEnd',
      '_eventResize',
      '_updatePoint',
      '_renderLoop',
    ];

  const optionEventCallbacks = [
      'onReady',
      'onRefresh',
      'onDestroy',

      // declared on iscroll5 
      'beforeScrollStart',
      'scrollCancel',
      'scrollStart',
      'scroll',
      'scrollEnd',
      'flick',
      'zoomStart',
      'zoomEnd',
    ];

  let Obj = {
    options: {},
    styles: {},
    detects: {},
    container : global.window.document.createElement("div") 
  };

  // fillOptions
  const demoCallback = function(){ };
  optionEventCallbacks.forEach((eventName)=> Obj.options[eventName] = demoCallback);

  EventEmitter.extend(Obj);
  EventEmitter.apply(Obj);

  EventProcessor.extend(Obj);
  EventProcessor.apply(Obj);

  describe('Interface exists', function() {

    prototypeMethods.forEach(function(method) {
      it(`${method} exists`, function() {
        should().exist(Obj[method]);
      });
    });
  });
  describe('Event from options assigned', function() {
    var events = Obj._customEvents;

    optionEventCallbacks.forEach(function(eventName) {
      it(`${eventName} callback attached`, function() {
        assert.equal(events[eventName][0],demoCallback);
      });
    });
  });
});
