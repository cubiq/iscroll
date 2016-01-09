/*!
 * iScroll by Matteo "Cubiq" Spinelli ~ http://cubiq.org ~ Released under MIT license
 */
'use strict';

// example of debug tool. All debug code will strip on production
if (NODE_ENV === 'development') {
  const debug = require('./dev/debug.js')('iscroll:iscroll.js');
  window.debug.enable('iscroll:*');
}

import EventEmitter from './mixins/EventEmitter.js';
import EventProcessor from './mixins/EventProcessor.js';
import RenderLayer from './components/RenderLayer.js';


class Iscroll {
  constructor(element, options = {}) {
    debug('constructor!');
    window.iscroll = this;

    if (element.jquery) {
      element = element[0];
    }
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (!element) {
      throw 'Element is not defined!';
    }

    this.container = element;
    this.options = Object.assign({}, require('./iscroll.options.js'), options);
    this.state = {
      LOOP : false,
      POINTS : []
    };

    // EXTENDS
    require('./iscroll.detects.js').default(this); // can be moved out of constructor, due perfomance reasons
    EventEmitter.apply(this);
    EventProcessor.apply(this);

    // RENDERING
    new RenderLayer('viewLayer', this.container.firstElementChild, this);

    this.refresh();
    this.state.ready = true;
    debug('ready!');
    this.emit('onReady');

    // #DEV - ADDITIONAL MODULES
    if (NODE_ENV === 'development') {
      require('./dev/StatePanel.js').default(this); // State display panel
    }

    // #DEV - HOT MODULE REPLACEMENT FOR EXTENDS
    if (module.hot) {

      module.hot.accept(['./iscroll.detects.js', './mixins/EventEmitter.js', './mixins/EventProcessor.js'], () => {
        this.off();
        require('./iscroll.detects.js').default(this); // can be moved out of constructor, due perfomance reasons

        var EventEmitter = require('./mixins/EventEmitter.js').default;
        var EventProcessor = require('./mixins/EventProcessor.js').default;

        var events = this._events;
        var customEvents = this._customEvents;

        EventEmitter.apply(this);
        EventProcessor.apply(this);
        EventEmitter.extend(Iscroll.prototype);
        EventProcessor.extend(Iscroll.prototype);

        // restore all previous declared events
        this._events = events;
        this._customEvents = customEvents;
      });
    }
  }

  // return all DOM to initial state, clean up after meal
  destructor() {

  }

  // force update state
  update() {

  }

  // force update state
  refresh() {
    this.state.width = this.container.offsetWidth;
    this.state.height = this.container.offsetHeight;
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
