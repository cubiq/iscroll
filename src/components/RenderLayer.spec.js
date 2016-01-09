/*jshint -W030 */

// test invironment
import { expect, assert } from 'chai';
import { jsdom } from 'jsdom';

// virtual browser environment
global.window = jsdom().defaultView;
global.document = global.window.document;
global.NODE_ENV = 'production';

// module
var RenderLayer = require('./RenderLayer.js');

// environment
import EventEmitter from '../mixins/EventEmitter.js';

describe('EventProcessor.js', function() {
  // virtual iscroll instance
  const IscrollObj = {
    state: {
      width: 1000,
      height: 1000,
    },
    options:  {
      allowOverscroll: true,
      scrollY: true,
      scrollX: true,
      friction : 0.92,
    },
  };


  EventEmitter.extend(IscrollObj);
  EventEmitter.apply(IscrollObj);
  require('../iscroll.detects.js').default(IscrollObj);

  const LayerObj = new RenderLayer.default('demoLayer', document.createElement('div'), IscrollObj);

  // Set some init data, which can't be obtained w/o browser
  LayerObj.state.width = 3000;
  LayerObj.state.height = 3000;
  LayerObj.state.x = 0;
  LayerObj.state.y = 0;
  LayerObj.state.currentX = 0;
  LayerObj.state.currentY = 0;


  describe('Integration tests', function() {
    it('Assert integrated into parent object', function() {
      expect(IscrollObj.demoLayer).to.exists;
    });

    it('Assert state extended', function() {
      expect(IscrollObj.state.demoLayer).to.exists;
    });

    it('Assert element presents', function() {
      expect(LayerObj.container).to.exists;
    });
  });

  describe('Basic Pointer tests', function() {
    it('Is events processed', function() {
      IscrollObj.emit('start', point());

      assert.isNumber(LayerObj.state.lastX);
      assert.isNumber(LayerObj.state.lastY);
      assert.isNumber(LayerObj.state.currentX);
      assert.isNumber(LayerObj.state.currentY);
    });

    it('Distance is calculating', function() {
      IscrollObj.emit('move', point(20, 20, 1, 'move'));

      assert.isNumber(LayerObj.state.lastX);
      assert.isNumber(LayerObj.state.lastY);
      assert.isNumber(LayerObj.state.currentX);
      assert.isNumber(LayerObj.state.currentY);
    });

    it('Overscroll is calculating', function() {
      IscrollObj.emit('move', point(30, 35, 2, 'move'));

      assert.equal(LayerObj.state.overscrollX, 30);
      assert.equal(LayerObj.state.overscrollY, 35);
    });

    it('Velocity is calculating', function() {
      IscrollObj.emit('end', point(30, 35, 2, 'end'));
      IscrollObj.emit('end',  point(0, 0, 0, 'start'));
      IscrollObj.emit('move', point(30, 35, 1, 'move'));
      IscrollObj.emit('move', point(90, 90, 2, 'move'));
      IscrollObj.emit('move', point(140, 140, 3, 'move'));
      IscrollObj.emit('move', point(200, 200, 4, 'move'));
      IscrollObj.emit('move', point(250, 250, 5, 'move'));
      IscrollObj.emit('move', point(330, 330, 6, 'move'));
      IscrollObj.emit('move', point(600, 600, 7, 'move'));
      IscrollObj.emit('end',  point(600, 600, 7, 'end'));

      assert.isNumber(LayerObj.state.velocityX);
      assert.isNumber(LayerObj.state.velocityY);
    });

    it('Is animation start after interaction ends', function() {
      assert.equal(LayerObj.state.isAnimated, true);
    });

    it('Is animation breaked down on start interaction', function() {
      IscrollObj.emit('end',  point(0, 0, 0, 'start'));

      assert.equal(LayerObj.state.isAnimated, false);
    });
  });
});

function point(x = 1, y = 1, frames = 1, phase = 'start') {


  let frame = {
    id: '0',
    phase: phase,
    initiated: true,
    x: 430 + x,
    y: 297 + y,
    startX: 430,
    startY: 297,
    deltaX: 0 + (x - (x/frames)) || 0,
    deltaY: 0 + (x - (x/frames)) || 0,
    distanceX : -x,
    distanceY : -y,
    startTime: 100000000000,
    currentTime: 100000000000 + 16*frames,
  };
  return frame;
}
