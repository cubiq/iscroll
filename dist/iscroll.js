/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * iScroll by Matteo "Cubiq" Spinelli ~ http://cubiq.org ~ Released under MIT license
	 */
	'use strict';
	
	// example of debug tool. All debug code will strip on production
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventEmitter = __webpack_require__(1);
	
	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);
	
	var _EventProcessor = __webpack_require__(2);
	
	var _EventProcessor2 = _interopRequireDefault(_EventProcessor);
	
	var _RenderLayer = __webpack_require__(4);
	
	var _RenderLayer2 = _interopRequireDefault(_RenderLayer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	if (true) {
	  var _debug = __webpack_require__(6)('iscroll:iscroll.js');
	  window.debug.enable('iscroll:*');
	}
	
	/**
	 * global Object, with
	 * @type {Object}
	 */
	var globalState = {
	  LOOP: false,
	  POINTS: []
	};
	
	/**
	 * IScroll
	 * Main sandbox
	 * @class
	 */
	
	var Iscroll = function () {
	
	  /**
	   * Constructor
	   * @param  {(HTMLElement|string\jQueryElement)} el - The initiator element
	   * @param  {Object} [options]
	   */
	
	  function Iscroll(element) {
	    var _this = this;
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Iscroll);
	
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
	    this.options = Object.assign({}, __webpack_require__(10), options);
	    this.state = {};
	    this.globalState = globalState;
	
	    // EXTENDS
	    __webpack_require__(11).default(this); // can be moved out of constructor, due perfomance reasons
	    _EventEmitter2.default.apply(this);
	    _EventProcessor2.default.apply(this);
	
	    // RENDERING
	    new _RenderLayer2.default('viewLayer', this.container.firstElementChild, this);
	
	    this.refresh();
	    this.state.ready = true;
	    debug('ready!');
	    this.emit('onReady');
	
	    // #DEV - ADDITIONAL MODULES
	    if (true) {
	      __webpack_require__(12).default(this); // State display panel
	    }
	
	    // #DEV - HOT MODULE REPLACEMENT FOR EXTENDS
	    if (false) {
	
	      module.hot.accept(['./iscroll.detects.js', './mixins/EventEmitter.js', './mixins/EventProcessor.js'], function () {
	        _this.off();
	        require('./iscroll.detects.js').default(_this); // can be moved out of constructor, due perfomance reasons
	
	        var EventEmitter = require('./mixins/EventEmitter.js').default;
	        var EventProcessor = require('./mixins/EventProcessor.js').default;
	
	        var events = _this._events;
	        var customEvents = _this._customEvents;
	
	        EventEmitter.apply(_this);
	        EventProcessor.apply(_this);
	        EventEmitter.extend(Iscroll.prototype);
	        EventProcessor.extend(Iscroll.prototype);
	
	        // restore all previous declared events
	        _this._events = events;
	        _this._customEvents = customEvents;
	      });
	    }
	  }
	
	  // return all DOM to initial state, clean up after meal
	
	  _createClass(Iscroll, [{
	    key: 'destructor',
	    value: function destructor() {}
	
	    // force update state
	
	  }, {
	    key: 'update',
	    value: function update() {}
	
	    // force update state
	
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      this.state.width = this.container.offsetWidth;
	      this.state.height = this.container.offsetHeight;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.destructor();
	      this.off();
	    }
	  }]);
	
	  return Iscroll;
	}();
	
	_EventEmitter2.default.extend(Iscroll.prototype);
	_EventProcessor2.default.extend(Iscroll.prototype);
	
	window.Iscroll = Iscroll;
	module.exports = Iscroll;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Mixins provides methods used for event manipulating.
	 *
	 */
	
	/**
	 * emit
	 * Custom event emitter
	 * @param {String}  type
	 * @param {Object}  point
	 */
	function emit(type) {
	  if (!this._customEvents[type]) {
	    return;
	  }
	
	  var i = this._customEvents[type].length;
	
	  while (i--) {
	    this._customEvents[type][i].apply(this, [].slice.call(arguments, 1));
	  }
	}
	
	/**
	 * attach
	 * Attach a custom event
	 * @param {String}  type
	 * @param {Function}  fn
	 */
	function attach(type, cb) {
	  var _this = this;
	
	  if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = Object.keys(type)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var i = _step.value;
	
	        this.attach(i, type[i]);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    return;
	  }
	  var types = type.split(' ');
	  types.forEach(function (type) {
	    if (!_this._customEvents[type]) {
	      _this._customEvents[type] = [];
	    }
	    _this._customEvents[type].push(cb);
	  });
	}
	
	/**
	 * attach
	 * Attach a custom event
	 * @param {String}  type
	 * @param {Function}  fn
	 */
	function attachOnce(type, cb) {
	
	  var callback = function callback() {
	    cb();
	    this.detach(type, callback);
	  };
	
	  this.attach(type, callback);
	}
	
	/**
	 * detach
	 * Detach a custom event
	 * @param {String}  type
	 * @param {Function}  fn
	 */
	function detach(type, cb) {
	  if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
	    for (var i in type) {
	      this.detach(i, type[i]);
	    }
	
	    return;
	  }
	
	  if (!this._customEvents[type]) {
	    return;
	  }
	
	  if (!cb) {
	    this._customEvents[type] = [];
	  } else {
	    this._customEvents[type].filter(function (item) {
	      return item !== cb;
	    });
	  }
	}
	
	/**
	 * on
	 * Attach an event listener
	 * @param {string}      type - event type name
	 * @param {HTMLElement} [context=this.container]
	 * @param {Function}    [cb=this]
	 */
	function on(type, context, cb) {
	  if (!this._events[type]) {
	    this._events[type] = [];
	  }
	
	  cb = cb || this;
	  context = context || this.container;
	
	  this._events[type].push({ cb: cb, context: context });
	
	  context.addEventListener(type, cb, false);
	}
	
	/**
	 * off
	 * Release an event listener. If type is undefined remove all registered events
	 * @param {string}      [type] - event type name
	 * @param {HTMLElement} [context=this.container]
	 * @param {Function}    [cb=this] - callback
	 */
	function off(type, context, cb) {
	  var i;
	
	  // if called without parameters remove all events
	  if (!type) {
	    for (i in this._events) {
	      this.off(i, this._events[i].context, this._events[i].cb);
	    }
	
	    return;
	  }
	
	  if (!this._events[type]) {
	    return;
	  }
	
	  cb = cb || this;
	  context = context || this.container;
	
	  // we work on a clone of the original array
	  var eventArr = this._events[type].slice(0);
	
	  for (i = eventArr.length; i--;) {
	    if (eventArr[i].cb === cb && eventArr[i].context === context) {
	      context.removeEventListener(type, cb, false);
	      this._events[type].splice(i, 1);
	    }
	  }
	
	  if (!this._events[type].length) {
	    delete this._events[type];
	  }
	}
	
	exports.default = {
	
	  /**
	   * apply
	   * Apply event emitter to object
	   * @param {Object} object - target object
	   */
	
	  apply: function apply(obj) {
	    obj._events = {}; // holds all the Default registered events
	    obj._customEvents = {}; // holds all iScroll specific events
	  },
	
	  /**
	   * extend
	   * Extend object (for prototypes)
	   * @param {Object} object - target object
	   */
	  extend: function extend(obj) {
	    Object.assign(obj, { attach: attach, attachOnce: attachOnce, detach: detach, emit: emit, on: on, off: off });
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Mixins provides methods used for event dispatching
	 *
	 */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _fps = __webpack_require__(3);
	
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
	 * List all confogurable events
	 * @const {Array}
	 */
	var listOfInternalEvents = [
	// basic events
	'onReady', 'onRefresh', 'onDestroy',
	
	// declared on iscroll5
	'beforeScrollStart', 'scrollCancel', 'scrollStart', 'scroll', 'scrollEnd', 'flick', 'zoomStart', 'zoomEnd'];
	
	var EventHandlingModule = {
	  /**
	   * handleEvent
	   * Global event proxy
	   * @param {Object} e - event object
	   */
	
	  handleEvent: function handleEvent(e) {
	    switch (e.type) {
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
	      case this.eventType.transitionEnd:
	        this._eventTransitionEnd(e);
	        break;
	      case 'orientationchange':
	      case 'resize':
	        this._eventResize(e);
	        break;
	      case this.eventType.mousewheel:
	        this._mouseWheel(e);
	        break;
	    }
	  },
	
	  /**
	   * _eventStart
	   * Initial user interactions phase
	   * @param {Object} e - event object
	   */
	  _eventStart: function _eventStart(e) {
	    if (this.options.preventDefault) {
	      e.preventDefault();
	    }
	
	    var events = e.targetTouches || [e];
	    var id = undefined,
	        x = undefined,
	        y = undefined,
	        i = undefined,
	        l = undefined;
	
	    for (i = 0, l = events.length; i < l; i++) {
	
	      id = events[i].identifier || 0;
	      x = events[i].pageX;
	      y = events[i].pageY;
	
	      this.globalState.POINTS[id] = {
	        instance: this,
	        id: id + '',
	        phase: 'start',
	        initiated: false,
	        x: x,
	        y: y,
	        startX: x,
	        startY: y,
	        deltaX: 0,
	        deltaY: 0,
	        startTime: Date.now(),
	        currentTime: Date.now()
	      };
	    }
	
	    // start the rAF loop
	    if (!this.globalState.LOOP) {
	      this._renderLoop();
	    }
	
	    // start listening to 'move' and 'end' events only when the drag session is initiated
	    // on desktop this should prevent useless mousemove events
	    this.on(this.eventType.move, this.options.document);
	    this.on(this.eventType.end, this.options.document);
	  },
	
	  /**
	   * _eventMove
	   * Proceed each pointer move event
	   * @param {Object} e - event object
	   */
	  _eventMove: function _eventMove(e) {
	    var events = e.changedTouches || [e];
	    var POINTS = this.globalState.POINTS;
	
	    var id = undefined,
	        i = undefined;
	
	    for (i = events.length; i--;) {
	      id = events[i].identifier || 0;
	
	      if (POINTS[id] && POINTS[id].initiated) {
	        POINTS[id] = this._updatePoint(POINTS[id], e);
	        POINTS[id].phase = 'move';
	      }
	    }
	  },
	
	  /**
	   * _eventMove
	   * Proceed last interaction event
	   * @param {Object} e - event object
	   */
	  _eventEnd: function _eventEnd(e) {
	    var events = e.changedTouches || [e];
	    var POINTS = this.globalState.POINTS;
	
	    var id = undefined,
	        i = undefined;
	
	    for (i = events.length; i--;) {
	      id = events[i].identifier || 0;
	
	      if (POINTS[id] && POINTS[id].initiated) {
	        POINTS[id] = this._updatePoint(POINTS[id], e);
	        POINTS[id].phase = 'end';
	      }
	    }
	
	    this.off(this.eventType.move, this.options.document);
	    this.off(this.eventType.end, this.options.document);
	  },
	
	  /**
	   * _eventResize
	   * Proceed viewport resize event
	   * @param {Object} e - event object
	   */
	  _eventResize: function _eventResize(e) {
	    // if we resize before the script has been initialized
	    if (!this.state.ready) {
	      return this.attachOnce('onReady', this._eventResize.bind(this, e));
	    }
	
	    // debounce the resize event to spare resources
	    this._resizeTimeout = setTimeout(this.refresh.bind(this), 100);
	  },
	
	  /**
	   * _updatePoint
	   * ....
	   * @param {Object} point - .....
	   * @param {Object} e - event object
	   */
	  _updatePoint: function _updatePoint(point, e) {
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
	    if (theta < 0) {
	      theta += 2 * Math.PI;
	    }
	    //theta *= (180 / Math.PI);   // convert to degrees
	    point.theta = theta;
	
	    return point;
	  },
	
	  /**
	   * _renderLoop
	   * One frame in the requestAnimationFrame loop
	   */
	  _renderLoop: function _renderLoop() {
	    var pointCount = 0;
	    var POINTS = this.globalState.POINTS;
	
	    for (var id in POINTS) {
	      var point = POINTS[id];
	
	      switch (point.phase) {
	        case 'start':
	          if (!point.initiated) {
	            point.initiated = true;
	            this.emit('start', point);
	          }
	          break;
	        case 'move':
	          this.emit('move', point);
	          break;
	        case 'end':
	          point.initiated = false;
	          this.emit('end', point);
	          delete POINTS[id];
	          break;
	      }
	
	      pointCount++;
	    }
	
	    // keep animating until there are points in the POINTS object
	    this.globalState.LOOP = !!pointCount;
	
	    if (this.globalState.LOOP) {
	      (0, _fps.read)(this._renderLoop.bind(this));
	    }
	  },
	  _mouseWheel: function _mouseWheel(event) {
	
	    var deltaX = -event.wheelDeltaX || event.deltaX || 0;
	    var deltaY = -event.wheelDeltaY || event.deltaY || 0;
	
	    this.emit('wheel', {
	      deltaY: deltaY,
	      deltaX: deltaX,
	      originalEvent: event,
	      currentTime: Date.now()
	    });
	  }
	};
	
	/**
	 * assignEventsFromOptions
	 * Extend object with configured event data
	 * @param {Object} IscrollInstance - instance options
	 */
	var assignEventsFromOptions = function assignEventsFromOptions(IscrollInstance) {
	  var options = IscrollInstance.options;
	
	  listOfInternalEvents.forEach(function (eventName) {
	    if (!options[eventName]) {
	      return;
	    }
	
	    IscrollInstance.attach(eventName, options[eventName]);
	  });
	};
	
	/**
	 * detectTransitionEnd
	 * Find the transitionEnd event based on the vendor, there's no pattern so
	 * we have to use a function
	 * @param {Object} IscrollInstance
	 */
	var detectTransitionEnd = function detectTransitionEnd(_ref) {
	  var detects = _ref.detects;
	  var eventType = _ref.eventType;
	
	  var types = {
	    '': 'transitionend',
	    'webkit': 'webkitTransitionEnd',
	    'Moz': 'transitionend',
	    'O': 'oTransitionEnd',
	    'ms': 'MSTransitionEnd'
	  };
	
	  eventType.transitionEnd = types[detects.vendor] || false;
	};
	
	/**
	 * detectWheelEvent
	 * Find the mousewheel event
	 * @param {Object} IscrollInstance
	 */
	var detectWheelEvent = function detectWheelEvent(_ref2) {
	  var eventType = _ref2.eventType;
	
	  var eventName = '';
	
	  if ('onwheel' in document) {
	    // IE9+, FF17+, Ch31+
	    eventName = 'wheel';
	  } else if ('onmousewheel' in document) {
	    // Old fashioned
	    eventName = 'mousewheel';
	  } else {
	    // Firefox < 17
	    eventName = 'MozMousePixelScroll';
	  }
	
	  eventType.mousewheel = eventName;
	};
	
	exports.default = {
	
	  /**
	   * apply
	   * Extend object with configured event data
	   * @param {object} type - target object
	   */
	
	  apply: function apply(IscrollInstance) {
	    var options = IscrollInstance.options;
	    var detects = IscrollInstance.detects;
	
	    // choose the appropriate event type to use, it can also be forced via options
	
	    if (options.eventType) {
	      IscrollInstance.eventType = EVENT_TYPE[options.eventType];
	    } else if (detects.hasPointerEvents) {
	      IscrollInstance.eventType = EVENT_TYPE.pointer;
	    } else if (detects.hasMSpointerEvents) {
	      IscrollInstance.eventType = EVENT_TYPE.MSPointer;
	    } else if (detects.useTouchEvents) {
	      IscrollInstance.eventType = EVENT_TYPE.touch;
	    } else {
	      IscrollInstance.eventType = EVENT_TYPE.mouse;
	    }
	    detectTransitionEnd(IscrollInstance);
	    detectWheelEvent(IscrollInstance);
	
	    // bind basic events
	    IscrollInstance.on('orientationchange', window);
	    IscrollInstance.on('resize', window);
	    IscrollInstance.on(IscrollInstance.eventType.start);
	    IscrollInstance.on(IscrollInstance.eventType.transitionEnd);
	    IscrollInstance.on(IscrollInstance.eventType.mousewheel);
	
	    // setup events from user config
	    assignEventsFromOptions(IscrollInstance);
	  },
	
	  /**
	   * extend
	   * Extend object (for prototypes)
	   * @param {Object} object - target object
	   */
	  extend: function extend(IscrollPrototype) {
	    Object.assign(IscrollPrototype, EventHandlingModule);
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	
	var request = window.requestAnimationFrame;
	var cancel = window.cancelAnimationFrame;
	
	var lastTime = 0;
	var readers = [];
	var writers = [];
	for (var x = 0; x < vendors.length && !request; ++x) {
	  exports.request = request = window[vendors[x] + 'RequestAnimationFrame'];
	  exports.cancel = cancel = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	
	if (!request) {
	  exports.request = request = function request(callback) {
	    var currTime = new Date().getTime();
	    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	    var id = setTimeout(function () {
	      callback(currTime + timeToCall);
	    }, timeToCall);
	
	    lastTime = currTime + timeToCall;
	    return id;
	  };
	}
	
	if (!cancel) {
	  exports.cancel = cancel = function cancel(id) {
	    clearTimeout(id);
	  };
	}
	
	var read = function read(fn) {
	  readers.push(fn);
	};
	
	var write = function write(fn) {
	  writers.push(fn);
	};
	
	var throttle = function throttle(fn) {
	  var raf = undefined;
	
	  return function requestAnimationFrameThrottler() {
	    var args = arguments;
	    if (raf) {
	      cancel(raf);
	    }
	
	    raf = read(function requestAnimationFrameHandler() {
	      raf = false;
	      fn.apply(this, args);
	    });
	  };
	};
	
	var loop = function loop() {
	  var read = readers;
	  readers = [];
	  read.forEach(function (t) {
	    return t();
	  });
	
	  var write = writers;
	  writers = [];
	  write.forEach(function (t) {
	    return t();
	  });
	
	  request(loop, 'loop set');
	};
	
	request(loop, 'loop set');
	
	exports.request = request;
	exports.cancel = cancel;
	exports.read = read;
	exports.write = write;
	exports.throttle = throttle;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Component, render layer
	 */
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _easings = __webpack_require__(5);
	
	var _fps = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// store events to calculate velocity here
	var pointersTimeCapsule = [];
	var pointersTimeCapsuleLimit = 15;
	var wheelTimeCapsule = [];
	var wheelTimeCapsuleLimit = 15;
	
	var RenderLayer = function () {
	
	  /**
	   * constructor
	   */
	
	  function RenderLayer(name, element, IscrollInstance) {
	    _classCallCheck(this, RenderLayer);
	
	    this.parent = IscrollInstance;
	    this.container = element;
	    this.parent[name] = this;
	    this.name = name;
	
	    var parent = this.parent;
	
	    if (!parent.state[name]) {
	      parent.state[name] = {};
	    }
	
	    this.state = parent.state[name];
	
	    if (true) {
	      // shadowLayer
	      var shadowLayer = document.createElement('div');
	      shadowLayer.style.position = 'absolute';
	      shadowLayer.style.top = 0;
	      shadowLayer.style.left = 0;
	      shadowLayer.style.border = '1px solid red';
	      shadowLayer.style.borderSizing = 'border-box';
	      shadowLayer.style.background = 'rgba(255,0,0,0.1)';
	      shadowLayer.style.opacity = 0;
	      this.shadowLayer = shadowLayer;
	      parent.container.appendChild(shadowLayer);
	
	      // momentumLayerX
	      var momentumLayerX = document.createElement('div');
	      momentumLayerX.style.position = 'absolute';
	      momentumLayerX.style.height = '5px';
	      momentumLayerX.style.width = '50%';
	      momentumLayerX.style.left = '50%';
	      momentumLayerX.style.bottom = 2;
	      momentumLayerX.style.transformOrigin = '0% 50%';
	      momentumLayerX.style.background = 'rgba(255,0,0,0.5)';
	      momentumLayerX.style.transform = 'scaleX(0)';
	      this.momentumLayerX = momentumLayerX;
	      parent.container.appendChild(momentumLayerX);
	
	      // momentumLayerX
	      var momentumLayerY = document.createElement('div');
	      momentumLayerY.style.position = 'absolute';
	      momentumLayerY.style.width = '5px';
	      momentumLayerY.style.height = '50%';
	      momentumLayerY.style.top = '50%';
	      momentumLayerY.style.left = 2;
	      momentumLayerY.style.transformOrigin = '50% 0%';
	      momentumLayerY.style.transform = 'scaleX(0)';
	      momentumLayerY.style.background = 'rgba(255,0,0,0.5)';
	      this.momentumLayerY = momentumLayerY;
	      parent.container.appendChild(momentumLayerY);
	    }
	
	    this.init();
	    this.subscribe();
	  }
	
	  /**
	   * init
	   */
	
	  _createClass(RenderLayer, [{
	    key: 'init',
	    value: function init() {
	      var state = this.state;
	      var container = this.container;
	
	      if (!state.x) {
	        state.x = state.currentX = container.offsetLeft;
	      }
	
	      if (!state.y) {
	        state.y = state.currentY = container.offsetTop;
	      }
	
	      this.refresh();
	    }
	
	    /**
	     * processWheel
	     * Process mousewheel event
	     * @param {Object} event - wheel event
	     */
	
	  }, {
	    key: 'processWheel',
	    value: function processWheel(_ref) {
	      var deltaY = _ref.deltaY;
	      var deltaX = _ref.deltaX;
	      var currentTime = _ref.currentTime;
	      var originalEvent = _ref.originalEvent;
	      var state = this.state;
	      var parent = this.parent;
	
	      state.isAnimated = false;
	
	      if (parent.options.preventPageScrollWhileScrolling) {
	        originalEvent.preventDefault();
	      }
	
	      // update wheelTimecapsule
	      wheelTimeCapsule.push({
	        x: deltaX,
	        y: deltaY,
	        time: currentTime
	      });
	      if (wheelTimeCapsule.length > wheelTimeCapsuleLimit) {
	        wheelTimeCapsule.shift();
	      }
	
	      // filtrate Mac magicpad
	      if (deltaY % 120 && deltaY % 100) {
	        //console.log('isMacigPad');
	        state.currentY += -deltaY;
	        this.renderPosition();
	        return;
	      }
	
	      if (Math.abs(deltaY) > 10) {
	        //console.log('isMouseWheel, needs to be animated');
	        this.releaseWheel(deltaY, deltaX);
	      }
	    }
	  }, {
	    key: 'releaseWheel',
	    value: function releaseWheel(deltaY, deltaX) {
	      var state = this.state;
	
	      if (wheelTimeCapsule.length < 2) {
	        wheelTimeCapsule.length = 0;
	        wheelTimeCapsule.push({
	          x: deltaX,
	          y: deltaY,
	          time: Date.now() - 16
	        });
	        wheelTimeCapsule.push({
	          x: deltaX,
	          y: deltaY,
	          time: Date.now()
	        });
	      }
	
	      // calculate wheel velocity
	      var firstPoint = wheelTimeCapsule[0];
	      var lastPoint = wheelTimeCapsule[wheelTimeCapsule.length - 1];
	      var xOffset = 0;
	      var yOffset = 0;
	      wheelTimeCapsule.forEach(function (item) {
	        xOffset += item.x;
	        yOffset += item.y;
	      });
	
	      xOffset *= 0.5;
	      yOffset *= 0.5;
	
	      var timeOffset = lastPoint.time - firstPoint.time;
	      var timePerPoint = timeOffset / wheelTimeCapsule.length;
	
	      state.velocityX = -1 * (xOffset / timePerPoint) || 0;
	      state.velocityY = -1 * (yOffset / timePerPoint) || 0;
	
	      wheelTimeCapsule.length = 0;
	      this.releaseVelocity();
	    }
	
	    /**
	     * processInteraction
	     * Get pointer data from EventProcessor
	     * @param {Object} event - pointer event
	     */
	
	  }, {
	    key: 'processInteraction',
	    value: function processInteraction(e) {
	      var state = this.state;
	
	      state.isAnimated = false;
	
	      if (e.phase === 'start') {
	        state.startX = state.lastX = state.currentX || 0;
	        state.startY = state.lastY = state.currentY || 0;
	        pointersTimeCapsule.length = 0; // empty array (mutate)
	      }
	
	      // update pointersTimecapsule
	      pointersTimeCapsule.push({
	        x: e.x,
	        y: e.y,
	        time: e.currentTime
	      });
	      if (pointersTimeCapsule.length > pointersTimeCapsuleLimit) {
	        pointersTimeCapsule.shift();
	      }
	
	      if (e.distanceX && e.distanceY) {
	        state.lastX = state.currentX;
	        state.lastY = state.currentY;
	        state.currentX = state.startX - e.distanceX;
	        state.currentY = state.startY - e.distanceY;
	
	        this.renderPosition();
	      }
	
	      if (e.phase === 'end') {
	        delete state.startX;
	        delete state.startY;
	
	        this.calculateVelocity();
	        this.releaseVelocity();
	      }
	
	      if (true) {
	        // to display velocity on the corners while development
	        this.calculateVelocity();
	      }
	    }
	
	    /**
	     * getOverscrollX
	     * detect overscroll by x
	     * @param {Number} x
	     * @return {Number} overscroll by x
	     */
	
	  }, {
	    key: 'getOverscrollX',
	    value: function getOverscrollX(x) {
	      var state = this.state;
	      var parentState = this.parent.state;
	
	      var result = 0;
	
	      if (!x) {
	        x = state.currentX;
	      }
	
	      if (x > 0) {
	        result = x;
	      } else if (state.width + x < parentState.width) {
	        result = state.width + x - parentState.width;
	      }
	
	      return result;
	    }
	
	    /**
	     * getOverscrollY
	     * detect overscroll by y
	     * @param {Number} y
	     * @return {Number} overscroll by y
	     */
	
	  }, {
	    key: 'getOverscrollY',
	    value: function getOverscrollY(y) {
	      var state = this.state;
	      var parentState = this.parent.state;
	
	      var result = 0;
	
	      if (!y) {
	        y = state.currentY;
	      }
	
	      if (y > 0) {
	        result = y;
	      } else if (state.height + y < parentState.height) {
	        result = state.height + y - parentState.height;
	      }
	
	      return result;
	    }
	
	    /**
	     * renderPosition
	     * Render layer position
	     */
	
	  }, {
	    key: 'renderPosition',
	    value: function renderPosition() {
	      var state = this.state;
	      var container = this.container;
	      var options = this.parent.options;
	
	      var transform = this.parent.styles.transform;
	
	      // calculate boundaries and overscrollX
	      state.overscrollX = this.getOverscrollX();
	      state.overscrollY = this.getOverscrollY();
	
	      // calculate position
	      if (options.scrollX) {
	        state.x = state.currentX - (state.overscrollX || 0);
	        if (state.overscrollX && options.allowOverscroll) {
	          state.x += this.overscrollReducer(state.overscrollX);
	        }
	      }
	
	      // calculate position
	      if (options.scrollY) {
	        state.y = state.currentY - (state.overscrollY || 0);
	        if (state.overscrollY && options.allowOverscroll) {
	          state.y += this.overscrollReducer(state.overscrollY);
	        }
	      }
	
	      // #DEV - display actual layer (not reduced by bounds or thresholds)
	      if (true) {
	        if (state.overscrollX || state.overscrollY) {
	          this.shadowLayer.style[transform] = 'translate3d(' + state.currentX + 'px, ' + state.currentY + 'px, 0px)';
	
	          // this.shadowLayer.style.opacity = 1;
	        } else if (this.shadowLayer.style.opacity) {
	            this.shadowLayer.style.opacity = 0;
	          }
	      }
	
	      if (transform) {
	        container.style[transform] = 'translate3d(' + state.x + 'px, ' + state.y + 'px, 0px)';
	        return;
	      }
	
	      // respect old-fashioned browsers
	      container.style.left = this.state.x;
	      container.style.top = this.state.y;
	    }
	
	    /**
	     * calculateVelocity
	     * Calculate interaction velocity
	     */
	
	  }, {
	    key: 'calculateVelocity',
	    value: function calculateVelocity() {
	      var state = this.state;
	
	      var firstPoint = pointersTimeCapsule[0];
	      var lastPoint = pointersTimeCapsule[pointersTimeCapsule.length - 1];
	
	      var xOffset = lastPoint.x - firstPoint.x;
	      var yOffset = lastPoint.y - firstPoint.y;
	      var timeOffset = lastPoint.time - firstPoint.time;
	
	      var timePerPoint = timeOffset / pointersTimeCapsule.length;
	
	      state.velocityX = xOffset / timePerPoint || 0;
	      state.velocityY = yOffset / timePerPoint || 0;
	
	      if (true) {
	        this.momentumLayerX.style.transform = 'scaleX(' + state.velocityX / 30 + ')';
	        this.momentumLayerY.style.transform = 'scaleY(' + state.velocityY / 30 + ')';
	      }
	    }
	
	    /**
	     * releaseVelocity
	     * Animate layer, based on current velocity
	     */
	
	  }, {
	    key: 'releaseVelocity',
	    value: function releaseVelocity() {
	      var _this = this;
	
	      var state = this.state;
	      var options = this.parent.options;
	
	      var speedThreshold = 0.3;
	      var framesX = 0;
	      var framesY = 0;
	      var distanceX = 0;
	      var distanceY = 0;
	      var i = 1;
	
	      if (state.overscrollX && state.overscrollY) {
	        return this._animate({
	          distanceX: -state.overscrollX || 0,
	          distanceY: -state.overscrollY || 0,
	          time: 350
	        });
	      }
	
	      // calculate how much frames needs to impulse for go out
	      if (state.overscrollX) {
	        distanceX = -state.overscrollX;
	      } else if (state.velocityX && Math.abs(state.velocityX) > speedThreshold) {
	        framesX = Math.abs(Math.ceil(Math.log(speedThreshold / Math.abs(state.velocityX)) / Math.log(options.friction)));
	
	        i = 1;
	        while (i <= framesX) {
	          var velocity = state.velocityX * Math.pow(options.friction, i);
	
	          if (this.getOverscrollY(state.currentY + distanceY)) {
	            velocity *= options.deceleration;
	            framesX -= Math.round(1 / options.deceleration);
	          }
	
	          distanceY += velocity;
	          i++;
	        }
	      }
	
	      if (state.overscrollY) {
	        distanceY = -state.overscrollY;
	      } else if (state.velocityY && Math.abs(state.velocityY) > speedThreshold) {
	        framesY = Math.abs(Math.ceil(Math.log(speedThreshold / Math.abs(state.velocityY)) / Math.log(options.friction)));
	
	        i = 1;
	        while (i <= framesY) {
	          var velocity = state.velocityY * Math.pow(options.friction, i);
	
	          if (this.getOverscrollY(state.currentY + distanceY)) {
	            velocity *= options.deceleration;
	            framesY -= Math.round(1 / options.deceleration);
	          }
	
	          distanceY += velocity;
	          i++;
	        }
	      }
	
	      var frames = Math.max(framesY, framesX, Math.round(350 / 16));
	
	      this._animate({
	        distanceX: distanceX, distanceY: distanceY, frames: frames, easing: _easings.outQuartic,
	        callback: function callback() {
	          // check if destination points makes us to feel little bit overscrolled.
	          if (state.overscrollX || state.overscrollY) {
	            return _this._animate({
	              distanceX: -state.overscrollX || 0,
	              distanceY: -state.overscrollY || 0,
	              time: 300
	            });
	          }
	        }
	      });
	    }
	
	    /**
	     * _animate
	     * Internal function to provide flexible api for animations. Used as internal method.
	     * @param  {Object} option
	     */
	
	  }, {
	    key: '_animate',
	    value: function _animate(_ref2) {
	      var _this2 = this;
	
	      var distanceX = _ref2.distanceX;
	      var distanceY = _ref2.distanceY;
	      var easing = _ref2.easing;
	      var frames = _ref2.frames;
	      var time = _ref2.time;
	      var callback = _ref2.callback;
	      var state = this.state;
	
	      var startX = state.currentX;
	      var startY = state.currentY;
	      var currentFrame = 0;
	
	      (0, _fps.cancel)(this._animateRAF);
	      var id = Math.random();
	
	      if (!frames && time) {
	        frames = time / (1000 / 60);
	      }
	
	      if (!easing) {
	        easing = _easings.inertia;
	      }
	
	      state.isAnimated = true;
	
	      var tick = function tick() {
	        if (!state.isAnimated) {
	          return;
	        }
	
	        console.log(id);
	
	        state.currentX = easing(currentFrame, startX, distanceX, frames);
	        state.currentY = easing(currentFrame, startY, distanceY, frames);
	
	        _this2.renderPosition();
	
	        currentFrame++;
	        if (currentFrame < frames) {
	          (0, _fps.write)(tick);
	        } else {
	          state.isAnimated = false;
	          if (typeof callback === 'function') {
	            callback();
	          }
	        }
	      };
	
	      this._animateRAF = (0, _fps.request)(tick);
	    }
	
	    /**
	     * overscrollReducer
	     * Reduce ammount of overscroll
	     * @param {Number} value - ammout of overscroll
	     * @return {Number} result - reduced ammount
	     */
	
	  }, {
	    key: 'overscrollReducer',
	    value: function overscrollReducer(value) {
	      var direction = value > 0 ? 1 : -1;
	      var i = Math.abs(value);
	      var results = 0;
	      while (i > 0) {
	        results += 1 / Math.pow(1.0035, i) * direction;
	        i--;
	      }
	
	      return results;
	    }
	
	    /**
	     * subscribe
	     * Subsribe to pointer events
	     */
	
	  }, {
	    key: 'subscribe',
	    value: function subscribe() {
	      this._processInteraction = this.processInteraction.bind(this);
	      this._processWheel = this.processWheel.bind(this);
	      this.parent.attach('start move end', this._processInteraction);
	      this.parent.attach('wheel', this._processWheel);
	    }
	
	    /**
	     * subscribe
	     * Unsubscribe from anything
	     */
	
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe() {
	      this.parent.detach('start move end', this.processInteraction);
	      this.parent.detach('wheel', this.processWheel);
	    }
	
	    /**
	     * refresh
	     * Refresh component data
	     */
	
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      var state = this.state;
	      var container = this.container;
	
	      state.width = container.offsetWidth;
	      state.height = container.offsetHeight;
	
	      if (true) {
	        var shadowLayer = this.shadowLayer;
	
	        shadowLayer.style.width = state.width;
	        shadowLayer.style.height = state.height;
	      }
	    }
	
	    /**
	     * destroy
	     * destroy function
	     */
	
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.unsubscribe();
	
	      if (true) {
	        var container = this.parent.container;
	
	        container.removeChild(this.shadowLayer);
	        container.removeChild(this.momentumLayerX);
	        container.removeChild(this.momentumLayerY);
	      }
	    }
	  }]);
	
	  return RenderLayer;
	}();
	
	exports.default = RenderLayer;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Easings collection
	 */
	
	/**
	 * Inertia easing
	 * @param {Number} currentFrame
	 * @param {Number} currentValue
	 * @param {Number} ammountOfChange
	 * @param {Number} totalFrames
	 */
	var inertia = function inertia(t, b, c, d) {
	  return c * ((t = t / d - 1) * t * t + 1) + b;
	};
	
	/**
	 * Inertia easing
	 * @param {Number} currentFrame
	 * @param {Number} currentValue
	 * @param {Number} ammountOfChange
	 * @param {Number} totalFrames
	 */
	var outQuartic = function outQuartic(t, b, c, d) {
	  var ts = (t /= d) * t;
	  var tc = ts * t;
	  return b + c * (-1 * ts * ts + 4 * tc + -6 * ts + 4 * t);
	};
	
	exports.inertia = inertia;
	exports.outQuartic = outQuartic;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	window.debug = __webpack_require__(7);
	window.debug.enable();
	
	module.exports = function (name) {
	  return window.debug(name);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(8);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(9);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  eventType: undefined, // what event type will be used. undefined = autodetect
	  'document': document, // the bottom most DOM element used for "move" and "end" events
	  preventDefault: true,
	
	  // scrolling
	  allowOverscroll: true,
	  scrollY: true,
	  scrollX: false,
	
	  // momentum
	  friction: 0.92,
	  deceleration: 0.3,
	
	  // events
	  onReady: undefined
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Part, detects environment, supports, etc
	 *
	 */
	'use strict';
	
	/**
	 * detectVendorPrefix
	 * Browser vendor, used to apply CSS properties
	 * @param {Object} detects - object to write detected data
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var detectVendorPrefix = function detectVendorPrefix(detects) {
	  var elementStyle = document.createElement('div').style;
	  var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
	  var vendor = false;
	
	  for (var i = 0, l = vendors.length; i < l; i++) {
	    if (vendors[i] + 'ransform' in elementStyle) {
	      vendor = vendors[i].substr(0, vendors[i].length - 1);
	      break;
	    }
	  }
	
	  detects.vendor = vendor;
	};
	
	/**
	 * prefixCSSProperty
	 * If needed prefix the CSS property with the vendor specific version
	 * @param {string}   style - property to prefix
	 * @param {Object} detects - object to write detected data
	 */
	var prefixCSSProperty = function prefixCSSProperty(style, detects) {
	  var vendor = detects.vendor;
	
	  if (vendor === false) {
	    return false;
	  }
	
	  var elementStyle = document.createElement('div').style;
	  style = vendor === '' ? style : vendor + style.charAt(0).toUpperCase() + style.substr(1);
	  return style in elementStyle && style;
	};
	
	/**
	 * detectPointerEvents
	 * Find what kind of events supports on client
	 * @param {Object} detects - object to write detected data
	 */
	var detectPointerEvents = function detectPointerEvents(detects) {
	
	  Object.assign(detects, {
	    hasPointerEvents: !!window.navigator.pointerEnabled,
	    hasMSpointerEvents: !!window.navigator.msPointerEnabled,
	
	    // we are going to use user agent spoofing to prevent touch events on desktop. TODO: can it be done w/o spoofing?
	    useTouchEvents: 'ontouchstart' in window && /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(window.navigator.userAgent)
	  });
	
	  detects.useMouseEvents = !detects.hasPointerEvents && !detects.hasMSpointerEvents && !detects.useTouchEvents;
	};
	
	/**
	 * apply
	 * Extend object with calculated client data
	 * @param {object} IscrollPrototype - target object
	 */
	
	exports.default = function (IscrollPrototype) {
	  IscrollPrototype.detects = {};
	  IscrollPrototype.styles = {};
	  var detects = IscrollPrototype.detects;
	  var styles = IscrollPrototype.styles;
	
	  // run detects;
	
	  detectPointerEvents(detects);
	  detectVendorPrefix(detects);
	
	  // run style prefixes (#should move out of here soon)
	  Object.assign(styles, {
	    transform: prefixCSSProperty('transform', detects),
	    transitionDuration: prefixCSSProperty('transitionDuration', detects)
	  });
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _fps = __webpack_require__(3);
	
	var ksort = function ksort(src) {
	  var keys = Object.keys(src),
	      target = {};
	  keys.sort();
	  keys.forEach(function (key) {
	    target[key] = src[key];
	  });
	  return target;
	};
	
	exports.default = function (IscrollInstance) {
	  var stats = document.createElement('div');
	  var oldstring = undefined,
	      newstring = undefined;
	  stats.style.position = 'fixed';
	  stats.style.top = 0;
	  stats.style.right = 0;
	  stats.style.padding = 10;
	  stats.style.background = 'red';
	  IscrollInstance.container.appendChild(stats);
	
	  function tick() {
	    var obj = Object.assign({}, IscrollInstance.state);
	    //console.log(JSON.stringify(obj.POINTS[0], null, 4));
	    delete obj.POINTS;
	    obj.viewLayer = ksort(obj.viewLayer);
	
	    newstring = JSON.stringify(obj, null, 4);
	
	    if (oldstring !== newstring) {
	      oldstring = newstring;
	      stats.innerHTML = '<pre style="width:360px">' + newstring + '</pre>';
	    }
	    (0, _fps.write)(tick);
	  }
	  (0, _fps.write)(tick);
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjgzM2FkZGEwODUwM2VmN2JjNjEiLCJ3ZWJwYWNrOi8vLy4vaXNjcm9sbC5qcyIsIndlYnBhY2s6Ly8vLi9taXhpbnMvRXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovLy8uL21peGlucy9FdmVudFByb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi9saWJzL2Zwcy5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1JlbmRlckxheWVyLmpzIiwid2VicGFjazovLy8uL2xpYnMvZWFzaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4uL34vZGVidWcvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9kZWJ1Zy9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9tcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pc2Nyb2xsLm9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vaXNjcm9sbC5kZXRlY3RzLmpzIiwid2VicGFjazovLy8uL2Rldi9TdGF0ZVBhbmVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDbkNBLGFBQVk7OztBQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2IsS0FBSSxJQUEwQixFQUFFO0FBQzlCLE9BQU0sTUFBSyxHQUFHLG1CQUFPLENBQUMsQ0FBZ0IsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUQsU0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDbEM7Ozs7OztBQU1ELEtBQU0sV0FBVyxHQUFH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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOzs7Ozs7OztBQ3RLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVk7QUFDWjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWlCLFNBQVM7QUFDMUIsNkJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLFNBQVM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsTUFBTTtBQUNqQixhQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BNQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsY0FBYztBQUN6QixZQUFXLE9BQU87QUFDbEIsYUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDNUhBLE9BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixZQUFTLEVBQUUsU0FBUztBQUNwQixhQUFVLEVBQUUsUUFBUTtBQUNwQixpQkFBYyxFQUFFLElBQUk7OztBQUdwQixrQkFBZSxFQUFFLElBQUk7QUFDckIsVUFBTyxFQUFFLElBQUk7QUFDYixVQUFPLEVBQUUsS0FBSzs7O0FBR2QsV0FBUSxFQUFHLElBQUk7QUFDZixlQUFZLEVBQUcsR0FBRzs7O0FBR2xCLFVBQU8sRUFBRSxTQUFTO0VBQ25CLEM7Ozs7Ozs7Ozs7QUNaRCxhQUFZOzs7Ozs7O0FBQUM7Ozs7QUFPYixLQUFNLGtCQUFrQixHQUFHLFNBQXJCLGtCQUFrQixDQUFHLE9BQU8sRUFBSTtBQUNwQyxPQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUN2RCxPQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwRCxPQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7O0FBRW5CLFFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDOUMsU0FBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxJQUFJLFlBQVksRUFBRTtBQUMzQyxhQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyRCxhQUFNO01BQ1A7SUFDRjs7QUFFRCxVQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztFQUN6Qjs7Ozs7Ozs7QUFRRCxLQUFNLGlCQUFpQixHQUFHLFNBQXBCLGlCQUFpQixDQUFJLEtBQUssRUFBRSxPQUFPLEVBQUs7T0FDdEMsTUFBTSxHQUFJLE9BQU8sQ0FBakIsTUFBTTs7QUFFWixPQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7QUFDcEIsWUFBTyxLQUFLLENBQUM7SUFDZDs7QUFFRCxPQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUN2RCxRQUFLLEdBQUcsTUFBTSxLQUFLLEVBQUUsR0FBRyxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RixVQUFPLEtBQUssSUFBSSxZQUFZLElBQUksS0FBSyxDQUFDO0VBQ3ZDOzs7Ozs7O0FBT0QsS0FBTSxtQkFBbUIsR0FBRyxTQUF0QixtQkFBbUIsQ0FBRyxPQUFPLEVBQUk7O0FBRXJDLFNBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO0FBQ3JCLHFCQUFnQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWM7QUFDbkQsdUJBQWtCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCOzs7QUFHdkQsbUJBQWMsRUFBRyxjQUFjLElBQUksTUFBTSxJQUFLLDRDQUE0QyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUM1SCxDQUFDLENBQUM7O0FBRUgsVUFBTyxDQUFDLGNBQWMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7RUFDOUc7Ozs7Ozs7QUFBQzttQkFPYSwwQkFBZ0IsRUFBSTtBQUNqQyxtQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQzlCLG1CQUFnQixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7T0FDdkIsT0FBTyxHQUFhLGdCQUFnQixDQUFwQyxPQUFPO09BQUUsTUFBTSxHQUFLLGdCQUFnQixDQUEzQixNQUFNOzs7O0FBR3JCLHNCQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLHFCQUFrQixDQUFDLE9BQU8sQ0FBQzs7O0FBRzNCLFNBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ3BCLGNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDO0FBQ2xELHVCQUFrQixFQUFFLGlCQUFpQixDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQztJQUNyRSxDQUFDLENBQUM7RUFDSixDOzs7Ozs7QUNqRkQsYUFBWSxDQUFDOzs7Ozs7OztBQUdiLEtBQU0sS0FBSyxHQUFHLFNBQVIsS0FBSyxDQUFjLEdBQUcsRUFBRztBQUM3QixPQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFFLEdBQUcsQ0FBRTtPQUN6QixNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLE9BQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNaLE9BQUksQ0FBQyxPQUFPLENBQUMsVUFBVyxHQUFHLEVBQUc7QUFDNUIsV0FBTSxDQUFFLEdBQUcsQ0FBRSxHQUFHLEdBQUcsQ0FBRSxHQUFHLENBQUUsQ0FBQztJQUM1QixDQUFDLENBQUM7QUFDSCxVQUFPLE1BQU0sQ0FBQztFQUNmLENBQUM7O21CQUVhLFVBQUMsZUFBZSxFQUFLO0FBQ2xDLE9BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUMsT0FBSSxTQUFTO09BQUUsU0FBUyxhQUFDO0FBQ3pCLFFBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUMvQixRQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDcEIsUUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLFFBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUN6QixRQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDL0Isa0JBQWUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUU3QyxZQUFTLElBQUksR0FBRztBQUNkLFNBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUM7O0FBRWxELFlBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUNsQixRQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRXJDLGNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRXpDLFNBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtBQUMzQixnQkFBUyxHQUFHLFNBQVMsQ0FBQztBQUN0QixZQUFLLENBQUMsU0FBUyxpQ0FBK0IsU0FBUyxXQUFRLENBQUM7TUFDakU7QUFDRCxjQWxDSyxLQUFLLEVBa0NKLElBQUksQ0FBQyxDQUFDO0lBQ2I7QUFDRCxZQXBDTyxLQUFLLEVBb0NOLElBQUksQ0FBQyxDQUFDO0VBRWIsQyIsImZpbGUiOiJpc2Nyb2xsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjgzM2FkZGEwODUwM2VmN2JjNjFcbiAqKi8iLCIvKiFcbiAqIGlTY3JvbGwgYnkgTWF0dGVvIFwiQ3ViaXFcIiBTcGluZWxsaSB+IGh0dHA6Ly9jdWJpcS5vcmcgfiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZVxuICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIGV4YW1wbGUgb2YgZGVidWcgdG9vbC4gQWxsIGRlYnVnIGNvZGUgd2lsbCBzdHJpcCBvbiBwcm9kdWN0aW9uXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgY29uc3QgZGVidWcgPSByZXF1aXJlKCcuL2Rldi9kZWJ1Zy5qcycpKCdpc2Nyb2xsOmlzY3JvbGwuanMnKTtcbiAgd2luZG93LmRlYnVnLmVuYWJsZSgnaXNjcm9sbDoqJyk7XG59XG5cbi8qKlxuICogZ2xvYmFsIE9iamVjdCwgd2l0aFxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgZ2xvYmFsU3RhdGUgPSB7XG4gIExPT1A6IGZhbHNlLFxuICBQT0lOVFM6IFtdLFxufTtcblxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuL21peGlucy9FdmVudEVtaXR0ZXIuanMnO1xuaW1wb3J0IEV2ZW50UHJvY2Vzc29yIGZyb20gJy4vbWl4aW5zL0V2ZW50UHJvY2Vzc29yLmpzJztcbmltcG9ydCBSZW5kZXJMYXllciBmcm9tICcuL2NvbXBvbmVudHMvUmVuZGVyTGF5ZXIuanMnO1xuXG5cbi8qKlxuICogSVNjcm9sbFxuICogTWFpbiBzYW5kYm94XG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgSXNjcm9sbCB7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSAgeyhIVE1MRWxlbWVudHxzdHJpbmdcXGpRdWVyeUVsZW1lbnQpfSBlbCAtIFRoZSBpbml0aWF0b3IgZWxlbWVudFxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgZGVidWcoJ2NvbnN0cnVjdG9yIScpO1xuICAgIHdpbmRvdy5pc2Nyb2xsID0gdGhpcztcblxuICAgIGlmIChlbGVtZW50LmpxdWVyeSkge1xuICAgICAgZWxlbWVudCA9IGVsZW1lbnRbMF07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuICAgIH1cbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHRocm93ICdFbGVtZW50IGlzIG5vdCBkZWZpbmVkISc7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHJlcXVpcmUoJy4vaXNjcm9sbC5vcHRpb25zLmpzJyksIG9wdGlvbnMpO1xuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICB0aGlzLmdsb2JhbFN0YXRlID0gZ2xvYmFsU3RhdGU7XG5cbiAgICAvLyBFWFRFTkRTXG4gICAgcmVxdWlyZSgnLi9pc2Nyb2xsLmRldGVjdHMuanMnKS5kZWZhdWx0KHRoaXMpOyAvLyBjYW4gYmUgbW92ZWQgb3V0IG9mIGNvbnN0cnVjdG9yLCBkdWUgcGVyZm9tYW5jZSByZWFzb25zXG4gICAgRXZlbnRFbWl0dGVyLmFwcGx5KHRoaXMpO1xuICAgIEV2ZW50UHJvY2Vzc29yLmFwcGx5KHRoaXMpO1xuXG4gICAgLy8gUkVOREVSSU5HXG4gICAgbmV3IFJlbmRlckxheWVyKCd2aWV3TGF5ZXInLCB0aGlzLmNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZCwgdGhpcyk7XG5cbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB0aGlzLnN0YXRlLnJlYWR5ID0gdHJ1ZTtcbiAgICBkZWJ1ZygncmVhZHkhJyk7XG4gICAgdGhpcy5lbWl0KCdvblJlYWR5Jyk7XG5cbiAgICAvLyAjREVWIC0gQURESVRJT05BTCBNT0RVTEVTXG4gICAgaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICByZXF1aXJlKCcuL2Rldi9TdGF0ZVBhbmVsLmpzJykuZGVmYXVsdCh0aGlzKTsgLy8gU3RhdGUgZGlzcGxheSBwYW5lbFxuICAgIH1cblxuICAgIC8vICNERVYgLSBIT1QgTU9EVUxFIFJFUExBQ0VNRU5UIEZPUiBFWFRFTkRTXG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcblxuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoWycuL2lzY3JvbGwuZGV0ZWN0cy5qcycsICcuL21peGlucy9FdmVudEVtaXR0ZXIuanMnLCAnLi9taXhpbnMvRXZlbnRQcm9jZXNzb3IuanMnXSwgKCkgPT4ge1xuICAgICAgICB0aGlzLm9mZigpO1xuICAgICAgICByZXF1aXJlKCcuL2lzY3JvbGwuZGV0ZWN0cy5qcycpLmRlZmF1bHQodGhpcyk7IC8vIGNhbiBiZSBtb3ZlZCBvdXQgb2YgY29uc3RydWN0b3IsIGR1ZSBwZXJmb21hbmNlIHJlYXNvbnNcblxuICAgICAgICB2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi9taXhpbnMvRXZlbnRFbWl0dGVyLmpzJykuZGVmYXVsdDtcbiAgICAgICAgdmFyIEV2ZW50UHJvY2Vzc29yID0gcmVxdWlyZSgnLi9taXhpbnMvRXZlbnRQcm9jZXNzb3IuanMnKS5kZWZhdWx0O1xuXG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICAgIHZhciBjdXN0b21FdmVudHMgPSB0aGlzLl9jdXN0b21FdmVudHM7XG5cbiAgICAgICAgRXZlbnRFbWl0dGVyLmFwcGx5KHRoaXMpO1xuICAgICAgICBFdmVudFByb2Nlc3Nvci5hcHBseSh0aGlzKTtcbiAgICAgICAgRXZlbnRFbWl0dGVyLmV4dGVuZChJc2Nyb2xsLnByb3RvdHlwZSk7XG4gICAgICAgIEV2ZW50UHJvY2Vzc29yLmV4dGVuZChJc2Nyb2xsLnByb3RvdHlwZSk7XG5cbiAgICAgICAgLy8gcmVzdG9yZSBhbGwgcHJldmlvdXMgZGVjbGFyZWQgZXZlbnRzXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IGV2ZW50cztcbiAgICAgICAgdGhpcy5fY3VzdG9tRXZlbnRzID0gY3VzdG9tRXZlbnRzO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcmV0dXJuIGFsbCBET00gdG8gaW5pdGlhbCBzdGF0ZSwgY2xlYW4gdXAgYWZ0ZXIgbWVhbFxuICBkZXN0cnVjdG9yKCkge1xuXG4gIH1cblxuICAvLyBmb3JjZSB1cGRhdGUgc3RhdGVcbiAgdXBkYXRlKCkge1xuXG4gIH1cblxuICAvLyBmb3JjZSB1cGRhdGUgc3RhdGVcbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLnN0YXRlLndpZHRoID0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5zdGF0ZS5oZWlnaHQgPSB0aGlzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJ1Y3RvcigpO1xuICAgIHRoaXMub2ZmKCk7XG4gIH1cbn1cblxuRXZlbnRFbWl0dGVyLmV4dGVuZChJc2Nyb2xsLnByb3RvdHlwZSk7XG5FdmVudFByb2Nlc3Nvci5leHRlbmQoSXNjcm9sbC5wcm90b3R5cGUpO1xuXG53aW5kb3cuSXNjcm9sbCA9IElzY3JvbGw7XG5tb2R1bGUuZXhwb3J0cyA9IElzY3JvbGw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2lzY3JvbGwuanNcbiAqKi8iLCIvKipcbiAqIE1peGlucyBwcm92aWRlcyBtZXRob2RzIHVzZWQgZm9yIGV2ZW50IG1hbmlwdWxhdGluZy5cbiAqXG4gKi9cblxuLyoqXG4gKiBlbWl0XG4gKiBDdXN0b20gZXZlbnQgZW1pdHRlclxuICogQHBhcmFtIHtTdHJpbmd9ICB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gIHBvaW50XG4gKi9cbmZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICBpZiAoIXRoaXMuX2N1c3RvbUV2ZW50c1t0eXBlXSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBpID0gdGhpcy5fY3VzdG9tRXZlbnRzW3R5cGVdLmxlbmd0aDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgdGhpcy5fY3VzdG9tRXZlbnRzW3R5cGVdW2ldLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBhdHRhY2hcbiAqIEF0dGFjaCBhIGN1c3RvbSBldmVudFxuICogQHBhcmFtIHtTdHJpbmd9ICB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSAgZm5cbiAqL1xuZnVuY3Rpb24gYXR0YWNoKHR5cGUsIGNiKSB7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKGxldCBpIG9mIE9iamVjdC5rZXlzKHR5cGUpKSB7XG4gICAgICB0aGlzLmF0dGFjaChpLCB0eXBlW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciB0eXBlcyA9IHR5cGUuc3BsaXQoJyAnKTtcbiAgdHlwZXMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgIGlmICghdGhpcy5fY3VzdG9tRXZlbnRzW3R5cGVdKSB7XG4gICAgICB0aGlzLl9jdXN0b21FdmVudHNbdHlwZV0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5fY3VzdG9tRXZlbnRzW3R5cGVdLnB1c2goY2IpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBhdHRhY2hcbiAqIEF0dGFjaCBhIGN1c3RvbSBldmVudFxuICogQHBhcmFtIHtTdHJpbmd9ICB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSAgZm5cbiAqL1xuZnVuY3Rpb24gYXR0YWNoT25jZSh0eXBlLCBjYikge1xuXG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgIGNiKCk7XG4gICAgdGhpcy5kZXRhY2godHlwZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIHRoaXMuYXR0YWNoKHR5cGUsIGNhbGxiYWNrKTtcbn1cblxuLyoqXG4gKiBkZXRhY2hcbiAqIERldGFjaCBhIGN1c3RvbSBldmVudFxuICogQHBhcmFtIHtTdHJpbmd9ICB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSAgZm5cbiAqL1xuZnVuY3Rpb24gZGV0YWNoKHR5cGUsIGNiKSB7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHZhciBpIGluIHR5cGUpIHtcbiAgICAgIHRoaXMuZGV0YWNoKGksIHR5cGVbaV0pO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghdGhpcy5fY3VzdG9tRXZlbnRzW3R5cGVdKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFjYikge1xuICAgIHRoaXMuX2N1c3RvbUV2ZW50c1t0eXBlXSA9IFtdO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2N1c3RvbUV2ZW50c1t0eXBlXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGNiKTtcbiAgfVxufVxuXG4vKipcbiAqIG9uXG4gKiBBdHRhY2ggYW4gZXZlbnQgbGlzdGVuZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgIHR5cGUgLSBldmVudCB0eXBlIG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtjb250ZXh0PXRoaXMuY29udGFpbmVyXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gICAgW2NiPXRoaXNdXG4gKi9cbmZ1bmN0aW9uIG9uKHR5cGUsIGNvbnRleHQsIGNiKSB7XG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSB7XG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW107XG4gIH1cblxuICBjYiA9IGNiIHx8IHRoaXM7XG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IHRoaXMuY29udGFpbmVyO1xuXG4gIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKHsgY2I6IGNiLCBjb250ZXh0OiBjb250ZXh0IH0pO1xuXG4gIGNvbnRleHQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYiwgZmFsc2UpO1xufVxuXG4vKipcbiAqIG9mZlxuICogUmVsZWFzZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdHlwZSBpcyB1bmRlZmluZWQgcmVtb3ZlIGFsbCByZWdpc3RlcmVkIGV2ZW50c1xuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgW3R5cGVdIC0gZXZlbnQgdHlwZSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbY29udGV4dD10aGlzLmNvbnRhaW5lcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259ICAgIFtjYj10aGlzXSAtIGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIG9mZih0eXBlLCBjb250ZXh0LCBjYikge1xuICB2YXIgaTtcblxuICAvLyBpZiBjYWxsZWQgd2l0aG91dCBwYXJhbWV0ZXJzIHJlbW92ZSBhbGwgZXZlbnRzXG4gIGlmICghdHlwZSkge1xuICAgIGZvciAoaSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIHRoaXMub2ZmKGksIHRoaXMuX2V2ZW50c1tpXS5jb250ZXh0LCB0aGlzLl9ldmVudHNbaV0uY2IpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY2IgPSBjYiB8fCB0aGlzO1xuICBjb250ZXh0ID0gY29udGV4dCB8fCB0aGlzLmNvbnRhaW5lcjtcblxuICAvLyB3ZSB3b3JrIG9uIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGFycmF5XG4gIHZhciBldmVudEFyciA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgwKTtcblxuICBmb3IgKGkgPSBldmVudEFyci5sZW5ndGg7IGktLTspIHtcbiAgICBpZiAoZXZlbnRBcnJbaV0uY2IgPT09IGNiICYmIGV2ZW50QXJyW2ldLmNvbnRleHQgPT09IGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYiwgZmFsc2UpO1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAvKipcbiAgICogYXBwbHlcbiAgICogQXBwbHkgZXZlbnQgZW1pdHRlciB0byBvYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCAtIHRhcmdldCBvYmplY3RcbiAgICovXG4gIGFwcGx5KG9iaikge1xuICAgIG9iai5fZXZlbnRzID0ge307ICAgICAgIC8vIGhvbGRzIGFsbCB0aGUgRGVmYXVsdCByZWdpc3RlcmVkIGV2ZW50c1xuICAgIG9iai5fY3VzdG9tRXZlbnRzID0ge307IC8vIGhvbGRzIGFsbCBpU2Nyb2xsIHNwZWNpZmljIGV2ZW50c1xuICB9LFxuXG4gIC8qKlxuICAgKiBleHRlbmRcbiAgICogRXh0ZW5kIG9iamVjdCAoZm9yIHByb3RvdHlwZXMpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgLSB0YXJnZXQgb2JqZWN0XG4gICAqL1xuICBleHRlbmQob2JqKSB7XG4gICAgT2JqZWN0LmFzc2lnbihvYmosIHsgYXR0YWNoLCBhdHRhY2hPbmNlLCBkZXRhY2gsIGVtaXQsIG9uLCBvZmYgfSk7XG4gIH0sXG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL21peGlucy9FdmVudEVtaXR0ZXIuanNcbiAqKi8iLCIvKipcbiAqIE1peGlucyBwcm92aWRlcyBtZXRob2RzIHVzZWQgZm9yIGV2ZW50IGRpc3BhdGNoaW5nXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5pbXBvcnQgeyByZWFkIH0gZnJvbSAnLi4vbGlicy9mcHMuanMnO1xuXG4vKipcbiAqIExpc3QgYWxsIGtub3duIHBvaW50ZXIgZXZlbnRzXG4gKiBAY29uc3Qge09iamVjdH1cbiAqL1xuY29uc3QgRVZFTlRfVFlQRSA9IHtcbiAgcG9pbnRlcjoge1xuICAgICBzdGFydDogJ3BvaW50ZXJkb3duJyxcbiAgICAgIG1vdmU6ICdwb2ludGVybW92ZScsXG4gICAgICAgZW5kOiAncG9pbnRlcnVwJyxcbiAgICBjYW5jZWw6ICdwb2ludGVyY2FuY2VsJ1xuICB9LFxuICBNU1BvaW50ZXI6IHtcbiAgICAgc3RhcnQ6ICdNU1BvaW50ZXJEb3duJyxcbiAgICAgIG1vdmU6ICdNU1BvaW50ZXJNb3ZlJyxcbiAgICAgICBlbmQ6ICdNU1BvaW50ZXJVcCcsXG4gICAgY2FuY2VsOiAnTVNQb2ludGVyQ2FuY2VsJ1xuICB9LFxuICB0b3VjaDoge1xuICAgICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgICAgbW92ZTogJ3RvdWNobW92ZScsXG4gICAgICAgZW5kOiAndG91Y2hlbmQnLFxuICAgIGNhbmNlbDogJ3RvdWNoY2FuY2VsJ1xuICB9LFxuICBtb3VzZToge1xuICAgICBzdGFydDogJ21vdXNlZG93bicsXG4gICAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICAgICBlbmQ6ICdtb3VzZXVwJyxcbiAgICBjYW5jZWw6ICdtb3VzZWNhbmNlbCdcbiAgfVxufTtcblxuLyoqXG4gKiBMaXN0IGFsbCBjb25mb2d1cmFibGUgZXZlbnRzXG4gKiBAY29uc3Qge0FycmF5fVxuICovXG5jb25zdCBsaXN0T2ZJbnRlcm5hbEV2ZW50cyA9IFtcbiAgLy8gYmFzaWMgZXZlbnRzXG4gICdvblJlYWR5JyxcbiAgJ29uUmVmcmVzaCcsXG4gICdvbkRlc3Ryb3knLFxuXG4gIC8vIGRlY2xhcmVkIG9uIGlzY3JvbGw1XG4gICdiZWZvcmVTY3JvbGxTdGFydCcsXG4gICdzY3JvbGxDYW5jZWwnLFxuICAnc2Nyb2xsU3RhcnQnLFxuICAnc2Nyb2xsJyxcbiAgJ3Njcm9sbEVuZCcsXG4gICdmbGljaycsXG4gICd6b29tU3RhcnQnLFxuICAnem9vbUVuZCcsXG5dO1xuXG5cbmNvbnN0IEV2ZW50SGFuZGxpbmdNb2R1bGUgPSB7XG4gIC8qKlxuICAgKiBoYW5kbGVFdmVudFxuICAgKiBHbG9iYWwgZXZlbnQgcHJveHlcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgLSBldmVudCBvYmplY3RcbiAgICovXG4gIGhhbmRsZUV2ZW50KGUpIHtcbiAgICBzd2l0Y2ggKCBlLnR5cGUgKSB7XG4gICAgICBjYXNlIHRoaXMuZXZlbnRUeXBlLnN0YXJ0OlxuICAgICAgICB0aGlzLl9ldmVudFN0YXJ0KGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5ldmVudFR5cGUubW92ZTpcbiAgICAgICAgdGhpcy5fZXZlbnRNb3ZlKGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5ldmVudFR5cGUuZW5kOlxuICAgICAgY2FzZSB0aGlzLmV2ZW50VHlwZS5jYW5jZWw6XG4gICAgICAgIHRoaXMuX2V2ZW50RW5kKGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5ldmVudFR5cGUudHJhbnNpdGlvbkVuZDpcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50VHJhbnNpdGlvbkVuZChlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb3JpZW50YXRpb25jaGFuZ2UnOlxuICAgICAgY2FzZSAncmVzaXplJzpcbiAgICAgICAgdGhpcy5fZXZlbnRSZXNpemUoZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLmV2ZW50VHlwZS5tb3VzZXdoZWVsOlxuICAgICAgICB0aGlzLl9tb3VzZVdoZWVsKGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIF9ldmVudFN0YXJ0XG4gICAqIEluaXRpYWwgdXNlciBpbnRlcmFjdGlvbnMgcGhhc2VcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgLSBldmVudCBvYmplY3RcbiAgICovXG4gIF9ldmVudFN0YXJ0KGUpIHtcbiAgICBpZiAoIHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdCApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBsZXQgZXZlbnRzID0gZS50YXJnZXRUb3VjaGVzIHx8IFtlXTtcbiAgICBsZXQgaWQsIHgsIHksIGksIGw7XG5cbiAgICBmb3IgKGkgPSAwLCBsID0gZXZlbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblxuICAgICAgaWQgPSBldmVudHNbaV0uaWRlbnRpZmllciB8fCAwO1xuICAgICAgeCA9IGV2ZW50c1tpXS5wYWdlWDtcbiAgICAgIHkgPSBldmVudHNbaV0ucGFnZVk7XG5cbiAgICAgIHRoaXMuZ2xvYmFsU3RhdGUuUE9JTlRTW2lkXSA9IHtcbiAgICAgICAgaW5zdGFuY2U6IHRoaXMsXG4gICAgICAgIGlkOiBpZCsnJyxcbiAgICAgICAgcGhhc2U6ICdzdGFydCcsXG4gICAgICAgIGluaXRpYXRlZDogZmFsc2UsXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHN0YXJ0WDogeCxcbiAgICAgICAgc3RhcnRZOiB5LFxuICAgICAgICBkZWx0YVg6IDAsXG4gICAgICAgIGRlbHRhWTogMCxcbiAgICAgICAgc3RhcnRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICBjdXJyZW50VGltZTogRGF0ZS5ub3coKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgdGhlIHJBRiBsb29wXG4gICAgaWYgKCF0aGlzLmdsb2JhbFN0YXRlLkxPT1ApIHtcbiAgICAgIHRoaXMuX3JlbmRlckxvb3AoKTtcbiAgICB9XG5cbiAgICAvLyBzdGFydCBsaXN0ZW5pbmcgdG8gJ21vdmUnIGFuZCAnZW5kJyBldmVudHMgb25seSB3aGVuIHRoZSBkcmFnIHNlc3Npb24gaXMgaW5pdGlhdGVkXG4gICAgLy8gb24gZGVza3RvcCB0aGlzIHNob3VsZCBwcmV2ZW50IHVzZWxlc3MgbW91c2Vtb3ZlIGV2ZW50c1xuICAgIHRoaXMub24odGhpcy5ldmVudFR5cGUubW92ZSwgdGhpcy5vcHRpb25zLmRvY3VtZW50KTtcbiAgICB0aGlzLm9uKHRoaXMuZXZlbnRUeXBlLmVuZCwgdGhpcy5vcHRpb25zLmRvY3VtZW50KTtcbiAgfSxcblxuICAvKipcbiAgICogX2V2ZW50TW92ZVxuICAgKiBQcm9jZWVkIGVhY2ggcG9pbnRlciBtb3ZlIGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIC0gZXZlbnQgb2JqZWN0XG4gICAqL1xuICBfZXZlbnRNb3ZlKGUpIHtcbiAgICBsZXQgZXZlbnRzID0gZS5jaGFuZ2VkVG91Y2hlcyB8fCBbZV07XG4gICAgbGV0IHsgUE9JTlRTIH0gPSB0aGlzLmdsb2JhbFN0YXRlO1xuICAgIGxldCBpZCwgaTtcblxuICAgIGZvciAoaSA9IGV2ZW50cy5sZW5ndGg7IGktLTsgKSB7XG4gICAgICBpZCA9IGV2ZW50c1tpXS5pZGVudGlmaWVyIHx8IDA7XG5cbiAgICAgIGlmICggUE9JTlRTW2lkXSAmJiBQT0lOVFNbaWRdLmluaXRpYXRlZCApIHtcbiAgICAgICAgUE9JTlRTW2lkXSA9IHRoaXMuX3VwZGF0ZVBvaW50KFBPSU5UU1tpZF0sIGUpO1xuICAgICAgICBQT0lOVFNbaWRdLnBoYXNlID0gJ21vdmUnO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuXG4gIC8qKlxuICAgKiBfZXZlbnRNb3ZlXG4gICAqIFByb2NlZWQgbGFzdCBpbnRlcmFjdGlvbiBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gZSAtIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgX2V2ZW50RW5kKGUpIHtcbiAgICBsZXQgZXZlbnRzID0gZS5jaGFuZ2VkVG91Y2hlcyB8fCBbZV07XG4gICAgbGV0IHsgUE9JTlRTIH0gPSB0aGlzLmdsb2JhbFN0YXRlO1xuICAgIGxldCBpZCwgaTtcblxuICAgIGZvciAoIGkgPSBldmVudHMubGVuZ3RoOyBpLS07ICkge1xuICAgICAgaWQgPSBldmVudHNbaV0uaWRlbnRpZmllciB8fCAwO1xuXG4gICAgICBpZiAoIFBPSU5UU1tpZF0gJiYgUE9JTlRTW2lkXS5pbml0aWF0ZWQgKSB7XG4gICAgICAgIFBPSU5UU1tpZF0gPSB0aGlzLl91cGRhdGVQb2ludChQT0lOVFNbaWRdLCBlKTtcbiAgICAgICAgUE9JTlRTW2lkXS5waGFzZSA9ICdlbmQnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub2ZmKHRoaXMuZXZlbnRUeXBlLm1vdmUsIHRoaXMub3B0aW9ucy5kb2N1bWVudCk7XG4gICAgdGhpcy5vZmYodGhpcy5ldmVudFR5cGUuZW5kLCB0aGlzLm9wdGlvbnMuZG9jdW1lbnQpO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIF9ldmVudFJlc2l6ZVxuICAgKiBQcm9jZWVkIHZpZXdwb3J0IHJlc2l6ZSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gZSAtIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgX2V2ZW50UmVzaXplKGUpIHtcbiAgICAvLyBpZiB3ZSByZXNpemUgYmVmb3JlIHRoZSBzY3JpcHQgaGFzIGJlZW4gaW5pdGlhbGl6ZWRcbiAgICBpZiAoICF0aGlzLnN0YXRlLnJlYWR5ICkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0YWNoT25jZSgnb25SZWFkeScsIHRoaXMuX2V2ZW50UmVzaXplLmJpbmQodGhpcywgZSkpO1xuICAgIH1cblxuICAgIC8vIGRlYm91bmNlIHRoZSByZXNpemUgZXZlbnQgdG8gc3BhcmUgcmVzb3VyY2VzXG4gICAgdGhpcy5fcmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5yZWZyZXNoLmJpbmQodGhpcyksIDEwMCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIF91cGRhdGVQb2ludFxuICAgKiAuLi4uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludCAtIC4uLi4uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIC0gZXZlbnQgb2JqZWN0XG4gICAqL1xuICBfdXBkYXRlUG9pbnQocG9pbnQsIGUpIHtcbiAgICBwb2ludC5jdXJyZW50VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAvLyBkaXN0YW5jZSB0cmF2ZWxsZWQgc2luY2UgbGFzdCBldmVudFxuICAgIHBvaW50LmRlbHRhWCA9IHBvaW50LnggLSBlLnBhZ2VYO1xuICAgIHBvaW50LmRlbHRhWSA9IHBvaW50LnkgLSBlLnBhZ2VZO1xuXG4gICAgLy8gdXBkYXRlIGN1cnJlbnQgcG9zaXRpb25cbiAgICBwb2ludC54ID0gZS5wYWdlWDtcbiAgICBwb2ludC55ID0gZS5wYWdlWTtcblxuICAgIC8vIGRpc3RhbmNlIGZyb20gc3RhcnRcbiAgICBsZXQgeGQgPSBwb2ludC5zdGFydFggLSBwb2ludC54O1xuICAgIGxldCB5ZCA9IHBvaW50LnN0YXJ0WSAtIHBvaW50Lnk7XG4gICAgcG9pbnQuZGlzdGFuY2UgPSBNYXRoLnNxcnQoeGQgKiB4ZCArIHlkICogeWQpO1xuICAgIHBvaW50LmRpc3RhbmNlWCA9IHhkO1xuICAgIHBvaW50LmRpc3RhbmNlWSA9IHlkO1xuXG4gICAgLy8gYW5nbGUgZnJvbSBzdGFydCAoaGVuY2UgZGlyZWN0aW9uKSAwPXJpZ2h0LCBjb3VudGVyIGNsb2Nrd2lzZVxuICAgIGxldCB0aGV0YSA9IE1hdGguYXRhbjIoeWQsIC14ZCk7XG4gICAgaWYgKCB0aGV0YSA8IDAgKSB7XG4gICAgICB0aGV0YSArPSAyICogTWF0aC5QSTtcbiAgICB9XG4gICAgLy90aGV0YSAqPSAoMTgwIC8gTWF0aC5QSSk7ICAgLy8gY29udmVydCB0byBkZWdyZWVzXG4gICAgcG9pbnQudGhldGEgPSB0aGV0YTtcblxuICAgIHJldHVybiBwb2ludDtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBfcmVuZGVyTG9vcFxuICAgKiBPbmUgZnJhbWUgaW4gdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSBsb29wXG4gICAqL1xuICBfcmVuZGVyTG9vcCAoKSB7XG4gICAgbGV0IHBvaW50Q291bnQgPSAwO1xuICAgIGxldCB7IFBPSU5UUyB9ID0gdGhpcy5nbG9iYWxTdGF0ZTtcblxuICAgIGZvciAoIGxldCBpZCBpbiBQT0lOVFMgKSB7XG4gICAgICBsZXQgcG9pbnQgPSBQT0lOVFNbaWRdO1xuXG4gICAgICBzd2l0Y2ggKCBwb2ludC5waGFzZSApIHtcbiAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgIGlmICggIXBvaW50LmluaXRpYXRlZCApIHtcbiAgICAgICAgICAgIHBvaW50LmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgICAgIHRoaXMuZW1pdCgnc3RhcnQnLCBwb2ludCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtb3ZlJzpcbiAgICAgICAgIHRoaXMuZW1pdCgnbW92ZScsIHBvaW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICBwb2ludC5pbml0aWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgIHRoaXMuZW1pdCgnZW5kJywgcG9pbnQpO1xuICAgICAgICAgIGRlbGV0ZSBQT0lOVFNbaWRdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBwb2ludENvdW50Kys7XG4gICAgfVxuXG4gICAgLy8ga2VlcCBhbmltYXRpbmcgdW50aWwgdGhlcmUgYXJlIHBvaW50cyBpbiB0aGUgUE9JTlRTIG9iamVjdFxuICAgIHRoaXMuZ2xvYmFsU3RhdGUuTE9PUCA9ICEhcG9pbnRDb3VudDtcblxuICAgIGlmICh0aGlzLmdsb2JhbFN0YXRlLkxPT1ApIHtcbiAgICAgIHJlYWQodGhpcy5fcmVuZGVyTG9vcC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH0sXG5cblxuICBfbW91c2VXaGVlbChldmVudCkge1xuXG4gICAgdmFyIGRlbHRhWCA9IC1ldmVudC53aGVlbERlbHRhWCB8fCBldmVudC5kZWx0YVggfHwgMDtcbiAgICB2YXIgZGVsdGFZID0gLWV2ZW50LndoZWVsRGVsdGFZIHx8IGV2ZW50LmRlbHRhWSB8fCAwO1xuXG4gICAgdGhpcy5lbWl0KCd3aGVlbCcsIHtcbiAgICAgIGRlbHRhWSxcbiAgICAgIGRlbHRhWCxcbiAgICAgIG9yaWdpbmFsRXZlbnQgOiBldmVudCxcbiAgICAgIGN1cnJlbnRUaW1lIDogRGF0ZS5ub3coKVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIGFzc2lnbkV2ZW50c0Zyb21PcHRpb25zXG4gKiBFeHRlbmQgb2JqZWN0IHdpdGggY29uZmlndXJlZCBldmVudCBkYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gSXNjcm9sbEluc3RhbmNlIC0gaW5zdGFuY2Ugb3B0aW9uc1xuICovXG5jb25zdCBhc3NpZ25FdmVudHNGcm9tT3B0aW9ucyA9IChJc2Nyb2xsSW5zdGFuY2UpID0+IHtcbiAgbGV0IHsgb3B0aW9ucyB9ID0gSXNjcm9sbEluc3RhbmNlO1xuICBsaXN0T2ZJbnRlcm5hbEV2ZW50cy5mb3JFYWNoKCBldmVudE5hbWUgPT4ge1xuICAgIGlmICghb3B0aW9uc1tldmVudE5hbWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgSXNjcm9sbEluc3RhbmNlLmF0dGFjaChldmVudE5hbWUsIG9wdGlvbnNbZXZlbnROYW1lXSk7XG4gIH0pO1xufTtcblxuXG4vKipcbiAqIGRldGVjdFRyYW5zaXRpb25FbmRcbiAqIEZpbmQgdGhlIHRyYW5zaXRpb25FbmQgZXZlbnQgYmFzZWQgb24gdGhlIHZlbmRvciwgdGhlcmUncyBubyBwYXR0ZXJuIHNvXG4gKiB3ZSBoYXZlIHRvIHVzZSBhIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gSXNjcm9sbEluc3RhbmNlXG4gKi9cbmNvbnN0IGRldGVjdFRyYW5zaXRpb25FbmQgPSAoe2RldGVjdHMsIGV2ZW50VHlwZX0pID0+IHtcbiAgbGV0IHR5cGVzID0ge1xuICAgICAgICAgICcnOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgJ3dlYmtpdCc6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICAnTW96JzogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICAgJ08nOiAnb1RyYW5zaXRpb25FbmQnLFxuICAgICAgICAnbXMnOiAnTVNUcmFuc2l0aW9uRW5kJ1xuICB9O1xuXG4gIGV2ZW50VHlwZS50cmFuc2l0aW9uRW5kID0gIHR5cGVzW2RldGVjdHMudmVuZG9yXSB8fCBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBkZXRlY3RXaGVlbEV2ZW50XG4gKiBGaW5kIHRoZSBtb3VzZXdoZWVsIGV2ZW50XG4gKiBAcGFyYW0ge09iamVjdH0gSXNjcm9sbEluc3RhbmNlXG4gKi9cbmNvbnN0IGRldGVjdFdoZWVsRXZlbnQgPSAoeyBldmVudFR5cGUgfSkgPT4ge1xuICAgIGxldCBldmVudE5hbWUgPSAnJztcblxuICAgIGlmICgnb253aGVlbCcgaW4gZG9jdW1lbnQpIHtcbiAgICAgIC8vIElFOSssIEZGMTcrLCBDaDMxK1xuICAgICAgZXZlbnROYW1lID0gJ3doZWVsJztcbiAgICB9IGVsc2UgaWYgKCdvbm1vdXNld2hlZWwnIGluIGRvY3VtZW50KSB7XG4gICAgICAvLyBPbGQgZmFzaGlvbmVkXG4gICAgICBldmVudE5hbWUgPSAnbW91c2V3aGVlbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZpcmVmb3ggPCAxN1xuICAgICAgZXZlbnROYW1lID0gJ01vek1vdXNlUGl4ZWxTY3JvbGwnO1xuICAgIH1cblxuICBldmVudFR5cGUubW91c2V3aGVlbCA9ICBldmVudE5hbWU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgLyoqXG4gICAqIGFwcGx5XG4gICAqIEV4dGVuZCBvYmplY3Qgd2l0aCBjb25maWd1cmVkIGV2ZW50IGRhdGFcbiAgICogQHBhcmFtIHtvYmplY3R9IHR5cGUgLSB0YXJnZXQgb2JqZWN0XG4gICAqL1xuICBhcHBseShJc2Nyb2xsSW5zdGFuY2UpIHtcbiAgICBsZXQgeyBvcHRpb25zLCBkZXRlY3RzIH0gPSBJc2Nyb2xsSW5zdGFuY2U7XG5cbiAgICAvLyBjaG9vc2UgdGhlIGFwcHJvcHJpYXRlIGV2ZW50IHR5cGUgdG8gdXNlLCBpdCBjYW4gYWxzbyBiZSBmb3JjZWQgdmlhIG9wdGlvbnNcbiAgICBpZiAoIG9wdGlvbnMuZXZlbnRUeXBlICkge1xuICAgICAgSXNjcm9sbEluc3RhbmNlLmV2ZW50VHlwZSA9IEVWRU5UX1RZUEVbIG9wdGlvbnMuZXZlbnRUeXBlIF07XG4gICAgfSBlbHNlIGlmICggZGV0ZWN0cy5oYXNQb2ludGVyRXZlbnRzICkge1xuICAgICAgSXNjcm9sbEluc3RhbmNlLmV2ZW50VHlwZSA9IEVWRU5UX1RZUEUucG9pbnRlcjtcbiAgICB9IGVsc2UgaWYgKCBkZXRlY3RzLmhhc01TcG9pbnRlckV2ZW50cyApIHtcbiAgICAgIElzY3JvbGxJbnN0YW5jZS5ldmVudFR5cGUgPSBFVkVOVF9UWVBFLk1TUG9pbnRlcjtcbiAgICB9IGVsc2UgaWYgKCBkZXRlY3RzLnVzZVRvdWNoRXZlbnRzICkge1xuICAgICAgSXNjcm9sbEluc3RhbmNlLmV2ZW50VHlwZSA9IEVWRU5UX1RZUEUudG91Y2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIElzY3JvbGxJbnN0YW5jZS5ldmVudFR5cGUgPSBFVkVOVF9UWVBFLm1vdXNlO1xuICAgIH1cbiAgICBkZXRlY3RUcmFuc2l0aW9uRW5kKElzY3JvbGxJbnN0YW5jZSk7XG4gICAgZGV0ZWN0V2hlZWxFdmVudChJc2Nyb2xsSW5zdGFuY2UpO1xuXG5cbiAgICAvLyBiaW5kIGJhc2ljIGV2ZW50c1xuICAgIElzY3JvbGxJbnN0YW5jZS5vbignb3JpZW50YXRpb25jaGFuZ2UnLCB3aW5kb3cpO1xuICAgIElzY3JvbGxJbnN0YW5jZS5vbigncmVzaXplJywgd2luZG93KTtcbiAgICBJc2Nyb2xsSW5zdGFuY2Uub24oSXNjcm9sbEluc3RhbmNlLmV2ZW50VHlwZS5zdGFydCk7XG4gICAgSXNjcm9sbEluc3RhbmNlLm9uKElzY3JvbGxJbnN0YW5jZS5ldmVudFR5cGUudHJhbnNpdGlvbkVuZCk7XG4gICAgSXNjcm9sbEluc3RhbmNlLm9uKElzY3JvbGxJbnN0YW5jZS5ldmVudFR5cGUubW91c2V3aGVlbCk7XG5cbiAgICAvLyBzZXR1cCBldmVudHMgZnJvbSB1c2VyIGNvbmZpZ1xuICAgIGFzc2lnbkV2ZW50c0Zyb21PcHRpb25zKElzY3JvbGxJbnN0YW5jZSk7XG5cbiAgfSxcblxuICAvKipcbiAgICogZXh0ZW5kXG4gICAqIEV4dGVuZCBvYmplY3QgKGZvciBwcm90b3R5cGVzKVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IC0gdGFyZ2V0IG9iamVjdFxuICAgKi9cbiAgZXh0ZW5kKElzY3JvbGxQcm90b3R5cGUpIHtcbiAgICBPYmplY3QuYXNzaWduKElzY3JvbGxQcm90b3R5cGUsIEV2ZW50SGFuZGxpbmdNb2R1bGUpO1xuICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbWl4aW5zL0V2ZW50UHJvY2Vzc29yLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXTtcblxubGV0IHJlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xubGV0IGNhbmNlbCA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZTtcblxubGV0IGxhc3RUaW1lID0gMDtcbmxldCByZWFkZXJzID0gW107XG5sZXQgd3JpdGVycyA9IFtdO1xuZm9yIChsZXQgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhcmVxdWVzdDsgKyt4KSB7XG4gIHJlcXVlc3QgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgY2FuY2VsICA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG59XG5cbmlmICghcmVxdWVzdCkge1xuICByZXF1ZXN0ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBsZXQgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBsZXQgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICBsZXQgaWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpOyB9LCB0aW1lVG9DYWxsKTtcblxuICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgIHJldHVybiBpZDtcbiAgfTtcbn1cblxuaWYgKCFjYW5jZWwpIHtcbiAgY2FuY2VsID0gZnVuY3Rpb24oaWQpIHtcbiAgICBjbGVhclRpbWVvdXQoaWQpO1xuICB9O1xufVxuXG5jb25zdCByZWFkID0gKGZuKSA9PiB7XG4gIHJlYWRlcnMucHVzaChmbik7XG59O1xuXG5jb25zdCB3cml0ZSA9IChmbikgPT4ge1xuICB3cml0ZXJzLnB1c2goZm4pO1xufTtcblxuY29uc3QgdGhyb3R0bGUgPSAoZm4pID0+IHtcbiAgbGV0IHJhZjtcblxuICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdEFuaW1hdGlvbkZyYW1lVGhyb3R0bGVyKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgaWYgKHJhZikge1xuICAgICAgY2FuY2VsKHJhZik7XG4gICAgfVxuXG4gICAgcmFmID0gcmVhZChmdW5jdGlvbiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVIYW5kbGVyKCkge1xuICAgICAgcmFmID0gZmFsc2U7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9KTtcbiAgfTtcbn07XG5cbmNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gIGxldCByZWFkID0gcmVhZGVycztcbiAgcmVhZGVycyA9IFtdO1xuICByZWFkLmZvckVhY2godCA9PiB0KCkpO1xuXG4gIGxldCB3cml0ZSA9IHdyaXRlcnM7XG4gIHdyaXRlcnMgPSBbXTtcbiAgd3JpdGUuZm9yRWFjaCh0ID0+IHQoKSk7XG5cbiAgcmVxdWVzdChsb29wLCAnbG9vcCBzZXQnKTtcbn07XG5cbnJlcXVlc3QobG9vcCwgJ2xvb3Agc2V0Jyk7XG5cbmV4cG9ydCB7IHJlcXVlc3QsIGNhbmNlbCwgcmVhZCwgd3JpdGUsIHRocm90dGxlIH07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYnMvZnBzLmpzXG4gKiovIiwiLyoqXG4gKiBDb21wb25lbnQsIHJlbmRlciBsYXllclxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGluZXJ0aWEsIG91dFF1YXJ0aWMgfSBmcm9tICcuLi9saWJzL2Vhc2luZ3MuanMnO1xuaW1wb3J0IHsgd3JpdGUsIHJlcXVlc3QsIGNhbmNlbCB9IGZyb20gJy4uL2xpYnMvZnBzLmpzJztcblxuLy8gc3RvcmUgZXZlbnRzIHRvIGNhbGN1bGF0ZSB2ZWxvY2l0eSBoZXJlXG5jb25zdCBwb2ludGVyc1RpbWVDYXBzdWxlID0gW107XG5jb25zdCBwb2ludGVyc1RpbWVDYXBzdWxlTGltaXQgPSAxNTtcbmNvbnN0IHdoZWVsVGltZUNhcHN1bGUgPSBbXTtcbmNvbnN0IHdoZWVsVGltZUNhcHN1bGVMaW1pdCA9IDE1O1xuXG5jbGFzcyBSZW5kZXJMYXllciB7XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lLCBlbGVtZW50LCBJc2Nyb2xsSW5zdGFuY2UpIHtcbiAgICB0aGlzLnBhcmVudCA9IElzY3JvbGxJbnN0YW5jZTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGVsZW1lbnQ7XG4gICAgdGhpcy5wYXJlbnRbbmFtZV0gPSB0aGlzO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICBjb25zdCB7IHBhcmVudCB9ID0gdGhpcztcblxuICAgIGlmICghcGFyZW50LnN0YXRlW25hbWVdKSB7XG4gICAgICBwYXJlbnQuc3RhdGVbbmFtZV0gPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0gcGFyZW50LnN0YXRlW25hbWVdO1xuXG4gICAgaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAvLyBzaGFkb3dMYXllclxuICAgICAgY29uc3Qgc2hhZG93TGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHNoYWRvd0xheWVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIHNoYWRvd0xheWVyLnN0eWxlLnRvcCA9IDA7XG4gICAgICBzaGFkb3dMYXllci5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgIHNoYWRvd0xheWVyLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmVkJztcbiAgICAgIHNoYWRvd0xheWVyLnN0eWxlLmJvcmRlclNpemluZyA9ICdib3JkZXItYm94JztcbiAgICAgIHNoYWRvd0xheWVyLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgyNTUsMCwwLDAuMSknO1xuICAgICAgc2hhZG93TGF5ZXIuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICB0aGlzLnNoYWRvd0xheWVyID0gc2hhZG93TGF5ZXI7XG4gICAgICBwYXJlbnQuY29udGFpbmVyLmFwcGVuZENoaWxkKHNoYWRvd0xheWVyKTtcblxuICAgICAgLy8gbW9tZW50dW1MYXllclhcbiAgICAgIGNvbnN0IG1vbWVudHVtTGF5ZXJYID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBtb21lbnR1bUxheWVyWC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBtb21lbnR1bUxheWVyWC5zdHlsZS5oZWlnaHQgPSAnNXB4JztcbiAgICAgIG1vbWVudHVtTGF5ZXJYLnN0eWxlLndpZHRoID0gJzUwJSc7XG4gICAgICBtb21lbnR1bUxheWVyWC5zdHlsZS5sZWZ0ID0gJzUwJSc7XG4gICAgICBtb21lbnR1bUxheWVyWC5zdHlsZS5ib3R0b20gPSAyO1xuICAgICAgbW9tZW50dW1MYXllclguc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJzAlIDUwJSc7XG4gICAgICBtb21lbnR1bUxheWVyWC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMjU1LDAsMCwwLjUpJztcbiAgICAgIG1vbWVudHVtTGF5ZXJYLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZVgoMClgO1xuICAgICAgdGhpcy5tb21lbnR1bUxheWVyWCA9IG1vbWVudHVtTGF5ZXJYO1xuICAgICAgcGFyZW50LmNvbnRhaW5lci5hcHBlbmRDaGlsZChtb21lbnR1bUxheWVyWCk7XG5cbiAgICAgIC8vIG1vbWVudHVtTGF5ZXJYXG4gICAgICBjb25zdCBtb21lbnR1bUxheWVyWSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbW9tZW50dW1MYXllclkuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgbW9tZW50dW1MYXllclkuc3R5bGUud2lkdGggPSAnNXB4JztcbiAgICAgIG1vbWVudHVtTGF5ZXJZLnN0eWxlLmhlaWdodCA9ICc1MCUnO1xuICAgICAgbW9tZW50dW1MYXllclkuc3R5bGUudG9wID0gJzUwJSc7XG4gICAgICBtb21lbnR1bUxheWVyWS5zdHlsZS5sZWZ0ID0gMjtcbiAgICAgIG1vbWVudHVtTGF5ZXJZLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICc1MCUgMCUnO1xuICAgICAgbW9tZW50dW1MYXllclkuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlWCgwKWA7XG4gICAgICBtb21lbnR1bUxheWVyWS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMjU1LDAsMCwwLjUpJztcbiAgICAgIHRoaXMubW9tZW50dW1MYXllclkgPSBtb21lbnR1bUxheWVyWTtcbiAgICAgIHBhcmVudC5jb250YWluZXIuYXBwZW5kQ2hpbGQobW9tZW50dW1MYXllclkpO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogaW5pdFxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICBjb25zdCB7IHN0YXRlLCBjb250YWluZXIgfSA9IHRoaXM7XG4gICAgaWYgKCFzdGF0ZS54KSB7XG4gICAgICBzdGF0ZS54ID0gc3RhdGUuY3VycmVudFggPSBjb250YWluZXIub2Zmc2V0TGVmdDtcbiAgICB9XG5cbiAgICBpZiAoIXN0YXRlLnkpIHtcbiAgICAgIHN0YXRlLnkgPSBzdGF0ZS5jdXJyZW50WSA9IGNvbnRhaW5lci5vZmZzZXRUb3A7XG4gICAgfVxuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogcHJvY2Vzc1doZWVsXG4gICAqIFByb2Nlc3MgbW91c2V3aGVlbCBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSB3aGVlbCBldmVudFxuICAgKi9cbiAgcHJvY2Vzc1doZWVsKHsgZGVsdGFZLCBkZWx0YVgsIGN1cnJlbnRUaW1lLCBvcmlnaW5hbEV2ZW50IH0pIHtcbiAgICB2YXIgeyBzdGF0ZSwgcGFyZW50IH0gPSB0aGlzO1xuICAgIHN0YXRlLmlzQW5pbWF0ZWQgPSBmYWxzZTtcblxuICAgIGlmIChwYXJlbnQub3B0aW9ucy5wcmV2ZW50UGFnZVNjcm9sbFdoaWxlU2Nyb2xsaW5nKSB7XG4gICAgICBvcmlnaW5hbEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHdoZWVsVGltZWNhcHN1bGVcbiAgICB3aGVlbFRpbWVDYXBzdWxlLnB1c2goe1xuICAgICAgeDogZGVsdGFYLFxuICAgICAgeTogZGVsdGFZLFxuICAgICAgdGltZTogY3VycmVudFRpbWUsXG4gICAgfSk7XG4gICAgaWYgKHdoZWVsVGltZUNhcHN1bGUubGVuZ3RoID4gd2hlZWxUaW1lQ2Fwc3VsZUxpbWl0KSB7XG4gICAgICB3aGVlbFRpbWVDYXBzdWxlLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgLy8gZmlsdHJhdGUgTWFjIG1hZ2ljcGFkXG4gICAgaWYgKGRlbHRhWSAlIDEyMCAmJiBkZWx0YVkgJSAxMDApIHtcbiAgICAgIC8vY29uc29sZS5sb2coJ2lzTWFjaWdQYWQnKTtcbiAgICAgIHN0YXRlLmN1cnJlbnRZICs9IC1kZWx0YVk7XG4gICAgICB0aGlzLnJlbmRlclBvc2l0aW9uKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKE1hdGguYWJzKGRlbHRhWSkgPiAxMCkge1xuICAgICAgLy9jb25zb2xlLmxvZygnaXNNb3VzZVdoZWVsLCBuZWVkcyB0byBiZSBhbmltYXRlZCcpO1xuICAgICAgdGhpcy5yZWxlYXNlV2hlZWwoZGVsdGFZLCBkZWx0YVgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbGVhc2VXaGVlbChkZWx0YVksIGRlbHRhWCkge1xuICAgIGNvbnN0IHsgc3RhdGUgfSA9IHRoaXM7XG5cbiAgICBpZiAod2hlZWxUaW1lQ2Fwc3VsZS5sZW5ndGggPCAyKSB7XG4gICAgICB3aGVlbFRpbWVDYXBzdWxlLmxlbmd0aCA9IDA7XG4gICAgICB3aGVlbFRpbWVDYXBzdWxlLnB1c2goe1xuICAgICAgICB4OiBkZWx0YVgsXG4gICAgICAgIHk6IGRlbHRhWSxcbiAgICAgICAgdGltZTogRGF0ZS5ub3coKSAtIDE2LFxuICAgICAgfSk7XG4gICAgICB3aGVlbFRpbWVDYXBzdWxlLnB1c2goe1xuICAgICAgICB4OiBkZWx0YVgsXG4gICAgICAgIHk6IGRlbHRhWSxcbiAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSB3aGVlbCB2ZWxvY2l0eVxuICAgIGxldCBmaXJzdFBvaW50ID0gd2hlZWxUaW1lQ2Fwc3VsZVswXTtcbiAgICBsZXQgbGFzdFBvaW50ID0gd2hlZWxUaW1lQ2Fwc3VsZVt3aGVlbFRpbWVDYXBzdWxlLmxlbmd0aCAtIDFdO1xuICAgIGxldCB4T2Zmc2V0ID0gMDtcbiAgICBsZXQgeU9mZnNldCA9IDA7XG4gICAgd2hlZWxUaW1lQ2Fwc3VsZS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHhPZmZzZXQgKz0gaXRlbS54O1xuICAgICAgeU9mZnNldCArPSBpdGVtLnk7XG4gICAgfSk7XG5cbiAgICB4T2Zmc2V0Kj0gMC41O1xuICAgIHlPZmZzZXQqPSAwLjU7XG5cbiAgICBsZXQgdGltZU9mZnNldCA9IGxhc3RQb2ludC50aW1lIC0gZmlyc3RQb2ludC50aW1lO1xuICAgIGxldCB0aW1lUGVyUG9pbnQgPSB0aW1lT2Zmc2V0IC8gd2hlZWxUaW1lQ2Fwc3VsZS5sZW5ndGg7XG5cbiAgICBzdGF0ZS52ZWxvY2l0eVggPSAtMSAqICh4T2Zmc2V0IC8gdGltZVBlclBvaW50KSB8fCAwO1xuICAgIHN0YXRlLnZlbG9jaXR5WSA9IC0xICogKHlPZmZzZXQgLyB0aW1lUGVyUG9pbnQpIHx8IDA7XG5cbiAgICB3aGVlbFRpbWVDYXBzdWxlLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5yZWxlYXNlVmVsb2NpdHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwcm9jZXNzSW50ZXJhY3Rpb25cbiAgICogR2V0IHBvaW50ZXIgZGF0YSBmcm9tIEV2ZW50UHJvY2Vzc29yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIHBvaW50ZXIgZXZlbnRcbiAgICovXG4gIHByb2Nlc3NJbnRlcmFjdGlvbihlKSB7XG4gICAgY29uc3QgeyBzdGF0ZSB9ID0gdGhpcztcbiAgICBzdGF0ZS5pc0FuaW1hdGVkID0gZmFsc2U7XG5cbiAgICBpZiAoZS5waGFzZSA9PT0gJ3N0YXJ0Jykge1xuICAgICAgc3RhdGUuc3RhcnRYID0gc3RhdGUubGFzdFggPSBzdGF0ZS5jdXJyZW50WCB8fCAwO1xuICAgICAgc3RhdGUuc3RhcnRZID0gc3RhdGUubGFzdFkgPSBzdGF0ZS5jdXJyZW50WSB8fCAwO1xuICAgICAgcG9pbnRlcnNUaW1lQ2Fwc3VsZS5sZW5ndGggPSAwOyAvLyBlbXB0eSBhcnJheSAobXV0YXRlKVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBwb2ludGVyc1RpbWVjYXBzdWxlXG4gICAgcG9pbnRlcnNUaW1lQ2Fwc3VsZS5wdXNoKHtcbiAgICAgIHg6IGUueCxcbiAgICAgIHk6IGUueSxcbiAgICAgIHRpbWU6IGUuY3VycmVudFRpbWUsXG4gICAgfSk7XG4gICAgaWYgKHBvaW50ZXJzVGltZUNhcHN1bGUubGVuZ3RoID4gcG9pbnRlcnNUaW1lQ2Fwc3VsZUxpbWl0KSB7XG4gICAgICBwb2ludGVyc1RpbWVDYXBzdWxlLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgaWYgKGUuZGlzdGFuY2VYICYmIGUuZGlzdGFuY2VZKSB7XG4gICAgICBzdGF0ZS5sYXN0WCA9IHN0YXRlLmN1cnJlbnRYO1xuICAgICAgc3RhdGUubGFzdFkgPSBzdGF0ZS5jdXJyZW50WTtcbiAgICAgIHN0YXRlLmN1cnJlbnRYID0gc3RhdGUuc3RhcnRYIC0gZS5kaXN0YW5jZVg7XG4gICAgICBzdGF0ZS5jdXJyZW50WSA9IHN0YXRlLnN0YXJ0WSAtIGUuZGlzdGFuY2VZO1xuXG4gICAgICB0aGlzLnJlbmRlclBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKGUucGhhc2UgPT09ICdlbmQnKSB7XG4gICAgICBkZWxldGUgc3RhdGUuc3RhcnRYO1xuICAgICAgZGVsZXRlIHN0YXRlLnN0YXJ0WTtcblxuICAgICAgdGhpcy5jYWxjdWxhdGVWZWxvY2l0eSgpO1xuICAgICAgdGhpcy5yZWxlYXNlVmVsb2NpdHkoKTtcbiAgICB9XG5cbiAgICBpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIC8vIHRvIGRpc3BsYXkgdmVsb2NpdHkgb24gdGhlIGNvcm5lcnMgd2hpbGUgZGV2ZWxvcG1lbnRcbiAgICAgIHRoaXMuY2FsY3VsYXRlVmVsb2NpdHkoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZ2V0T3ZlcnNjcm9sbFhcbiAgICogZGV0ZWN0IG92ZXJzY3JvbGwgYnkgeFxuICAgKiBAcGFyYW0ge051bWJlcn0geFxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IG92ZXJzY3JvbGwgYnkgeFxuICAgKi9cbiAgZ2V0T3ZlcnNjcm9sbFgoeCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBwYXJlbnRTdGF0ZSA9IHRoaXMucGFyZW50LnN0YXRlO1xuXG4gICAgbGV0IHJlc3VsdCAgPSAwO1xuXG4gICAgaWYgKCF4KSB7XG4gICAgICB4ID0gc3RhdGUuY3VycmVudFg7XG4gICAgfVxuXG4gICAgaWYgKHggPiAwKSB7XG4gICAgICByZXN1bHQgPSB4O1xuICAgIH0gZWxzZSBpZiAoc3RhdGUud2lkdGggKyB4IDwgcGFyZW50U3RhdGUud2lkdGgpIHtcbiAgICAgIHJlc3VsdCA9IChzdGF0ZS53aWR0aCArIHgpIC0gcGFyZW50U3RhdGUud2lkdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXRPdmVyc2Nyb2xsWVxuICAgKiBkZXRlY3Qgb3ZlcnNjcm9sbCBieSB5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gICAqIEByZXR1cm4ge051bWJlcn0gb3ZlcnNjcm9sbCBieSB5XG4gICAqL1xuICBnZXRPdmVyc2Nyb2xsWSh5KSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHBhcmVudFN0YXRlID0gdGhpcy5wYXJlbnQuc3RhdGU7XG5cbiAgICBsZXQgcmVzdWx0ICA9IDA7XG5cbiAgICBpZiAoIXkpIHtcbiAgICAgIHkgPSBzdGF0ZS5jdXJyZW50WTtcbiAgICB9XG5cbiAgICBpZiAoeSA+IDApIHtcbiAgICAgIHJlc3VsdCA9IHk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5oZWlnaHQgKyB5IDwgcGFyZW50U3RhdGUuaGVpZ2h0KSB7XG4gICAgICByZXN1bHQgPSAoc3RhdGUuaGVpZ2h0ICsgeSkgLSBwYXJlbnRTdGF0ZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXJQb3NpdGlvblxuICAgKiBSZW5kZXIgbGF5ZXIgcG9zaXRpb25cbiAgICovXG4gIHJlbmRlclBvc2l0aW9uKCkge1xuICAgIGNvbnN0IHsgc3RhdGUsIGNvbnRhaW5lciB9ID0gdGhpcztcbiAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXMucGFyZW50O1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IHRoaXMucGFyZW50LnN0eWxlcy50cmFuc2Zvcm07XG5cbiAgICAvLyBjYWxjdWxhdGUgYm91bmRhcmllcyBhbmQgb3ZlcnNjcm9sbFhcbiAgICBzdGF0ZS5vdmVyc2Nyb2xsWCA9IHRoaXMuZ2V0T3ZlcnNjcm9sbFgoKTtcbiAgICBzdGF0ZS5vdmVyc2Nyb2xsWSA9IHRoaXMuZ2V0T3ZlcnNjcm9sbFkoKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBwb3NpdGlvblxuICAgIGlmIChvcHRpb25zLnNjcm9sbFgpIHtcbiAgICAgIHN0YXRlLnggPSBzdGF0ZS5jdXJyZW50WCAtIChzdGF0ZS5vdmVyc2Nyb2xsWCB8fCAwKTtcbiAgICAgIGlmIChzdGF0ZS5vdmVyc2Nyb2xsWCAmJiBvcHRpb25zLmFsbG93T3ZlcnNjcm9sbCkge1xuICAgICAgICBzdGF0ZS54ICs9IHRoaXMub3ZlcnNjcm9sbFJlZHVjZXIoc3RhdGUub3ZlcnNjcm9sbFgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSBwb3NpdGlvblxuICAgIGlmIChvcHRpb25zLnNjcm9sbFkpIHtcbiAgICAgIHN0YXRlLnkgPSBzdGF0ZS5jdXJyZW50WSAtIChzdGF0ZS5vdmVyc2Nyb2xsWSB8fCAwKTtcbiAgICAgIGlmIChzdGF0ZS5vdmVyc2Nyb2xsWSAmJiBvcHRpb25zLmFsbG93T3ZlcnNjcm9sbCkge1xuICAgICAgICBzdGF0ZS55ICs9IHRoaXMub3ZlcnNjcm9sbFJlZHVjZXIoc3RhdGUub3ZlcnNjcm9sbFkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vICNERVYgLSBkaXNwbGF5IGFjdHVhbCBsYXllciAobm90IHJlZHVjZWQgYnkgYm91bmRzIG9yIHRocmVzaG9sZHMpXG4gICAgaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICBpZiAoc3RhdGUub3ZlcnNjcm9sbFggfHwgc3RhdGUub3ZlcnNjcm9sbFkpIHtcbiAgICAgICAgdGhpcy5zaGFkb3dMYXllci5zdHlsZVt0cmFuc2Zvcm1dID0gYHRyYW5zbGF0ZTNkKCR7c3RhdGUuY3VycmVudFh9cHgsICR7c3RhdGUuY3VycmVudFl9cHgsIDBweClgO1xuXG4gICAgICAgIC8vIHRoaXMuc2hhZG93TGF5ZXIuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhZG93TGF5ZXIuc3R5bGUub3BhY2l0eSkge1xuICAgICAgICB0aGlzLnNoYWRvd0xheWVyLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0cmFuc2Zvcm0pIHtcbiAgICAgIGNvbnRhaW5lci5zdHlsZVt0cmFuc2Zvcm1dID0gYHRyYW5zbGF0ZTNkKCR7c3RhdGUueH1weCwgJHtzdGF0ZS55fXB4LCAwcHgpYDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyByZXNwZWN0IG9sZC1mYXNoaW9uZWQgYnJvd3NlcnNcbiAgICBjb250YWluZXIuc3R5bGUubGVmdCA9IHRoaXMuc3RhdGUueDtcbiAgICBjb250YWluZXIuc3R5bGUudG9wID0gdGhpcy5zdGF0ZS55O1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGN1bGF0ZVZlbG9jaXR5XG4gICAqIENhbGN1bGF0ZSBpbnRlcmFjdGlvbiB2ZWxvY2l0eVxuICAgKi9cbiAgY2FsY3VsYXRlVmVsb2NpdHkoKSB7XG4gICAgY29uc3QgeyBzdGF0ZSB9ID0gdGhpcztcblxuICAgIGxldCBmaXJzdFBvaW50ID0gcG9pbnRlcnNUaW1lQ2Fwc3VsZVswXTtcbiAgICBsZXQgbGFzdFBvaW50ID0gcG9pbnRlcnNUaW1lQ2Fwc3VsZVtwb2ludGVyc1RpbWVDYXBzdWxlLmxlbmd0aCAtIDFdO1xuXG4gICAgbGV0IHhPZmZzZXQgPSBsYXN0UG9pbnQueCAtIGZpcnN0UG9pbnQueDtcbiAgICBsZXQgeU9mZnNldCA9IGxhc3RQb2ludC55IC0gZmlyc3RQb2ludC55O1xuICAgIGxldCB0aW1lT2Zmc2V0ID0gbGFzdFBvaW50LnRpbWUgLSBmaXJzdFBvaW50LnRpbWU7XG5cbiAgICBsZXQgdGltZVBlclBvaW50ID0gdGltZU9mZnNldCAvIHBvaW50ZXJzVGltZUNhcHN1bGUubGVuZ3RoO1xuXG4gICAgc3RhdGUudmVsb2NpdHlYID0gKHhPZmZzZXQgLyB0aW1lUGVyUG9pbnQpIHx8IDA7XG4gICAgc3RhdGUudmVsb2NpdHlZID0gKHlPZmZzZXQgLyB0aW1lUGVyUG9pbnQpIHx8IDA7XG5cbiAgICBpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIHRoaXMubW9tZW50dW1MYXllclguc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlWCgkeyBzdGF0ZS52ZWxvY2l0eVggLyAzMH0pYDtcbiAgICAgIHRoaXMubW9tZW50dW1MYXllclkuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlWSgkeyBzdGF0ZS52ZWxvY2l0eVkgLyAzMH0pYDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVsZWFzZVZlbG9jaXR5XG4gICAqIEFuaW1hdGUgbGF5ZXIsIGJhc2VkIG9uIGN1cnJlbnQgdmVsb2NpdHlcbiAgICovXG4gIHJlbGVhc2VWZWxvY2l0eSgpIHtcbiAgICBjb25zdCB7IHN0YXRlIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcy5wYXJlbnQ7XG4gICAgbGV0IHNwZWVkVGhyZXNob2xkID0gMC4zO1xuICAgIGxldCBmcmFtZXNYID0gMDtcbiAgICBsZXQgZnJhbWVzWSA9IDA7XG4gICAgbGV0IGRpc3RhbmNlWCA9IDA7XG4gICAgbGV0IGRpc3RhbmNlWSA9IDA7XG4gICAgbGV0IGkgPSAxO1xuXG4gICAgaWYgKHN0YXRlLm92ZXJzY3JvbGxYICYmIHN0YXRlLm92ZXJzY3JvbGxZKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYW5pbWF0ZSh7XG4gICAgICAgIGRpc3RhbmNlWDogLXN0YXRlLm92ZXJzY3JvbGxYIHx8IDAsXG4gICAgICAgIGRpc3RhbmNlWTogLXN0YXRlLm92ZXJzY3JvbGxZIHx8IDAsXG4gICAgICAgIHRpbWU6IDM1MCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSBob3cgbXVjaCBmcmFtZXMgbmVlZHMgdG8gaW1wdWxzZSBmb3IgZ28gb3V0XG4gICAgaWYgKHN0YXRlLm92ZXJzY3JvbGxYKSB7XG4gICAgICBkaXN0YW5jZVggPSAtc3RhdGUub3ZlcnNjcm9sbFg7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS52ZWxvY2l0eVggJiYgTWF0aC5hYnMoc3RhdGUudmVsb2NpdHlYKSA+IHNwZWVkVGhyZXNob2xkKSB7XG4gICAgICBmcmFtZXNYID0gTWF0aC5hYnMoTWF0aC5jZWlsKE1hdGgubG9nKHNwZWVkVGhyZXNob2xkIC8gTWF0aC5hYnMoc3RhdGUudmVsb2NpdHlYKSkgLyBNYXRoLmxvZyhvcHRpb25zLmZyaWN0aW9uKSkpO1xuXG4gICAgICBpID0gMTtcbiAgICAgIHdoaWxlIChpIDw9IGZyYW1lc1gpIHtcbiAgICAgICAgbGV0IHZlbG9jaXR5ID0gc3RhdGUudmVsb2NpdHlYICogTWF0aC5wb3cob3B0aW9ucy5mcmljdGlvbiwgaSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0T3ZlcnNjcm9sbFkoc3RhdGUuY3VycmVudFkgKyBkaXN0YW5jZVkpKSB7XG4gICAgICAgICAgdmVsb2NpdHkgKj0gb3B0aW9ucy5kZWNlbGVyYXRpb247XG4gICAgICAgICAgZnJhbWVzWCAtPSBNYXRoLnJvdW5kKDEgLyBvcHRpb25zLmRlY2VsZXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBkaXN0YW5jZVkgKz0gdmVsb2NpdHk7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RhdGUub3ZlcnNjcm9sbFkpIHtcbiAgICAgIGRpc3RhbmNlWSA9IC1zdGF0ZS5vdmVyc2Nyb2xsWTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLnZlbG9jaXR5WSAmJiBNYXRoLmFicyhzdGF0ZS52ZWxvY2l0eVkpID4gc3BlZWRUaHJlc2hvbGQpIHtcbiAgICAgIGZyYW1lc1kgPSBNYXRoLmFicyhNYXRoLmNlaWwoTWF0aC5sb2coc3BlZWRUaHJlc2hvbGQgLyBNYXRoLmFicyhzdGF0ZS52ZWxvY2l0eVkpKSAvIE1hdGgubG9nKG9wdGlvbnMuZnJpY3Rpb24pKSk7XG5cbiAgICAgIGkgPSAxO1xuICAgICAgd2hpbGUgKGkgPD0gZnJhbWVzWSkge1xuICAgICAgICBsZXQgdmVsb2NpdHkgPSBzdGF0ZS52ZWxvY2l0eVkgKiBNYXRoLnBvdyhvcHRpb25zLmZyaWN0aW9uLCBpKTtcblxuICAgICAgICBpZiAodGhpcy5nZXRPdmVyc2Nyb2xsWShzdGF0ZS5jdXJyZW50WSArIGRpc3RhbmNlWSkpIHtcbiAgICAgICAgICB2ZWxvY2l0eSAqPSBvcHRpb25zLmRlY2VsZXJhdGlvbjtcbiAgICAgICAgICBmcmFtZXNZIC09IE1hdGgucm91bmQoMSAvIG9wdGlvbnMuZGVjZWxlcmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3RhbmNlWSArPSB2ZWxvY2l0eTtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBmcmFtZXMgPSBNYXRoLm1heChmcmFtZXNZLCBmcmFtZXNYLCBNYXRoLnJvdW5kKDM1MCAvIDE2KSk7XG5cbiAgICB0aGlzLl9hbmltYXRlKHtcbiAgICAgIGRpc3RhbmNlWCwgZGlzdGFuY2VZLCBmcmFtZXMsIGVhc2luZzogb3V0UXVhcnRpYyxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIC8vIGNoZWNrIGlmIGRlc3RpbmF0aW9uIHBvaW50cyBtYWtlcyB1cyB0byBmZWVsIGxpdHRsZSBiaXQgb3ZlcnNjcm9sbGVkLlxuICAgICAgICBpZiAoc3RhdGUub3ZlcnNjcm9sbFggfHwgc3RhdGUub3ZlcnNjcm9sbFkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYW5pbWF0ZSh7XG4gICAgICAgICAgICBkaXN0YW5jZVg6IC1zdGF0ZS5vdmVyc2Nyb2xsWCB8fCAwLFxuICAgICAgICAgICAgZGlzdGFuY2VZOiAtc3RhdGUub3ZlcnNjcm9sbFkgfHwgMCxcbiAgICAgICAgICAgIHRpbWU6IDMwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBfYW5pbWF0ZVxuICAgKiBJbnRlcm5hbCBmdW5jdGlvbiB0byBwcm92aWRlIGZsZXhpYmxlIGFwaSBmb3IgYW5pbWF0aW9ucy4gVXNlZCBhcyBpbnRlcm5hbCBtZXRob2QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uXG4gICAqL1xuICBfYW5pbWF0ZSh7XG4gICAgZGlzdGFuY2VYLFxuICAgIGRpc3RhbmNlWSxcbiAgICBlYXNpbmcsXG4gICAgZnJhbWVzLFxuICAgIHRpbWUsXG4gICAgY2FsbGJhY2ssXG4gIH0pIHtcbiAgICBjb25zdCB7IHN0YXRlIH0gPSB0aGlzO1xuICAgIGxldCBzdGFydFggPSBzdGF0ZS5jdXJyZW50WDtcbiAgICBsZXQgc3RhcnRZID0gc3RhdGUuY3VycmVudFk7XG4gICAgbGV0IGN1cnJlbnRGcmFtZSA9IDA7XG5cbiAgICBjYW5jZWwodGhpcy5fYW5pbWF0ZVJBRik7XG4gICAgdmFyIGlkID0gTWF0aC5yYW5kb20oKTtcblxuICAgIGlmICghZnJhbWVzICYmIHRpbWUpIHtcbiAgICAgIGZyYW1lcyA9IHRpbWUgLyAoMTAwMCAvIDYwKTtcbiAgICB9XG5cbiAgICBpZiAoIWVhc2luZykge1xuICAgICAgZWFzaW5nID0gaW5lcnRpYTtcbiAgICB9XG5cbiAgICBzdGF0ZS5pc0FuaW1hdGVkID0gdHJ1ZTtcblxuICAgIGxldCB0aWNrID0gKCkgPT4ge1xuICAgICAgaWYgKCFzdGF0ZS5pc0FuaW1hdGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coaWQpO1xuXG4gICAgICBzdGF0ZS5jdXJyZW50WCA9IGVhc2luZyhjdXJyZW50RnJhbWUsIHN0YXJ0WCwgZGlzdGFuY2VYLCBmcmFtZXMpO1xuICAgICAgc3RhdGUuY3VycmVudFkgPSBlYXNpbmcoY3VycmVudEZyYW1lLCBzdGFydFksIGRpc3RhbmNlWSwgZnJhbWVzKTtcblxuICAgICAgdGhpcy5yZW5kZXJQb3NpdGlvbigpO1xuXG4gICAgICBjdXJyZW50RnJhbWUrKztcbiAgICAgIGlmIChjdXJyZW50RnJhbWUgPCBmcmFtZXMpIHtcbiAgICAgICAgd3JpdGUodGljayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5pc0FuaW1hdGVkID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhpcy5fYW5pbWF0ZVJBRiA9IHJlcXVlc3QodGljayk7XG4gIH1cblxuICAvKipcbiAgICogb3ZlcnNjcm9sbFJlZHVjZXJcbiAgICogUmVkdWNlIGFtbW91bnQgb2Ygb3ZlcnNjcm9sbFxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBhbW1vdXQgb2Ygb3ZlcnNjcm9sbFxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHJlc3VsdCAtIHJlZHVjZWQgYW1tb3VudFxuICAgKi9cbiAgb3ZlcnNjcm9sbFJlZHVjZXIodmFsdWUpIHtcbiAgICBsZXQgZGlyZWN0aW9uID0gdmFsdWUgPiAwID8gMSA6IC0xO1xuICAgIGxldCBpID0gTWF0aC5hYnModmFsdWUpO1xuICAgIGxldCByZXN1bHRzID0gMDtcbiAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgIHJlc3VsdHMgKz0gMSAvIE1hdGgucG93KDEuMDAzNSwgaSkgKiBkaXJlY3Rpb247XG4gICAgICBpLS07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICogc3Vic2NyaWJlXG4gICAqIFN1YnNyaWJlIHRvIHBvaW50ZXIgZXZlbnRzXG4gICAqL1xuICBzdWJzY3JpYmUoKSB7XG4gICAgdGhpcy5fcHJvY2Vzc0ludGVyYWN0aW9uID0gdGhpcy5wcm9jZXNzSW50ZXJhY3Rpb24uYmluZCh0aGlzKTtcbiAgICB0aGlzLl9wcm9jZXNzV2hlZWwgPSB0aGlzLnByb2Nlc3NXaGVlbC5iaW5kKHRoaXMpO1xuICAgIHRoaXMucGFyZW50LmF0dGFjaCgnc3RhcnQgbW92ZSBlbmQnLCB0aGlzLl9wcm9jZXNzSW50ZXJhY3Rpb24pO1xuICAgIHRoaXMucGFyZW50LmF0dGFjaCgnd2hlZWwnLCB0aGlzLl9wcm9jZXNzV2hlZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN1YnNjcmliZVxuICAgKiBVbnN1YnNjcmliZSBmcm9tIGFueXRoaW5nXG4gICAqL1xuICB1bnN1YnNjcmliZSgpIHtcbiAgICB0aGlzLnBhcmVudC5kZXRhY2goJ3N0YXJ0IG1vdmUgZW5kJywgdGhpcy5wcm9jZXNzSW50ZXJhY3Rpb24pO1xuICAgIHRoaXMucGFyZW50LmRldGFjaCgnd2hlZWwnLCB0aGlzLnByb2Nlc3NXaGVlbCk7XG4gIH1cblxuICAvKipcbiAgICogcmVmcmVzaFxuICAgKiBSZWZyZXNoIGNvbXBvbmVudCBkYXRhXG4gICAqL1xuICByZWZyZXNoKCkge1xuICAgIGNvbnN0IHsgc3RhdGUsIGNvbnRhaW5lciB9ID0gdGhpcztcblxuICAgIHN0YXRlLndpZHRoID0gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIHN0YXRlLmhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG5cbiAgICBpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIGNvbnN0IHsgc2hhZG93TGF5ZXIgfSA9IHRoaXM7XG4gICAgICBzaGFkb3dMYXllci5zdHlsZS53aWR0aCA9IHN0YXRlLndpZHRoO1xuICAgICAgc2hhZG93TGF5ZXIuc3R5bGUuaGVpZ2h0ID0gc3RhdGUuaGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXN0cm95XG4gICAqIGRlc3Ryb3kgZnVuY3Rpb25cbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuXG4gICAgaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICBsZXQgeyBjb250YWluZXIgfSA9IHRoaXMucGFyZW50O1xuICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93TGF5ZXIpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMubW9tZW50dW1MYXllclgpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMubW9tZW50dW1MYXllclkpO1xuICAgIH1cbiAgfVxuIH1cblxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyTGF5ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbXBvbmVudHMvUmVuZGVyTGF5ZXIuanNcbiAqKi8iLCIvKipcbiAqIEVhc2luZ3MgY29sbGVjdGlvblxuICovXG5cbi8qKlxuICogSW5lcnRpYSBlYXNpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBjdXJyZW50RnJhbWVcbiAqIEBwYXJhbSB7TnVtYmVyfSBjdXJyZW50VmFsdWVcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW1vdW50T2ZDaGFuZ2VcbiAqIEBwYXJhbSB7TnVtYmVyfSB0b3RhbEZyYW1lc1xuICovXG5jb25zdCBpbmVydGlhID0gKHQsIGIsIGMsIGQpID0+IHtcbiAgcmV0dXJuIGMqKCh0PXQvZC0xKSp0KnQgKyAxKSArIGI7XG59O1xuXG4vKipcbiAqIEluZXJ0aWEgZWFzaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gY3VycmVudEZyYW1lXG4gKiBAcGFyYW0ge051bWJlcn0gY3VycmVudFZhbHVlXG4gKiBAcGFyYW0ge051bWJlcn0gYW1tb3VudE9mQ2hhbmdlXG4gKiBAcGFyYW0ge051bWJlcn0gdG90YWxGcmFtZXNcbiAqL1xuY29uc3Qgb3V0UXVhcnRpYyA9ICh0LCBiLCBjLCBkKSA9PiB7XG4gIHZhciB0cz0odC89ZCkqdDtcbiAgdmFyIHRjPXRzKnQ7XG4gIHJldHVybiBiK2MqKC0xKnRzKnRzICsgNCp0YyArIC02KnRzICsgNCp0KTtcbn1cblxuXG5leHBvcnQgeyBpbmVydGlhLCBvdXRRdWFydGljIH07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWJzL2Vhc2luZ3MuanNcbiAqKi8iLCJcbndpbmRvdy5kZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJyk7XG53aW5kb3cuZGVidWcuZW5hYmxlKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiB3aW5kb3cuZGVidWcobmFtZSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZGV2L2RlYnVnLmpzXG4gKiovIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICdsaWdodHNlYWdyZWVuJyxcbiAgJ2ZvcmVzdGdyZWVuJyxcbiAgJ2dvbGRlbnJvZCcsXG4gICdkb2RnZXJibHVlJyxcbiAgJ2RhcmtvcmNoaWQnLFxuICAnY3JpbXNvbidcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICByZXR1cm4gKCdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh3aW5kb3cuY29uc29sZSAmJiAoY29uc29sZS5maXJlYnVnIHx8IChjb25zb2xlLmV4Y2VwdGlvbiAmJiBjb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKCkge1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuIGFyZ3M7XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzID0gW2FyZ3NbMF0sIGMsICdjb2xvcjogaW5oZXJpdCddLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCAxKSk7XG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EteiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG4gIHJldHVybiBhcmdzO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpe1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2RlYnVnL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyY2FzZWQgbGV0dGVyLCBpLmUuIFwiblwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFByZXZpb3VzbHkgYXNzaWduZWQgY29sb3IuXG4gKi9cblxudmFyIHByZXZDb2xvciA9IDA7XG5cbi8qKlxuICogUHJldmlvdXMgbG9nIHRpbWVzdGFtcC5cbiAqL1xuXG52YXIgcHJldlRpbWU7XG5cbi8qKlxuICogU2VsZWN0IGEgY29sb3IuXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IoKSB7XG4gIHJldHVybiBleHBvcnRzLmNvbG9yc1twcmV2Q29sb3IrKyAlIGV4cG9ydHMuY29sb3JzLmxlbmd0aF07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlYnVnKG5hbWVzcGFjZSkge1xuXG4gIC8vIGRlZmluZSB0aGUgYGRpc2FibGVkYCB2ZXJzaW9uXG4gIGZ1bmN0aW9uIGRpc2FibGVkKCkge1xuICB9XG4gIGRpc2FibGVkLmVuYWJsZWQgPSBmYWxzZTtcblxuICAvLyBkZWZpbmUgdGhlIGBlbmFibGVkYCB2ZXJzaW9uXG4gIGZ1bmN0aW9uIGVuYWJsZWQoKSB7XG5cbiAgICB2YXIgc2VsZiA9IGVuYWJsZWQ7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIGFkZCB0aGUgYGNvbG9yYCBpZiBub3Qgc2V0XG4gICAgaWYgKG51bGwgPT0gc2VsZi51c2VDb2xvcnMpIHNlbGYudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgICBpZiAobnVsbCA9PSBzZWxmLmNvbG9yICYmIHNlbGYudXNlQ29sb3JzKSBzZWxmLmNvbG9yID0gc2VsZWN0Q29sb3IoKTtcblxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVvXG4gICAgICBhcmdzID0gWyclbyddLmNvbmNhdChhcmdzKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16JV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmZvcm1hdEFyZ3MpIHtcbiAgICAgIGFyZ3MgPSBleHBvcnRzLmZvcm1hdEFyZ3MuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgfVxuICAgIHZhciBsb2dGbiA9IGVuYWJsZWQubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cbiAgZW5hYmxlZC5lbmFibGVkID0gdHJ1ZTtcblxuICB2YXIgZm4gPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKSA/IGVuYWJsZWQgOiBkaXNhYmxlZDtcblxuICBmbi5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cbiAgcmV0dXJuIGZuO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIHZhciBzcGxpdCA9IChuYW1lc3BhY2VzIHx8ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9kZWJ1Zy9kZWJ1Zy5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpe1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB2YWwpIHJldHVybiBwYXJzZSh2YWwpO1xuICByZXR1cm4gb3B0aW9ucy5sb25nXG4gICAgPyBsb25nKHZhbClcbiAgICA6IHNob3J0KHZhbCk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gJycgKyBzdHI7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwMDApIHJldHVybjtcbiAgdmFyIG1hdGNoID0gL14oKD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhzdHIpO1xuICBpZiAoIW1hdGNoKSByZXR1cm47XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNob3J0KG1zKSB7XG4gIGlmIChtcyA+PSBkKSByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICBpZiAobXMgPj0gaCkgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgaWYgKG1zID49IG0pIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIGlmIChtcyA+PSBzKSByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9uZyhtcykge1xuICByZXR1cm4gcGx1cmFsKG1zLCBkLCAnZGF5JylcbiAgICB8fCBwbHVyYWwobXMsIGgsICdob3VyJylcbiAgICB8fCBwbHVyYWwobXMsIG0sICdtaW51dGUnKVxuICAgIHx8IHBsdXJhbChtcywgcywgJ3NlY29uZCcpXG4gICAgfHwgbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG4sIG5hbWUpIHtcbiAgaWYgKG1zIDwgbikgcmV0dXJuO1xuICBpZiAobXMgPCBuICogMS41KSByZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtcbiAgcmV0dXJuIE1hdGguY2VpbChtcyAvIG4pICsgJyAnICsgbmFtZSArICdzJztcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9tcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBldmVudFR5cGU6IHVuZGVmaW5lZCwgICAgIC8vIHdoYXQgZXZlbnQgdHlwZSB3aWxsIGJlIHVzZWQuIHVuZGVmaW5lZCA9IGF1dG9kZXRlY3RcbiAgJ2RvY3VtZW50JzogZG9jdW1lbnQsICAgICAvLyB0aGUgYm90dG9tIG1vc3QgRE9NIGVsZW1lbnQgdXNlZCBmb3IgXCJtb3ZlXCIgYW5kIFwiZW5kXCIgZXZlbnRzXG4gIHByZXZlbnREZWZhdWx0OiB0cnVlLFxuXG4gIC8vIHNjcm9sbGluZ1xuICBhbGxvd092ZXJzY3JvbGw6IHRydWUsXG4gIHNjcm9sbFk6IHRydWUsXG4gIHNjcm9sbFg6IGZhbHNlLFxuXG4gIC8vIG1vbWVudHVtXG4gIGZyaWN0aW9uIDogMC45MixcbiAgZGVjZWxlcmF0aW9uIDogMC4zLFxuXG4gIC8vIGV2ZW50c1xuICBvblJlYWR5OiB1bmRlZmluZWRcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pc2Nyb2xsLm9wdGlvbnMuanNcbiAqKi8iLCIvKipcbiAqIFBhcnQsIGRldGVjdHMgZW52aXJvbm1lbnQsIHN1cHBvcnRzLCBldGNcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBkZXRlY3RWZW5kb3JQcmVmaXhcbiAqIEJyb3dzZXIgdmVuZG9yLCB1c2VkIHRvIGFwcGx5IENTUyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gZGV0ZWN0cyAtIG9iamVjdCB0byB3cml0ZSBkZXRlY3RlZCBkYXRhXG4gKi9cbmNvbnN0IGRldGVjdFZlbmRvclByZWZpeCA9IGRldGVjdHMgPT4ge1xuICBsZXQgZWxlbWVudFN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGU7XG4gIGxldCB2ZW5kb3JzID0gWyd0JywgJ3dlYmtpdFQnLCAnTW96VCcsICdtc1QnLCAnT1QnXTtcbiAgbGV0IHZlbmRvciA9IGZhbHNlO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gdmVuZG9ycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAodmVuZG9yc1tpXSArICdyYW5zZm9ybScgaW4gZWxlbWVudFN0eWxlKSB7XG4gICAgICB2ZW5kb3IgPSB2ZW5kb3JzW2ldLnN1YnN0cigwLCB2ZW5kb3JzW2ldLmxlbmd0aCAtIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZGV0ZWN0cy52ZW5kb3IgPSB2ZW5kb3I7XG59O1xuXG4vKipcbiAqIHByZWZpeENTU1Byb3BlcnR5XG4gKiBJZiBuZWVkZWQgcHJlZml4IHRoZSBDU1MgcHJvcGVydHkgd2l0aCB0aGUgdmVuZG9yIHNwZWNpZmljIHZlcnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSAgIHN0eWxlIC0gcHJvcGVydHkgdG8gcHJlZml4XG4gKiBAcGFyYW0ge09iamVjdH0gZGV0ZWN0cyAtIG9iamVjdCB0byB3cml0ZSBkZXRlY3RlZCBkYXRhXG4gKi9cbmNvbnN0IHByZWZpeENTU1Byb3BlcnR5ID0gKHN0eWxlLCBkZXRlY3RzKSA9PiB7XG4gIGxldCB7IHZlbmRvcn0gPSBkZXRlY3RzO1xuXG4gIGlmICh2ZW5kb3IgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGVsZW1lbnRTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlO1xuICBzdHlsZSA9IHZlbmRvciA9PT0gJycgPyBzdHlsZSA6IHZlbmRvciArIHN0eWxlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3R5bGUuc3Vic3RyKDEpO1xuICByZXR1cm4gc3R5bGUgaW4gZWxlbWVudFN0eWxlICYmIHN0eWxlO1xufTtcblxuLyoqXG4gKiBkZXRlY3RQb2ludGVyRXZlbnRzXG4gKiBGaW5kIHdoYXQga2luZCBvZiBldmVudHMgc3VwcG9ydHMgb24gY2xpZW50XG4gKiBAcGFyYW0ge09iamVjdH0gZGV0ZWN0cyAtIG9iamVjdCB0byB3cml0ZSBkZXRlY3RlZCBkYXRhXG4gKi9cbmNvbnN0IGRldGVjdFBvaW50ZXJFdmVudHMgPSBkZXRlY3RzID0+IHtcblxuICBPYmplY3QuYXNzaWduKGRldGVjdHMsIHtcbiAgICBoYXNQb2ludGVyRXZlbnRzOiAhIXdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQsXG4gICAgaGFzTVNwb2ludGVyRXZlbnRzOiAhIXdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCxcblxuICAgIC8vIHdlIGFyZSBnb2luZyB0byB1c2UgdXNlciBhZ2VudCBzcG9vZmluZyB0byBwcmV2ZW50IHRvdWNoIGV2ZW50cyBvbiBkZXNrdG9wLiBUT0RPOiBjYW4gaXQgYmUgZG9uZSB3L28gc3Bvb2Zpbmc/XG4gICAgdXNlVG91Y2hFdmVudHM6ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpICYmIC9tb2JpbGV8dGFibGV0fGlwKGFkfGhvbmV8b2QpfGFuZHJvaWR8c2lsay9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpLFxuICB9KTtcblxuICBkZXRlY3RzLnVzZU1vdXNlRXZlbnRzID0gIWRldGVjdHMuaGFzUG9pbnRlckV2ZW50cyAmJiAhZGV0ZWN0cy5oYXNNU3BvaW50ZXJFdmVudHMgJiYgIWRldGVjdHMudXNlVG91Y2hFdmVudHM7XG59O1xuXG4vKipcbiAqIGFwcGx5XG4gKiBFeHRlbmQgb2JqZWN0IHdpdGggY2FsY3VsYXRlZCBjbGllbnQgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IElzY3JvbGxQcm90b3R5cGUgLSB0YXJnZXQgb2JqZWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IElzY3JvbGxQcm90b3R5cGUgPT4ge1xuICBJc2Nyb2xsUHJvdG90eXBlLmRldGVjdHMgPSB7fTtcbiAgSXNjcm9sbFByb3RvdHlwZS5zdHlsZXMgPSB7fTtcbiAgbGV0IHsgZGV0ZWN0cywgc3R5bGVzIH0gPSBJc2Nyb2xsUHJvdG90eXBlO1xuXG4gIC8vIHJ1biBkZXRlY3RzO1xuICBkZXRlY3RQb2ludGVyRXZlbnRzKGRldGVjdHMpO1xuICBkZXRlY3RWZW5kb3JQcmVmaXgoZGV0ZWN0cyk7XG5cbiAgLy8gcnVuIHN0eWxlIHByZWZpeGVzICgjc2hvdWxkIG1vdmUgb3V0IG9mIGhlcmUgc29vbilcbiAgT2JqZWN0LmFzc2lnbihzdHlsZXMsIHtcbiAgICB0cmFuc2Zvcm06IHByZWZpeENTU1Byb3BlcnR5KCd0cmFuc2Zvcm0nLCBkZXRlY3RzKSxcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IHByZWZpeENTU1Byb3BlcnR5KCd0cmFuc2l0aW9uRHVyYXRpb24nLCBkZXRlY3RzKSxcbiAgfSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pc2Nyb2xsLmRldGVjdHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgeyB3cml0ZSB9IGZyb20gJy4uL2xpYnMvZnBzLmpzJztcblxuY29uc3Qga3NvcnQgPSBmdW5jdGlvbiAoIHNyYyApIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyggc3JjICksXG4gICAgICB0YXJnZXQgPSB7fTtcbiAga2V5cy5zb3J0KCk7XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoIGtleSApIHtcbiAgICB0YXJnZXRbIGtleSBdID0gc3JjWyBrZXkgXTtcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoSXNjcm9sbEluc3RhbmNlKSA9PiB7XG4gIGNvbnN0IHN0YXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBvbGRzdHJpbmcsIG5ld3N0cmluZztcbiAgc3RhdHMuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICBzdGF0cy5zdHlsZS50b3AgPSAwO1xuICBzdGF0cy5zdHlsZS5yaWdodCA9IDA7XG4gIHN0YXRzLnN0eWxlLnBhZGRpbmcgPSAxMDtcbiAgc3RhdHMuc3R5bGUuYmFja2dyb3VuZCA9ICdyZWQnO1xuICBJc2Nyb2xsSW5zdGFuY2UuY29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXRzKTtcblxuICBmdW5jdGlvbiB0aWNrKCkge1xuICAgIHZhciBvYmogPSBPYmplY3QuYXNzaWduKHt9LCBJc2Nyb2xsSW5zdGFuY2Uuc3RhdGUpO1xuICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkob2JqLlBPSU5UU1swXSwgbnVsbCwgNCkpO1xuICAgIGRlbGV0ZSBvYmouUE9JTlRTO1xuICAgIG9iai52aWV3TGF5ZXIgPSBrc29ydChvYmoudmlld0xheWVyKTtcblxuICAgIG5ld3N0cmluZyA9IEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgNCk7XG5cbiAgICBpZiAob2xkc3RyaW5nICE9PSBuZXdzdHJpbmcpIHtcbiAgICAgIG9sZHN0cmluZyA9IG5ld3N0cmluZztcbiAgICAgIHN0YXRzLmlubmVySFRNTCA9IGA8cHJlIHN0eWxlPVwid2lkdGg6MzYwcHhcIj4ke25ld3N0cmluZ308L3ByZT5gO1xuICAgIH1cbiAgICB3cml0ZSh0aWNrKTtcbiAgfVxuICB3cml0ZSh0aWNrKTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZGV2L1N0YXRlUGFuZWwuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9