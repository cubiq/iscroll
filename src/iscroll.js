/*!
 * iScroll by Matteo "Cubiq" Spinelli ~ http://cubiq.org ~ Released under MIT license
 */
'use strict';

import EventEmitter from './mixins/EventEmitter.js';
import EventProcessor from './mixins/EventProcessor.js';

class Iscroll {
  constructor(element, options = {}) {

    // if jquery element
    if (element.jquery) {
      element = element[0];
    }

    // if selector
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    // if still no element - sorry
    if (!element) {
      throw 'Element is not defined!';
    }

    this.container = element;
    this.options = Object.assign({}, require('./iscroll.options.js'), options);
    this.state = {
      LOOP : false,
      POINTS : {}
    };

    // EXTENDS
    require('./iscroll.detects.js').default(this); // can be moved out of constructor, due perfomance reasons
    EventEmitter.apply(this);
    EventProcessor.apply(this);

    this.state.ready = true;
    this.emit('onReady');

    // #DEV - ADDITIONAL MODULES
    if (NODE_ENV === 'development') {
      // State display panel
      require('./dev/StatePanel.js').default(this);
    }

    // #DEV - HOT MODULE REPLACEMENT FOR EXTENDS
    if (module.hot) {
      module.hot.accept(['./iscroll.detects.js', './mixins/EventEmitter.js', './mixins/EventProcessor.js'], () => {
        this.off();
        require('./iscroll.detects.js').default(this); // can be moved out of constructor, due perfomance reasons
        
        var EventEmitter = require('./mixins/EventEmitter.js').default;
        var EventProcessor = require('./mixins/EventProcessor.js').default;
        
        EventEmitter.apply(this);
        EventProcessor.apply(this);
        EventEmitter.extend(Iscroll.prototype);
        EventProcessor.extend(Iscroll.prototype);
      });
    }
  }

  // return all DOM to initial state, clean up after meal
  destructor() {
  
  }

  // force update state
  update() {

  }

  destroy() {
    this.destructor();
    this.off();
  }
}

EventEmitter.extend(Iscroll.prototype);
EventProcessor.extend(Iscroll.prototype);

window.Iscroll = Iscroll;
module.exports = Iscroll;
