/**
 * Component, renders layer
 */
'use strict';
import { inertia, easeInCubic } from '../libs/easings.js';
import { read } from '../libs/fps.js';

class RenderLayer {
  constructor(name, element, IscrollInstance) {
    this.parent = IscrollInstance;
    this.container = element;
    this.parent[name] = this;
    this.name = name;

    if (!this.parent.state[name]) {
      this.parent.state[name] = {};
    }

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
      this.parent.container.appendChild(shadowLayer);

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
      this.parent.container.appendChild(momentumLayerX);
      
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
      this.parent.container.appendChild(momentumLayerY);
    }

    this.state = this.parent.state[name];
    this.init();
    this.subscribe();

    this.timeCapsule = []; // keeps time data for momentum
  }

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
    if (timeCapsule.length>5) {
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
      }
    }

    this.calculateMomentum();
  }

  renderPosition() {
    const { state } = this;
    const { options } = this.parent;
    const parentState = this.parent.state;
    const transform = this.parent.styles.transform;

    // calculate boundaries and overscrollX
    if (state.currentX > 0) {
      state.overscrollX = state.currentX;
    } else  if (state.width + state.currentX < parentState.width) {
      state.overscrollX = (state.width + state.currentX) - parentState.width;
    } else if (state.overscrollX) {
      delete state.overscrollX;
    }

    // calculate boundaries and overscrollY
    if (state.currentY > 0) {
      state.overscrollY = state.currentY;
    } else  if (state.height + state.currentY < parentState.height) {
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
      } else if(this.shadowLayer.style.opacity) {
        this.shadowLayer.style.opacity = 0;
      }
    }

    if (transform) {
      this.container.style[transform] = `translate3d(${state.x}px, ${state.y}px, 0px)`;
      return;
    }

    // respect old-fashioned browsers
    this.container.style.left = this.state.x;
    this.container.style.top = this.state.y;
  }

  calculateMomentum() {
    const { timeCapsule, state } = this;

    let first = timeCapsule[0];
    let last = timeCapsule[timeCapsule.length-1];
    let distance = last[2] -first[2];

    state.momentumX = (last[0]-first[0])/distance;
    state.momentumY = (last[1]-first[1])/distance;

    if (NODE_ENV === 'development') {
      this.momentumLayerX.style.transform = `scaleX(${this.state.momentumX/5})`;
      this.momentumLayerY.style.transform = `scaleY(${this.state.momentumY/5})`;
    }
  }

  overscrollReducer(value) {
    return value/3;
  }

  overscrollRebound() {
    var { state } = this;
    let time = 350;
    let totalFrames = Math.ceil(time/16); // 16ms per frame (60fps)
    let currentFrame = 0;

    let startX = state.currentX;
    let ammountX = -state.overscrollX;
    let startY = state.currentY;
    let ammountY = -state.overscrollY;

    
    const tick = () => {

      // currentFrame, startValue, endValue, totalFrames
      if (state.overscrollX) {
        console.log('animateX');
        state.currentX = inertia( null, currentFrame, startX, ammountX, totalFrames);
      }
      if (state.overscrollY) {
        console.log('animateY');
        state.currentY = inertia( null, currentFrame, startY, ammountY, totalFrames);
      }


      //console.log(currentFrame, state.currentX, state.currentY);

      this.renderPosition();

      currentFrame++;
      if (currentFrame < totalFrames && state.isAnimated) {
        read(tick);
      } else {
        state.isAnimated = false;
        delete state.overscrollY;
        delete state.overscrollX;
      }
    };

    state.isAnimated = true;
    read(tick);
  }

  subscribe() {
    this.processInteraction = this.processInteraction.bind(this);
    this.parent.attach('start move end', this.processInteraction);
  }

  unsubscribe() {
    this.parent.detach('start move end', this.processInteraction);
  }

  refresh() {
    this.state.width = this.container.offsetWidth;
    this.state.height = this.container.offsetHeight;

    if (NODE_ENV === 'development') {
      this.shadowLayer.style.width = this.state.width;
      this.shadowLayer.style.height = this.state.height;
    }
  }

  destroy() {
    this.unsubscribe();
  }
 }

export default RenderLayer;
