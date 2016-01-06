/*!
 * iScroll by Matteo "Cubiq" Spinelli ~ http://cubiq.org ~ Released under MIT license
 */
'use strict';

class Iscroll {
  constructor(element, opts = {}) {
    console.log(arguments);
    if (!element) {
      console.log(element);
      throw 'Element is not defined!';
    }

    this.state = {};
    this.opts = opts;

    // mixins here
    Object.assign(this, require('./mixins/EventEmitter.js'));

    console.dir(this);

    // Devtools
    if (NODE_ENV === 'development') {
      this.state.counter = 1;
      element.addEventListener('click', () => {
        this.state.counter++;
      });

      // State diplay panel
      require('./dev/StatePanel.js').default(this);
    }
  }

  // return all DOM to initial state, clean up
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

window.Iscroll = Iscroll;
module.exports = Iscroll;
