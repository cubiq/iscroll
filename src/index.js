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
}

window.Iscroll = Iscroll;
module.exports = Iscroll;
