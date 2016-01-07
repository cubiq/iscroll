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
  if ( !this._customEvents[type] ) {
    return;
  }

  let i = this._customEvents[type].length;

  while ( i-- ) {
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
  if ( typeof type === 'object' ) {
    for ( var i in type ) {
      this.attach(i, type[i]);
    }

    return;
  }

  if ( !this._customEvents[type] ) {
    this._customEvents[type] = [];
  }

  this._customEvents[type].push(cb);
}

/**
 * attach
 * Attach a custom event
 * @param {String}  type
 * @param {Function}  fn
 */
function attachOnce(type, cb) {

  var callback = function() {
    cb();
    this.detach(type, callback);
  }
  this.attach(type, callback);
  }

/**
 * detach
 * Detach a custom event
 * @param {String}  type
 * @param {Function}  fn
 */
function detach(type, cb) {
  if ( typeof type === 'object' ) {
    for ( var i in type ) {
      this.detach(i, type[i]);
    }
    return;
  }

  if (!this._customEvents[type] ) {
    return;
  }

  if (!cb) {
    this._customEvents[type] = [];
  } else {
    this._customEvents[type].filter((item) => item !== cb);
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
  if ( !this._events[type] ) {
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
    if ( eventArr[i].cb === cb && eventArr[i].context === context ) {
      context.removeEventListener(type, cb, false);
      this._events[type].splice(i, 1);
    }
  }

  if ( !this._events[type].length ) {
    delete this._events[type];
  }
}

export default { 

  /**
   * apply
   * Apply event emitter to object
   * @param {Object} object - target object
   */
  apply(obj) {
    obj._events = {};       // holds all the Default registered events
    obj._customEvents = {}; // holds all iScroll specific events
  },

  /**
   * extend
   * Extend object (for prototypes)
   * @param {Object} object - target object
   */
  extend(obj) {
    Object.assign(obj, { attach, attachOnce, detach, emit, on, off });
  }
};

