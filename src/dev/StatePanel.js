'use strict';
import { write } from '../libs/fps.js';

const ksort = function ( src ) {
  var keys = Object.keys( src ),
      target = {};
  keys.sort();
  keys.forEach(function ( key ) {
    target[ key ] = src[ key ];
  });
  return target;
};

export default (IscrollInstance) => {
  const stats = document.createElement('div');
  let oldstring, newstring;
  stats.style.position = 'fixed';
  stats.style.top = 0;
  stats.style.right = 0;
  stats.style.padding = 10;
  stats.style.background = 'red';
  IscrollInstance.container.appendChild(stats);
  
  function tick() {
    var obj = Object.assign({}, IscrollInstance.state);
    delete obj.POINTS;
    obj.viewLayer = ksort(obj.viewLayer);
    
    newstring = JSON.stringify(obj, null, 4);

    if (oldstring !== newstring) {
      oldstring = newstring;
      stats.innerHTML = `<pre style="width:360px">${newstring}</pre>`;
    }
    write(tick);
  }
  write(tick);

};
