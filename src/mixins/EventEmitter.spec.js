/*jshint -W030 */
import { should, expect, assert } from 'chai';
var jsdom = require('jsdom').jsdom;
var win = jsdom().defaultView; // virtual window

import EventEmitter from './EventEmitter.js';

describe('EventEmitter.js', function() {
  var Obj = {};
  EventEmitter.extend(Obj);
  EventEmitter.apply(Obj);
  
  Obj.container = win.document.createElement("div"); // imitate

  var element = win.document.createElement("div");
  var events = Obj._customEvents;

  var triggers = {
    container: 0,
    custom: 0
  };
  var calls = {
    click: 0,
    tap: 0
  };

  var containerClick = function(){ triggers.container++; };
  var elementClick = function(){ triggers.custom++; };
  let customClick = function() { calls.click++; };
  let customTap = function() { calls.tap++; };

  describe('Interface exists', function() {
    it('emit exists', function() {
      should().exist(Obj.emit);
    });

    it('attach exists', function() {
      should().exist(Obj.attach);
    });

    it('detach exists', function() {
      should().exist(Obj.detach);
    });

    it('on exists', function() {
      should().exist(Obj.on);
    });

    it('off exists', function() {
      should().exist(Obj.off);
    });
  });

  describe('Custom events attach', function() {

    it('Single attach', function() {
      expect(events.click).to.not.exists;

      Obj.attach('click', customClick);

      expect(events.click).to.exists;
      expect(events.click).to.be.a('array');
      assert.equal(events.click.length, 1);
    });

    it('Multiple attach', function() {
      expect(events.tap).to.not.exists;

      Obj.attach({
        click: customClick,
        tap: customTap,
      });

      expect(events.tap).to.exists;
      expect(events.tap).to.be.a('array');
      assert.equal(events.tap.length, 1);
      assert.equal(events.click.length, 2);
    });
  });

  describe('Custom events emmit', function() {

    it('Single emmit', function() {
      Obj.emit('tap');
      assert.equal(calls.tap, 1);
    });

    it('Multiple emmit', function() {
      Obj.emit('click');
      assert.equal(calls.click, 2);
    });
  });

  describe('Custom events detach', function() {

    it('Single detach', function() {
      expect(events.click).to.exists;
      Obj.detach('click', customClick);
      expect(events.click).to.not.exists;
    });

    it('Multiple detach', function() {
      Obj.attach('click', customClick);
      expect(events.click).to.exists;
      expect(events.tap).to.exists;

      Obj.detach({
        click: customClick,
        tap: customTap,
      });

      expect(events.click).not.exists;
      expect(events.tap).not.exists;
    });
  });

  describe('Custom events attachOnce', function() {

    it('attachOnce', function() {
      Obj.attachOnce('click', customClick);
      expect(events.click).to.exists;
      Obj.emit('click');
      expect(events.click).to.not.exists;
    });
  });

  describe('DOM events subscribe', function() {
    it('Subscribe to default element', function() {
      Obj.on('click', false, containerClick);
    });

    it('Subscribe to custom element', function() {
      Obj.on('click', element, elementClick);
    });
  });

  describe('DOM events triggers', function() {
    it('Trigger events on default element', function() {
      var clickevent=win.document.createEvent("MouseEvents");
      clickevent.initEvent('click', true, true);
      Obj.container.dispatchEvent(clickevent);
      assert.equal(triggers.container, 1);
    });

    it('Trigger events on custom element', function() {
      var clickevent=win.document.createEvent("MouseEvents");
      clickevent.initEvent('click', true, true);
      element.dispatchEvent(clickevent);
      assert.equal(triggers.custom, 1); 
    });
  });

  describe('DOM events unsubscribe', function() {
    it('Unsubscribe to default element', function() {
      Obj.off('click', false, containerClick);
    });

    it('Unsubscribe to custom element', function() {
      Obj.off('click', element, elementClick);
    });
  });

  describe('DOM events, remove handlers', function() {
    it('Trigger events on default element', function() {
      var clickevent=win.document.createEvent("MouseEvents");
      clickevent.initEvent('click', true, true);
      Obj.container.dispatchEvent(clickevent);
      Obj.container.dispatchEvent(clickevent);
      Obj.container.dispatchEvent(clickevent);
      assert.equal(triggers.container, 1);
    });

    it('Trigger events on custom element', function() {
      var clickevent=win.document.createEvent("MouseEvents");
      clickevent.initEvent('click', true, true);
      element.dispatchEvent(clickevent);
      element.dispatchEvent(clickevent);
      element.dispatchEvent(clickevent);
      assert.equal(triggers.custom, 1); 
    });
  });
});
