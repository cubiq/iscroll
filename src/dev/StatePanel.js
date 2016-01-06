'use strict';
import { write } from '../libs/fps.js';

export default (IscrollInstance) => {
  const stats = document.createElement('div');
  let oldstring, newstring;
  
  stats.style.position = 'fixed';
  stats.style.top = 0;
  stats.style.right = 0;
  stats.style.padding = 10;
  stats.style.background = 'red';
  document.body.appendChild(stats);
  
  function tick() {
    newstring = JSON.stringify(IscrollInstance.state, null, 4);
    if (oldstring !== newstring) {
      oldstring = newstring;
      stats.innerHTML = `<pre>${newstring}</pre>`;
    }
    write(tick);
  }
  write(tick);

};
