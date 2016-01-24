/**
 * Component, render layer
 */
'use strict';

import { inertia, outQuartic } from '../libs/easings.js';
import { request, cancel } from '../libs/fps.js';

// store events to calculate velocity here
const pointersTimeCapsule = [];
const pointersTimeCapsuleLimit = 15;
const wheelTimeCapsule = [];
const wheelTimeCapsuleLimit = 15;

class RenderLayer {

  /**
   * constructor
   */
  constructor(name, element, IscrollInstance) {
    this.parent = IscrollInstance;
    this.container = element;
    this.parent[name] = this;
    this.name = name;

    const { parent } = this;

    if (!parent.state[name]) {
      parent.state[name] = {};
    }

    this.state = parent.state[name];

    if (NODE_ENV === 'development') {
      // shadowLayer
      const shadowLayer = document.createElement('div');
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
      const momentumLayerX = document.createElement('div');
      momentumLayerX.style.position = 'absolute';
      momentumLayerX.style.height = '5px';
      momentumLayerX.style.width = '50%';
      momentumLayerX.style.left = '50%';
      momentumLayerX.style.bottom = 2;
      momentumLayerX.style.transformOrigin = '0% 50%';
      momentumLayerX.style.background = 'rgba(255,0,0,0.5)';
      momentumLayerX.style.transform = `scaleX(0)`;
      this.momentumLayerX = momentumLayerX;
      parent.container.appendChild(momentumLayerX);

      // momentumLayerX
      const momentumLayerY = document.createElement('div');
      momentumLayerY.style.position = 'absolute';
      momentumLayerY.style.width = '5px';
      momentumLayerY.style.height = '50%';
      momentumLayerY.style.top = '50%';
      momentumLayerY.style.left = 2;
      momentumLayerY.style.transformOrigin = '50% 0%';
      momentumLayerY.style.transform = `scaleX(0)`;
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
  init() {
    const { state, container } = this;
    if (!state.x) {
      state.x = state.currentX = container.offsetLeft;
    }

    if (!state.y) {
      state.y = state.currentY = container.offsetTop;
    }

    this.refresh();
  }

  /**
   * processInteraction
   * Get pointer data from EventProcessor
   * @param {Object} event - pointer event
   */
  processInteraction(e) {
    const { state } = this;
    this._stopAnimation();

    if (e.phase === 'start') {
      state.startX = state.lastX = state.currentX || 0;
      state.startY = state.lastY = state.currentY || 0;
      pointersTimeCapsule.length = 0; // empty array (mutate)
    }

    // update pointersTimecapsule
    pointersTimeCapsule.push({
      x: e.x,
      y: e.y,
      time: e.currentTime,
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

    if (NODE_ENV === 'development') {
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
  getOverscrollX(x) {
    const state = this.state;
    const parentState = this.parent.state;

    let result  = 0;

    if (!x) {
      x = state.currentX;
    }

    if (x > 0) {
      result = x;
    } else if (state.width + x < parentState.width) {
      result = (state.width + x) - parentState.width;
    }

    return result;
  }

  /**
   * getOverscrollY
   * detect overscroll by y
   * @param {Number} y
   * @return {Number} overscroll by y
   */
  getOverscrollY(y) {
    const state = this.state;
    const parentState = this.parent.state;

    let result  = 0;

    if (!y) {
      y = state.currentY;
    }

    if (y > 0) {
      result = y;
    } else if (state.height + y < parentState.height) {
      result = (state.height + y) - parentState.height;
    }

    return result;
  }

  /**
   * overscrollReducer
   * Reduce ammount of overscroll
   * @param {Number} value - ammout of overscroll
   * @return {Number} result - reduced ammount
   */
  overscrollReducer(value) {
    let direction = value > 0 ? 1 : -1;
    let i = Math.abs(value);
    let results = 0;
    while (i > 0) {
      results += 1 / Math.pow(1.0035, i) * direction;
      i--;
    }

    return results;
  }

  /**
   * calculateVelocity
   * Calculate interaction velocity
   */
  calculateVelocity() {
    const { state } = this;

    let firstPoint = pointersTimeCapsule[0];
    let lastPoint = pointersTimeCapsule[pointersTimeCapsule.length - 1];

    let xOffset = lastPoint.x - firstPoint.x;
    let yOffset = lastPoint.y - firstPoint.y;
    let timeOffset = lastPoint.time - firstPoint.time;

    let timePerPoint = timeOffset / pointersTimeCapsule.length;

    state.velocityX = (xOffset / timePerPoint) || 0;
    state.velocityY = (yOffset / timePerPoint) || 0;

    if (NODE_ENV === 'development') {
      this.momentumLayerX.style.transform = `scaleX(${ state.velocityX / 30})`;
      this.momentumLayerY.style.transform = `scaleY(${ state.velocityY / 30})`;
    }
  }

  /**
   * releaseVelocity
   * Animate layer, based on current velocity
   */
  releaseVelocity() {
    const { state } = this;
    const { options } = this.parent;
    let speedThreshold = 0.3;
    let framesX = 0;
    let framesY = 0;
    let distanceX = 0;
    let distanceY = 0;
    let i = 1;

    if (state.overscrollX && state.overscrollY) {
      return this._animate({
        distanceX: -state.overscrollX || 0,
        distanceY: -state.overscrollY || 0,
        time: 350,
      });
    }

    // calculate how much frames needs to impulse for go out
    if (state.overscrollX) {
      distanceX = -state.overscrollX;
    } else if (state.velocityX && Math.abs(state.velocityX) > speedThreshold) {
      framesX = Math.abs(Math.ceil(Math.log(speedThreshold / Math.abs(state.velocityX)) / Math.log(options.friction)));

      i = 1;
      while (i <= framesX) {
        let velocity = state.velocityX * Math.pow(options.friction, i);

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
        let velocity = state.velocityY * Math.pow(options.friction, i);

        if (this.getOverscrollY(state.currentY + distanceY)) {
          velocity *= options.deceleration;
          framesY -= Math.round(1 / options.deceleration);
        }

        distanceY += velocity;
        i++;
      }
    }

    let frames = Math.max(framesY, framesX, Math.round(350 / 16));

    this._animate({
      distanceX, distanceY, frames, easing: outQuartic,
      callback: () => {
        // check if destination points makes us to feel little bit overscrolled.
        if (state.overscrollX || state.overscrollY) {
          return this._animate({
            distanceX: -state.overscrollX || 0,
            distanceY: -state.overscrollY || 0,
            time: 300,
          });
        }
      },
    });
  }

  /**
   * processWheel
   * Process mousewheel event
   * @param {Object} event - wheel event
   */
  processWheel({ deltaY, deltaX, currentTime, originalEvent }) {
    var { state, parent } = this;
    this._stopAnimation();

    if (parent.options.preventPageScrollWhileScrolling) {
      originalEvent.preventDefault();
    }

    // update wheelTimeCapsule
    wheelTimeCapsule.push({
      x: deltaX,
      y: deltaY,
      time: currentTime,
    });
    if (wheelTimeCapsule.length > wheelTimeCapsuleLimit) {
      wheelTimeCapsule.shift();
    }

    // filtrate Mac magicpad
    if (this._isMagicPad(deltaY)) {
      state.currentY += -deltaY;
      this.renderPosition({
        preventOverscroll:true,
      });
      return;
    }

    if (Math.abs(deltaY) > 10) {
      this.releaseWheel(deltaY, deltaX);
    }
  }

  releaseWheel(deltaY, deltaX) {
    const { state } = this;

    if (wheelTimeCapsule.length < 2) {
      wheelTimeCapsule.length = 0;
      wheelTimeCapsule.push({
        x: deltaX,
        y: deltaY,
        time: Date.now() - 16,
      });
      wheelTimeCapsule.push({
        x: deltaX,
        y: deltaY,
        time: Date.now(),
      });
    }

    // calculate wheel velocity
    let firstPoint = wheelTimeCapsule[0];
    let lastPoint = wheelTimeCapsule[wheelTimeCapsule.length - 1];
    let xOffset = 0;
    let yOffset = 0;
    wheelTimeCapsule.forEach(function(item) {
      xOffset += item.x;
      yOffset += item.y;
    });

    xOffset *= 0.5;
    yOffset *= 0.5;

    let timeOffset = lastPoint.time - firstPoint.time;
    let timePerPoint = timeOffset / wheelTimeCapsule.length;

    state.velocityX = -1 * (xOffset / timePerPoint) || 0;
    state.velocityY = -1 * (yOffset / timePerPoint) || 0;

    wheelTimeCapsule.length = 0;
    this.releaseVelocity();
  }

  /**
   * renderPosition
   * Render layer position
   * @param {Object} options
   */
  renderPosition({
    // preventOverscroll used to cancel overscroll in particular cases like MagicPad scroll
    preventOverscroll,
  } = {}) {
    const { state, container } = this;
    const { options } = this.parent;
    const transform = this.parent.styles.transform;

    // calculate boundaries and overscrollX
    state.overscrollX = this.getOverscrollX();
    state.overscrollY = this.getOverscrollY();

    // calculate position
    if (options.scrollX) {
      state.x = state.currentX - (state.overscrollX || 0);
      if (state.overscrollX && options.allowOverscroll && !preventOverscroll) {
        state.x += this.overscrollReducer(state.overscrollX);
      }
    }

    // calculate position
    if (options.scrollY) {
      state.y = state.currentY - (state.overscrollY || 0);
      if (state.overscrollY && options.allowOverscroll && !preventOverscroll) {
        state.y += this.overscrollReducer(state.overscrollY);
      }
    }

    // #DEV - display actual layer (not reduced by bounds or thresholds)
    if (NODE_ENV === 'development') {
      if (state.overscrollX || state.overscrollY) {
        this.shadowLayer.style[transform] = `translate3d(${state.currentX}px, ${state.currentY}px, 0px)`;

        // this.shadowLayer.style.opacity = 1;
      } else if (this.shadowLayer.style.opacity) {
        this.shadowLayer.style.opacity = 0;
      }
    }

    if (transform) {
      container.style[transform] = `translate3d(${state.x}px, ${state.y}px, 0px)`;
      return;
    }

    // respect old-fashioned browsers
    container.style.left = this.state.x;
    container.style.top = this.state.y;
  }

  _animate({
    distanceX,
    distanceY,
    easing,
    frames,
    time,
    callback,
  }) {

    const { state } = this;
    let startX = state.currentX;
    let startY = state.currentY;
    let currentFrame = 0;

    this._stopAnimation();

    if (!frames && time) {
      frames = time / (1000 / 60);
    }

    if (!easing) {
      easing = inertia;
    }

    state.animation = {
      currentFrame, frames,
      startX, distanceX,
      startY, distanceY,
      easing,
    };

    let tick = () => {
      console.log(Date.now(), state.animation.currentFrame);
      if (!state.animation) {
        return;
      }

      state.animation.currentFrame++;
      let {
        currentFrame, frames,
        startX, distanceX,
        startY, distanceY,
        easing,
      } = state.animation;

      state.currentX = easing(currentFrame, startX, distanceX, frames);
      state.currentY = easing(currentFrame, startY, distanceY, frames);

      this.renderPosition();

      if (currentFrame < frames) {
        state.animation.raf = request(tick);
      } else {
        state.animation = false;
        if (typeof callback === 'function') {
          callback();
        }
      }

    };

    state.animation.raf = request(tick);
    console.log('NEW RAF ID', state.animation.raf);
  }

  _stopAnimation() {
    let { state } = this;

    if (state.animation && state.animation.raf) {
      cancel(state.animation.raf);
    }

    state.animation = false;
  }

  /**
   * Analyse collected mousewheel data determine Mac MagicPad
   * @return {Boolean}
   *
   */
  _isMagicPad(deltaY) {
    var array = [];
    var isMagicPad = false;

    if (!deltaY) {
      return false;
    }

    if (!wheelTimeCapsule.length) {
      array = [deltaY, deltaY, deltaY];
    } else {
      wheelTimeCapsule.forEach(function(item) {
        array.push(item.y);
      });
    }

    array.forEach(function(delta) {
      if (delta % 120 && delta % 100) {
        isMagicPad = true;
      }
    });

    // clean wheelTimeCapsule after ~3 frames
    // Need to detect mousewheel right after MagicPad scroll
    if (isMagicPad) {
      clearTimeout(this.__MagicPadTO);
      this.__MagicPadTO = setTimeout(function() {
        wheelTimeCapsule.length = 0;
      }, 1000 / 20);
    }

    return isMagicPad;
  }

  /**
   * subscribe
   * Subsribe to pointer events
   */
  subscribe() {
    this._processInteraction = this.processInteraction.bind(this);
    this._processWheel = this.processWheel.bind(this);
    this.parent.attach('start move end', this._processInteraction);
    this.parent.attach('wheel', this._processWheel);
  }

  /**
   * subscribe
   * Unsubscribe from anything
   */
  unsubscribe() {
    this.parent.detach('start move end', this.processInteraction);
    this.parent.detach('wheel', this.processWheel);
  }

  /**
   * refresh
   * Refresh component data
   */
  refresh() {
    const { state, container } = this;

    state.width = container.offsetWidth;
    state.height = container.offsetHeight;

    if (NODE_ENV === 'development') {
      const { shadowLayer } = this;
      shadowLayer.style.width = state.width;
      shadowLayer.style.height = state.height;
    }
  }

  /**
   * destroy
   * destroy function
   */
  destroy() {
    this.unsubscribe();

    if (NODE_ENV === 'development') {
      let { container } = this.parent;
      container.removeChild(this.shadowLayer);
      container.removeChild(this.momentumLayerX);
      container.removeChild(this.momentumLayerY);
    }
  }
 }

export default RenderLayer;
