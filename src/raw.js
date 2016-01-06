/*!
 * iScroll by Matteo "Cubiq" Spinelli ~ http://cubiq.org ~ Released under MIT license
 */

(function (window, document, undefined) {
  'use strict';

  /**
   * List all known pointer events
   * @const {Object}
   */
  var EVENT_TYPE = {
    pointer: {
       start: 'pointerdown',
        move: 'pointermove',
         end: 'pointerup',
      cancel: 'pointercancel'
    },
    MSPointer: {
       start: 'MSPointerDown',
        move: 'MSPointerMove',
         end: 'MSPointerUp',
      cancel: 'MSPointerCancel'
    },
    touch: {
       start: 'touchstart',
        move: 'touchmove',
         end: 'touchend',
      cancel: 'touchcancel'
    },
    mouse: {
       start: 'mousedown',
        move: 'mousemove',
         end: 'mouseup',
      cancel: 'mousecancel'
    }
  };

  /**
   * Hold all points/touches
   * @var {Object}
   */
  var POINTS = {};

  /**
   * Are we in a rAF loop?
   * @var {boolean}
   */
  var LOOP = false;


  // ---------------------------------------------------------------
  //  Main class
  // ---------------------------------------------------------------


  /**
  * IScroll
  * Main sandbox and class constructor
  * @class
  * @param  {(HTMLElement|string)}  el - The initiator element
  * @param  {Object}        [options]
  */
  function IScroll (el, options) {
    this.container = typeof el == 'string' ? document.querySelector(el) : el;
    this.options = extend({}, IScroll.defaults);
    this.options = extend(this.options, options || {});

    // choose the appropriate event type to use, it can also be forced via options
    if ( this.options.eventType ) {
      this.eventType = EVENT_TYPE[ this.options.eventType ];
    } else if ( IScroll.hasPointerEvents ) {
      this.eventType = EVENT_TYPE.pointer;
    } else if ( IScroll.hasMSpointerEvents ) {
      this.eventType = EVENT_TYPE.MSPointer;
    } else if ( IScroll.useTouchEvents ) {
      this.eventType = EVENT_TYPE.touch;
    } else {
      this.eventType = EVENT_TYPE.mouse;
    }

    this._events = {};      // holds all the Default registered events
    this._customEvents = {};  // holds all iScroll specific events

    // update dimensions on resize. We register both events, only the first to execute is used, the other discarded
    this.on('orientationchange', window);
    this.on('resize', window);

    //this.on(IScroll.transitionEndEvent);
    this.on(this.eventType.start);

    this.ready = true;

    if ( this.options.onReady ) {
      this.options.onReady.call(this);
    }
  }


  // ---------------------------------------------------------------
  //  Default options and browser capabilities
  // ---------------------------------------------------------------


  /**
   * Default options, can be overwritten to change defaults globally
   * @type {Object}
   */
  IScroll.defaults = {
    eventType: undefined,     // what event type will be used. undefined = autodetect
    'document': document,     // the bottom most DOM element used for "move" and "end" events

    preventDefault: true,

    onReady: undefined
  };


  /**
   * Browser vendor, used to apply CSS properties
   * @type {[string|boolean]}
   */
  IScroll.vendor = (function () {
    var elementStyle = document.createElement('div').style;
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];

    for ( var i = 0, l = vendors.length; i < l; i++ ) {
      if ( vendors[i] + 'ransform' in elementStyle ) {
        return vendors[i].substr(0, vendors[i].length - 1);
      }
    }

    return false;
  })();


  /**
   * Find the transitionEnd event based on the vendor, there's no pattern so
   * we have to use a function
   * @type {[string|boolean]}
   */
  IScroll.transitionEndEvent = (function () {
    if ( IScroll.vendor === false ) {
      return false;
    }

    return {
            '': 'transitionend',
      'webkit': 'webkitTransitionEnd',
         'Moz': 'transitionend',
           'O': 'oTransitionEnd',
          'ms': 'MSTransitionEnd'
    }[IScroll.vendor];
  })();


  /**
   * save commonly used vendor specific styles
   * @type {Object}
   */
  IScroll.style = {
    transform: prefixCSSProperty('transform'),
    transitionDuration: prefixCSSProperty('transitionDuration')
  };

  extend(IScroll, {
    hasPointerEvents: window.navigator.pointerEnabled,
    hasMSpointerEvents: window.navigator.msPointerEnabled,
    // we are going to use user agent spoofing to prevent touch events on desktop. TODO: can it be done w/o spoofing?
    useTouchEvents: ('ontouchstart' in window) && /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(window.navigator.userAgent)
  });
  IScroll.useMouseEvents = !IScroll.hasPointerEvents && !IScroll.hasMSpointerEvents && !IScroll.useTouchEvents;


  // ---------------------------------------------------------------
  //  Prototype
  // ---------------------------------------------------------------


  IScroll.prototype = {
    handleEvent: function (e) {
      switch ( e.type ) {
        case this.eventType.start:
          this._eventStart(e);
          break;
        case this.eventType.move:
          this._eventMove(e);
          break;
        case this.eventType.end:
        case this.eventType.cancel:
          this._eventEnd(e);
          break;
        case IScroll.transitionEndEvent:
              this._eventTransitionEnd(e);
              break;
        case 'orientationchange':
        case 'resize':
          this._eventResize(e);
          break;
      }
    },

    _eventStart: function (e) {
      if ( this.options.preventDefault ) {
        e.preventDefault();
      }

      var events = e.targetTouches || [e];

      var id;
      var x, y;

      for ( var i = 0, l = events.length; i < l; i++ ) {
        id = events[i].identifier || 0;

        x = events[i].pageX;
        y = events[i].pageY;

        POINTS[id] = {
          instance: this,
          id: id,
          phase: 'start',
          initiated: false,
          x: x,
          y: y,
          startX: x,
          startY: y,
          deltaX: 0,
          deltaY: 0,
          startTime: Date.now()
        };
      }

      // start the rAF loop
      if ( !LOOP ) {
        frame();
      }

      // start listening to 'move' and 'end' events only when the drag session is initiated
      // on desktop this should prevent useless mousemove events
      this.on(this.eventType.move, this.options.document);
      this.on(this.eventType.end, this.options.document);
    },

    _eventMove: function (e) {
      var events = e.changedTouches || [e];
      var id;

      for ( var i = events.length; i--; ) {
        id = events[i].identifier || 0;

        if ( POINTS[id] && POINTS[id].initiated ) {
          POINTS[id] = this._updatePoint(POINTS[id], e);
          POINTS[id].phase = 'move';
        }
      }
    },

    _eventEnd: function (e) {
      var events = e.changedTouches || [e];
      var id;

      for ( var i = events.length; i--; ) {
        id = events[i].identifier || 0;

        if ( POINTS[id] && POINTS[id].initiated ) {
          POINTS[id] = this._updatePoint(POINTS[id], e);
          POINTS[id].phase = 'end';
        }
      }

      this.off(this.eventType.move, this.options.document);
      this.off(this.eventType.end, this.options.document);
    },

    _eventResize: function (e) {
      clearTimeout(this._resizeTimeout);

      // if we resize before the script has been initialized
      if ( !this.ready ) {
        this._resizeTimeout = setTimeout(this._eventResize.bind(this, e), 50);
        return;
      }

      // defer the resize event to spare resources
      this._resizeTimeout = setTimeout(this.refresh.bind(this), 100);
    },

    refresh: function (e) {

    },

    _updatePoint: function (point, e) {
      point.currentTime = Date.now();

      // distance travelled since last event
      point.deltaX = point.x - e.pageX;
      point.deltaY = point.y - e.pageY;

      // update current position
      point.x = e.pageX;
      point.y = e.pageY;

      // distance from start
      var xd = point.startX - point.x;
      var yd = point.startY - point.y;
      point.distance = Math.sqrt(xd * xd + yd * yd);
      point.distanceX = xd;
      point.distanceY = yd;

      // angle from start (hence direction) 0=right, counter clockwise
      var theta = Math.atan2(yd, -xd);
      if ( theta < 0 ) {
        theta += 2 * Math.PI;
      }
      //theta *= (180 / Math.PI);   // convert to degrees
      point.theta = theta;

      return point;
    },

    /**
     * emit
     * Custom event emitter
     * @param {String}  type
     * @param {Object}  point
     */
    emit: function (type) {
      if ( !this._customEvents[type] ) {
        return;
      }

      var i = this._customEvents[type].length;

      while ( i-- ) {
        this._customEvents[type][i].apply(this, [].slice.call(arguments, 1));
      }
    },

    /**
     * on
     * Attach a custom event
     * @param {String}  type
     * @param {Function}  fn
     */
    attach: function (type, cb) {
      if ( typeof type == 'object' ) {
        for ( var i in type ) {
          this.attach(i, type[i]);
        }

        return;
      }

      if ( !this._customEvents[type] ) {
        this._customEvents[type] = [];
      }

      this._customEvents[type].push(cb);
    },

    /**
     * on
     * Attach an event listener
     * @param {string}      type - event type name
     * @param {HTMLElement} [context=this.container]
     * @param {Function}    [cb=this]
     */
    on: function (type, context, cb) {
      if ( !this._events[type] ) {
        this._events[type] = [];
      }

      cb = cb || this;
      context = context || this.container;

      this._events[type].push({ cb: cb, context: context });

      context.addEventListener(type, cb, false);
    },

    /**
     * off
     * Release an event listener. If type is undefined remove all registered events
     * @param {string}      [type] - event type name
     * @param {HTMLElement} [context=this.container]
     * @param {Function}    [cb=this] - callback
     */
    off: function (type, context, cb) {
      var i;

      // if called without parameters remove all events
      if ( !type ) {
        for ( i in this._events ) {
          this.off(i, this._events[i].context, this._events[i].cb);
        }

        return;
      }

      if ( !this._events[type] ) {
        return;
      }

      cb = cb || this;
      context = context || this.container;

      // we work on a clone of the original array
      var eventArr = this._events[type].slice(0);

      for ( i = eventArr.length; i--; ) {
        if ( eventArr[i].cb == cb && eventArr[i].context == context ) {
          context.removeEventListener(type, cb, false);
          this._events[type].splice(i, 1);
        }
      }

      if ( !this._events[type].length ) {
        delete this._events[type];
      }
    },

    destroy: function () {
      this.off();   // unload all events
    },

  };


  // ---------------------------------------------------------------
  //  Lame rAF polyfill
  // ---------------------------------------------------------------


  IScroll.requestAnimationFrame = window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame ||
                  function( callback ) {
                    window.setTimeout(callback, 1000 / 60);
                  };


  // ---------------------------------------------------------------
  //  Utilities
  // ---------------------------------------------------------------


  /**
   * extend
   * Extend target with object
   * @param {Object}    target
   * @param {Object}    obj
   */
  function extend (target, obj) {
    for ( var i in obj ) {
      if ( obj.hasOwnProperty(i) )  // just for the sake of it
        target[i] = obj[i];
    }

    return target;
  }


  /**
   * sign
   * Return the sign of a number
   * @param {int}   n
   */
  function sign (n) {
    return n && n / Math.abs(n);
  }


  /**
   * prefixCSSProperty
   * If needed prefix the CSS property with the vendor specific version
   * @param {string}    style - property to prefix
   */
  function prefixCSSProperty (style) {
    var vendor = IScroll.vendor;
    if ( vendor === false ) {
      return false;
    }

    var elementStyle = document.createElement('div').style;

    style = vendor === '' ? style : vendor + style.charAt(0).toUpperCase() + style.substr(1);

    return style in elementStyle && style;
  }


  /**
   * frame
   * One frame in the requestAnimationFrame loop
   */
  function frame () {
    var pointCount = 0;

    for ( var id in POINTS ) {
      var point = POINTS[id];

      switch ( point.phase ) {
        case 'move':
          point.instance.emit('move', point);
          break;
        case 'start':
          if ( !point.initiated ) {
            point.initiated = true;
            point.instance.emit('start', point);
          }
          break;
        case 'end':
          point.initiated = false;
          point.instance.emit('end', point);
          delete POINTS[id];
          break;
      }

      pointCount++;
    }

    // keep animating until there are points in the POINTS object
    LOOP = !!pointCount;

    if ( LOOP ) {
      requestAnimationFrame(frame);
    }
  }


  // ---------------------------------------------------------------
  //  Expose IScroll to the world
  // ---------------------------------------------------------------


  if ( typeof define == 'function' && define.amd ) {
    define(function () {
      return IScroll;
    });
  } else if ( typeof module == 'object' && module.exports ) {
    module.exports = IScroll;
  } else {
    window.IScroll = IScroll;
  }

})(window, document, undefined);