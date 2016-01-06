/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _requestAnimationFrame = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Iscroll = function Iscroll(element, opts) {
	  _classCallCheck(this, Iscroll);
	
	  alert(2);
	  console.log('wtf');
	  (0, _requestAnimationFrame.requestAnimationFrame)(function () {
	    alert(3);
	  });
	};
	
	Iscroll();

/***/ },
/* 1 */
/***/ function(module, exports) {

	// snatched from paulirish's RAF
	// https://gist.github.com/paulirish/1579671
	'use strict';
	
	/*jshint -W020 */ // ignore readonly
	/*jshint -W079 */ // ignore redifinition
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var requestAnimationFrame = window.requestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame;
	/*jshint +W079 */
	
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
	  exports.
	  /*jshint +W020 */
	
	  requestAnimationFrame = requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	  exports.cancelAnimationFrame = cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	
	if (!requestAnimationFrame) {
	  exports.requestAnimationFrame = requestAnimationFrame = function (callback) {
	    var currTime = new Date().getTime();
	    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	    var id = setTimeout(function () {
	      callback(currTime + timeToCall);
	    }, timeToCall);
	
	    lastTime = currTime + timeToCall;
	    return id;
	  };
	}
	
	if (!cancelAnimationFrame) {
	  exports.cancelAnimationFrame = cancelAnimationFrame = function (id) {
	    clearTimeout(id);
	  };
	}exports.requestAnimationFrame = requestAnimationFrame;
	exports.cancelAnimationFrame = cancelAnimationFrame;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWUyMDY1MGE2MjExZTM3MjRkN2YiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7S0NuQ00sT0FBTyxHQUNYLFNBREksT0FBTyxDQUNDLE9BQU8sRUFBRSxJQUFJLEVBQUU7eUJBRHZCLE9BQU87O0FBRVQsUUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1QsVUFBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuQiw4QkFOSyxxQkFBcUIsRUFNSixZQUFVO0FBQzlCLFVBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7RUFDSDs7QUFHSCxRQUFPLEVBQUUsQzs7Ozs7Ozs7QUNYVCxhQUFZOzs7O0FBQUM7Ozs7QUFJYixLQUFJLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztBQUN6RCxLQUFJLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxvQkFBb0I7OztBQUd0RCxLQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDakIsS0FBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMzQyxNQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQ2pFOzs7QUF1QkEsd0JBQXFCLEdBdkJyQixxQkFBcUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLENBQUM7QUFDckUsV0F1QkEsb0JBQW9CLEdBdkJwQixvQkFBb0IsR0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLHNCQUFzQixDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyw2QkFBNkIsQ0FBQyxDQUFDO0VBQzNIOztBQUVELEtBQUksQ0FBQyxxQkFBcUIsRUFBRTtBQUMxQixXQWtCQSxxQkFBcUIsR0FsQnJCLHFCQUFxQixHQUFHLFVBQVMsUUFBUSxFQUFFO0FBQ3pDLFNBQUksUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDcEMsU0FBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3pELFNBQUksRUFBRSxHQUFHLFVBQVUsQ0FBQyxZQUFXO0FBQUUsZUFBUSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQztNQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRWpGLGFBQVEsR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ2pDLFlBQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztFQUNIOztBQUVELEtBQUksQ0FBQyxvQkFBb0IsRUFBRTtBQUN6QixXQVFBLG9CQUFvQixHQVJwQixvQkFBb0IsR0FBRyxVQUFTLEVBQUUsRUFBRTtBQUNsQyxpQkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7RUFDSCxRQUlDLHFCQUFxQixHQUFyQixxQkFBcUI7U0FDckIsb0JBQW9CLEdBQXBCLG9CQUFvQixDIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMWUyMDY1MGE2MjExZTM3MjRkN2ZcbiAqKi8iLCJcbmltcG9ydCB7IHJlcXVlc3RBbmltYXRpb25GcmFtZSwgY2FuY2VsQW5pbWF0aW9uRnJhbWUgfSBmcm9tICcuL2xpYnMvcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmpzJztcblxuY2xhc3MgSXNjcm9sbCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdHMpIHtcbiAgICBhbGVydCgyKTtcbiAgICBjb25zb2xlLmxvZygnd3RmJyk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7XG4gICAgICBhbGVydCgzKTtcbiAgICB9KVxuICB9XG59XG5cbklzY3JvbGwoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiLy8gc25hdGNoZWQgZnJvbSBwYXVsaXJpc2gncyBSQUZcbi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC8xNTc5NjcxXG4ndXNlIHN0cmljdCc7XG5cbi8qanNoaW50IC1XMDIwICovICAvLyBpZ25vcmUgcmVhZG9ubHlcbi8qanNoaW50IC1XMDc5ICovIC8vIGlnbm9yZSByZWRpZmluaXRpb25cbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xudmFyIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lO1xuLypqc2hpbnQgK1cwNzkgKi9cblxudmFyIGxhc3RUaW1lID0gMDtcbnZhciB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXTtcbmZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICBjYW5jZWxBbmltYXRpb25GcmFtZSAgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xufVxuXG5pZiAoIXJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgIHZhciBpZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sIHRpbWVUb0NhbGwpO1xuXG4gICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgcmV0dXJuIGlkO1xuICB9O1xufVxuXG5pZiAoIWNhbmNlbEFuaW1hdGlvbkZyYW1lKSB7XG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oaWQpIHtcbiAgICBjbGVhclRpbWVvdXQoaWQpO1xuICB9O1xufVxuLypqc2hpbnQgK1cwMjAgKi9cblxuZXhwb3J0IHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLFxuICBjYW5jZWxBbmltYXRpb25GcmFtZVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGlicy9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9