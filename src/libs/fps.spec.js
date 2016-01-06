var assert = require('chai').assert;
var should = require('chai').should();

/* fallback for raf */
global.window = global;
var rafCallbacks = [];
global.requestAnimationFrame = function(callback) {
  return rafCallbacks.push(callback);
};

global.cancelAnimationFrame = function(index) {
  rafCallbacks.splice(index - 1);
};
/* ///////////////// */

var fps = require('./fps.js');

var nextFrame = function() {
  var callbacks = rafCallbacks;
  rafCallbacks = [];
  for (var i in callbacks) {
    callbacks[i]();
  }

};

describe('Unit test of fps.js', function() {

  describe('fps.request', function() {

    it('fps.request exists ', function() {
      should.exist(fps.request);
    });

    it('fps.request should works properly', function() {
      var works = false;
      fps.request(function() {
        works = true;
      });

      assert.equal(works, false);
      nextFrame();
      assert.equal(works, true);
    });

    it('fps.request should returns id', function() {
      var works = false;
      var id = fps.request(function() {
        works = true;
      });

      should.exist(id);
      nextFrame();
    });

    it('fps.request should cancel', function() {
      var works = false;
      fps.request(function() {});

      fps.request(function() {});

      var id = fps.request(function() {
        works = true;
      });

      fps.cancel(id);
      nextFrame();
      assert.equal(works, false);
    });
  });

  describe('fps.read', function() {

    it('fps.read exists', function() {
      should.exist(fps.read);
    });

    it('fps.read should works', function() {
      var works = false;
      should.exist(fps.read);
      fps.read(function() {
        works = true;
      });

      assert.equal(works, false);
      nextFrame();
      assert.equal(works, true);
    });
  });

  describe('fps.write', function() {

    it('fps.write exists', function() {
      should.exist(fps.write);
    });

    it('fps.write should works', function() {
      var works = false;
      should.exist(fps.read);
      fps.write(function() {
        works = true;
      });

      assert.equal(works, false);
      nextFrame();
      assert.equal(works, true);
    });

    it('read/write should work one by one', function() {
      var a = [];

      fps.write(function() {
        a.push('1w');
      });

      fps.read(function() {
        a.push('1r');
        fps.write(function() {
          a.push('3w');
        });
      });

      fps.read(function() {
        a.push('2r');
      });

      fps.read(function() {
        a.push('3r');
      });

      fps.write(function() {
        a.push('2w');
      });

      nextFrame();
      assert.equal(a.join(), ['1r', '2r', '3r', '1w', '2w', '3w'].join());
    });
  });

  describe('fps.throttle', function() {

    it('fps.throttle exists', function() {
      should.exist(fps.throttle);
    });

    it('fps.throttle keeps arguments', function() {
      var throttler = fps.throttle(function(one, two, three) {
        assert.equal(one, 'one');
        assert.equal(two, 'two');
        assert.equal(three, 'three');
      });

      throttler('one', 'two', 'three');
      nextFrame();
    });

    it('fps.throttle works', function() {
      var value = 0;
      var count = 0;

      var throttler = fps.throttle(function(v) {
        value = v;
        count++;
      });

      throttler(1);
      nextFrame();
      assert.equal(value, 1);

      throttler(2);
      throttler(3);
      nextFrame();
      assert.equal(value, 3);

      throttler(4);
      throttler(5);
      throttler(6);
      throttler(7);
      nextFrame();
      assert.equal(value, 7);
    });
  });
});
