'use strict';

const vendors = ['ms', 'moz', 'webkit', 'o'];

let request = window.requestAnimationFrame;
let cancel = window.cancelAnimationFrame;

let lastTime = 0;
let readers = [];
let writers = [];
for (let x = 0; x < vendors.length && !request; ++x) {
  request = window[vendors[x] + 'RequestAnimationFrame'];
  cancel  = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!request) {
  request = function(callback) {
    let currTime = new Date().getTime();
    let timeToCall = Math.max(0, 16 - (currTime - lastTime));
    let id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);

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
  let raf;

  return function requestAnimationFrameThrottler() {
    const args = arguments;
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
  let read = readers;
  readers = [];
  read.forEach(t => t());

  let write = writers;
  writers = [];
  write.forEach(t => t());

  request(loop, 'loop set');
};

request(loop, 'loop set');

export { request, cancel, read, write, throttle };
