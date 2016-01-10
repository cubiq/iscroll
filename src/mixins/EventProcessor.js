/**
 * Mixins provides methods used for event dispatching
 *
 */
'use strict';
import { read } from '../libs/fps.js';

/**
 * List all known pointer events
 * @const {Object}
 */
const EVENT_TYPE = {
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
const listOfInternalEvents = [
  // basic events
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


const EventHandlingModule = {
  /**
   * handleEvent
   * Global event proxy
   * @param {Object} e - event object
   */
  handleEvent(e) {
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
      case this.eventType.transitionEnd:
            this._eventTransitionEnd(e);
            break;
      case 'orientationchange':
      case 'resize':
        this._eventResize(e);
        break;
    }
  },

  /**
   * _eventStart
   * Initial user interactions phase
   * @param {Object} e - event object
   */
  _eventStart(e) {
    if ( this.options.preventDefault ) {
      e.preventDefault();
    }

    let events = e.targetTouches || [e];
    let id, x, y, i, l;

    for (i = 0, l = events.length; i < l; i++ ) {

      id = events[i].identifier || 0;
      x = events[i].pageX;
      y = events[i].pageY;

      this.globalState.POINTS[id] = {
        instance: this,
        id: id+'',
        phase: 'start',
        initiated: false,
        x: x,
        y: y,
        startX: x,
        startY: y,
        deltaX: 0,
        deltaY: 0,
        startTime: Date.now(),
        currentTime: Date.now(),
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
  _eventMove(e) {
    let events = e.changedTouches || [e];
    let { POINTS } = this.globalState;
    let id, i;

    for (i = events.length; i--; ) {
      id = events[i].identifier || 0;

      if ( POINTS[id] && POINTS[id].initiated ) {
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
  _eventEnd(e) {
    let events = e.changedTouches || [e];
    let { POINTS } = this.globalState;
    let id, i;

    for ( i = events.length; i--; ) {
      id = events[i].identifier || 0;

      if ( POINTS[id] && POINTS[id].initiated ) {
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
  _eventResize(e) {
    // if we resize before the script has been initialized
    if ( !this.state.ready ) {
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
  _updatePoint(point, e) {
    point.currentTime = Date.now();

    // distance travelled since last event
    point.deltaX = point.x - e.pageX;
    point.deltaY = point.y - e.pageY;

    // update current position
    point.x = e.pageX;
    point.y = e.pageY;

    // distance from start
    let xd = point.startX - point.x;
    let yd = point.startY - point.y;
    point.distance = Math.sqrt(xd * xd + yd * yd);
    point.distanceX = xd;
    point.distanceY = yd;

    // angle from start (hence direction) 0=right, counter clockwise
    let theta = Math.atan2(yd, -xd);
    if ( theta < 0 ) {
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
  _renderLoop () {
    let pointCount = 0;
    let { POINTS } = this.globalState;

    for ( let id in POINTS ) {
      let point = POINTS[id];

      switch ( point.phase ) {
        case 'start':
          if ( !point.initiated ) {
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
      read(this._renderLoop.bind(this));
    }
  }
};

/**
 * assignEventsFromOptions
 * Extend object with configured event data
 * @param {Object} IscrollInstance - instance options
 */
const assignEventsFromOptions = (IscrollInstance) => {
  let { options } = IscrollInstance;
  listOfInternalEvents.forEach( eventName => {
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
 * @param {Object} detects - object to write detected data
 */
const detectTransitionEnd = ({detects, eventType}) => {
  let types = {
          '': 'transitionend',
    'webkit': 'webkitTransitionEnd',
       'Moz': 'transitionend',
         'O': 'oTransitionEnd',
        'ms': 'MSTransitionEnd'
  };

  eventType.transitionEnd =  types[detects.vendor] || false;
};

export default {

  /**
   * apply
   * Extend object with configured event data
   * @param {object} type - target object
   */
  apply(IscrollInstance) {
    let { options, detects } = IscrollInstance;

    // choose the appropriate event type to use, it can also be forced via options
    if ( options.eventType ) {
      IscrollInstance.eventType = EVENT_TYPE[ options.eventType ];
    } else if ( detects.hasPointerEvents ) {
      IscrollInstance.eventType = EVENT_TYPE.pointer;
    } else if ( detects.hasMSpointerEvents ) {
      IscrollInstance.eventType = EVENT_TYPE.MSPointer;
    } else if ( detects.useTouchEvents ) {
      IscrollInstance.eventType = EVENT_TYPE.touch;
    } else {
      IscrollInstance.eventType = EVENT_TYPE.mouse;
    }
    detectTransitionEnd(IscrollInstance);


    // bind basic events
    IscrollInstance.on('orientationchange', window);
    IscrollInstance.on('resize', window);
    IscrollInstance.on(IscrollInstance.eventType.start);
    IscrollInstance.on(IscrollInstance.eventType.transitionEnd);

    // setup events from user config
    assignEventsFromOptions(IscrollInstance);

  },

  /**
   * extend
   * Extend object (for prototypes)
   * @param {Object} object - target object
   */
  extend(IscrollPrototype) {
    Object.assign(IscrollPrototype, EventHandlingModule);
  }
};