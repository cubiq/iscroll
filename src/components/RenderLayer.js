/**
 * Component, render layer
 */
'use strict';
import { inertia } from '../libs/easings.js';
import { read } from '../libs/fps.js';

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

    this.timeCapsule = []; // keeps time data for momentum
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
   * renderPosition
   * Get pointer data from EventProcessor
   * @param {Object} event - pointer event
   */
  processInteraction(e) {
    const { state, timeCapsule } = this;
    state.isAnimated = false;

    if (e.phase === 'start') {
      state.startX = state.currentX;
      state.startY = state.currentY;
      timeCapsule.splice(timeCapsule.length);
    }

    // update timecapsule
    timeCapsule.push([e.x, e.y, e.currentTime]);
    if (timeCapsule.length > 5) {
      timeCapsule.shift();
    }

    if (e.distanceX && e.distanceY) {
      state.currentX = state.startX - e.distanceX;
      state.currentY = state.startY - e.distanceY;

      this.renderPosition();
    }

    if (e.phase === 'end') {
      delete state.startX;
      delete state.startY;

      if (state.overscrollX || state.overscrollY) {
        this.overscrollRebound();
      } else {
        this.animateMomentum();
      }
    }

    this.calculateMomentum();
  }

  /**
   * renderPosition
   * Render layer position
   */
  renderPosition() {
    const { state, container } = this;
    const { options } = this.parent;
    const parentState = this.parent.state;
    const transform = this.parent.styles.transform;

    // calculate boundaries and overscrollX
    if (state.currentX > 0) {
      state.overscrollX = state.currentX;
    } else if (state.width + state.currentX < parentState.width) {
      state.overscrollX = (state.width + state.currentX) - parentState.width;
    } else if (state.overscrollX) {
      delete state.overscrollX;
    }

    // calculate boundaries and overscrollY
    if (state.currentY > 0) {
      state.overscrollY = state.currentY;
    } else if (state.height + state.currentY < parentState.height) {
      state.overscrollY = (state.height + state.currentY) - parentState.height;
    } else if (state.overscrollY) {
      delete state.overscrollY;
    }

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

    if (NODE_ENV === 'development') {
      if (state.overscrollX || state.overscrollY) {
        this.shadowLayer.style[transform] = `translate3d(${state.currentX}px, ${state.currentY}px, 0px)`;
        this.shadowLayer.style.opacity = 1;
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

  /**
   * calculateMomentum
   * Calculate momentum of pointer events (only first pointer);
   */
  calculateMomentum() {
    const { timeCapsule, state } = this;

    let first = timeCapsule[0];
    let last = timeCapsule[timeCapsule.length - 1];
    let distance = last[2] - first[2];

    state.momentumX = (last[0] - first[0]) / distance;
    state.momentumY = (last[1] - first[1]) / distance;

    if (NODE_ENV === 'development') {
      this.momentumLayerX.style.transform = `scaleX(${state.momentumX / 5})`;
      this.momentumLayerY.style.transform = `scaleY(${state.momentumY / 5})`;
    }
  }


  /**
   * overscrollReducer
   * Reduce ammount of overscroll
   */
  overscrollReducer(value) {
    return value / 3;
  }

  /**
   * overscrollRebound
   * Animate overscrolled layer back to bounds
   */
  overscrollRebound() {
    var { state } = this;

    this.animate(
      state.currentX-state.overscrollX, 
      state.currentY-state.overscrollY, 
      false,
      function(){
        delete state.overscrollY;
        delete state.overscrollX;
      }
    );
  }

  /**
   * animateMomentum
   * Animate throw with momentum
   */
  animateMomentum() {
    var { state } = this;

    var x = state.currentX + 300 * state.momentumX;
    var y = state.currentY + 300 * state.momentumY;

    this.animate(x, y, 350, this.overscrollRebound.bind(this));
  }


  /**
   * animate
   */
  animate(x, y, time, callback) {
    time = time || 350;
    var { state } = this;

    let totalFrames = Math.ceil(time / 16); // 16ms per frame (60fps)
    let currentFrame = 0;

    let startX = state.currentX;
    let startY = state.currentY;
    let ammountX = x - startX;
    let ammountY = y - startY;

    console.log('animate', arguments);


    const tick = () => {

      // currentFrame, startValue, endValue, totalFrames
      if (ammountX) {
        state.currentX = inertia(null, currentFrame, startX, ammountX, totalFrames);
      }

      if (ammountY) {
        state.currentY = inertia(null, currentFrame, startY, ammountY, totalFrames);
      }

      this.renderPosition();

      currentFrame++;
      if (currentFrame < totalFrames && state.isAnimated) {
        read(tick);
      } else {
        state.isAnimated = false;
        if (typeof callback === 'function') {
          callback();
        }
      }
    };

    state.isAnimated = true;
    read(tick);

  }

  /**
   * subscribe
   * Subsribe to pointer events
   */
  subscribe() {
    this.processInteraction = this.processInteraction.bind(this);
    this.parent.attach('start move end', this.processInteraction);
  }

  /**
   * subscribe
   * Unsubscribe from anything
   */
  unsubscribe() {
    this.parent.detach('start move end', this.processInteraction);
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
      this.shadowLayer.style.width = state.width;
      this.shadowLayer.style.height = state.height;
    }
  }

  /**
   * destroy
   * destroy function
   */
  destroy() {
    this.unsubscribe();
 
    if (NODE_ENV === 'development') {
      this.parent.container.removeChild(this.shadowLayer);
      this.parent.container.removeChild(this.momentumLayerX);
      this.parent.container.removeChild(this.momentumLayerY);
    }
  }
 }

export default RenderLayer;
