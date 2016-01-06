'use strict';

var request = window.requestAnimationFrame;
var cancel = window.cancelAnimationFrame;

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
var readers = [];
var writers = [];
for (var x = 0; x < vendors.length && !request; ++x) {
  request = window[vendors[x] + 'RequestAnimationFrame'];
  cancel  = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!request) {
  request = function(callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);

    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!cancel) {
  cancel = function(id) {
    clearTimeout(id);
  };
}

const read = (fn) => {
  readers.push(fn);
};

const write = (fn) => {
  writers.push(fn);
};

const throttle = (fn) => {
  var raf;

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

const loop = () => {
  var read = readers;
  readers = [];
  read.forEach(t => t());

  var write = writers;
  writers = [];
  write.forEach(t => t());

  request(loop, 'loop set');
};

request(loop, 'loop set');

export { request, cancel, read, write, throttle };
