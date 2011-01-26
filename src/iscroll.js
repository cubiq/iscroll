/**
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Copyright (c) 2010 Matteo Spinelli, http://cubiq.org/
 * Released under MIT license
 * http://cubiq.org/dropbox/mit-license.txt
 * 
 * Version 4.0 dev.rel. - Last updated: 2011.01.26
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 */

(function(){

function iScroll (el, options) {
	var that = this, doc = document, div, i;

	that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
	that.scroller = that.wrapper.children[0];
	that.scroller.style.cssText += '-webkit-transition-property:-webkit-transform;-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-webkit-transition-duration:0;-webkit-transform-origin:0 0;-webkit-transform:' + trnOpen + '0,0' + trnClose;

	that.options = {
		hScroll: true,
		vScroll: true,
		bounce: has3d,
		momentum: has3d,
		lockDirection: true,
		zoom: false,
		hScrollbar: true,
		vScrollbar: true,
		fixedScrollbar: !isIDevice || !hasTouch,
		fadeScrollbar: isIDevice && has3d,
		hideScrollbar: isIDevice,
		scrollbarClass: '',
	};

	// User defined options
	for (i in options) {
		that.options[i] = options[i];
	}
	
	that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
	that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;

	that.refresh();

	that.bind(ORIENT_EV, window);
	that.bind(START_EV);
	
	if (hasGesture && that.options.zoom) {
		that.bind('gesturestart');
		that.scroller.style.webkitTransform = that.scroller.style.webkitTransform + ' scale(1)';
	}
}

iScroll.prototype = {
	x: 0, y: 0,
	scale: 1,
	
	handleEvent: function (e) {
		var that = this;
		
		switch(e.type) {
			case START_EV:
				that._start(e);
				break;
			case MOVE_EV:
				that._move(e);
				break;
			case END_EV:
			case CANCEL_EV:
				that._end(e);
				break;
			case 'webkitTransitionEnd':
				that._transitionEnd(e);
				break;
			case ORIENT_EV:
				that._orientChange();
				break;
			case 'gesturestart':
				that._gestStart(e);
				break;
			case 'gesturechange':
				that._gestChange(e);
				break;
			case 'gestureend':
			case 'gesturecancel':
				that._gestEnd(e);
				break;
		}
	},

	refresh: function () {
		var that = this;
		
		that.wrapperW = that.wrapper.clientWidth;
		that.wrapperH = that.wrapper.clientHeight;
		that.scrollerW = round(that.scroller.offsetWidth * that.scale);
		that.scrollerH = round(that.scroller.offsetHeight * that.scale);
		that.maxScrollX = that.wrapperW - that.scrollerW;
		that.maxScrollY = that.wrapperH - that.scrollerH;
		that.dirX = 0;
		that.dirY = 0;
		
		that._transitionTime(0);

		that.hScroll = that.options.hScroll && that.maxScrollX < 0;
		that.vScroll = that.options.vScroll && that.maxScrollY < 0;
		that.hScrollbar = that.hScroll && that.options.hScrollbar;
		that.vScrollbar = that.vScroll && that.options.vScrollbar;

		// Prepare the scrollbars
		that._scrollbar('h');
		that._scrollbar('v');

		that._resetPos();
	},
	
	_scrollbar: function (dir) {
		var that = this,
			doc = document,
			bar;

		if (!that[dir + 'Scrollbar']) {
			if (that[dir + 'ScrollbarWrapper']) {
				that[dir + 'ScrollbarIndicator'].style.webkitTransform = '';	// Should free some mem
				that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
				that[dir + 'ScrollbarWrapper'] = null;
				that[dir + 'ScrollbarIndicator'] = null;
			}

			return;
		}

		if (!that[dir + 'ScrollbarWrapper']) {
			// Create the scrollbar wrapper
			bar = doc.createElement('div');
			if (that.options.scrollbarClass) {
				bar.className = that.options.scrollbarClass;
			} else {
				bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:7px' : 'width:7px;bottom:7px;top:2px;right:1px');
			}
			bar.style.cssText += 'pointer-events:none;-webkit-transition-property:opacity;-webkit-transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');

			that.wrapper.appendChild(bar);
			that[dir + 'ScrollbarWrapper'] = bar;

			// Create the scrollbar indicator
			bar = doc.createElement('div');
			if (that.options.scrollbarClass) {
				bar.className = that.options.scrollbarClass;
			} else {
				bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-webkit-background-clip:padding-box;-webkit-box-sizing:border-box;' + (dir == 'h' ? 'height:100%;-webkit-border-radius:4px 3px;' : 'width:100%;-webkit-border-radius:3px 4px;');
			}
			bar.style.cssText += 'pointer-events:none;-webkit-transition-property:-webkit-transform;-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-webkit-transition-duration:0;-webkit-transform:' + trnOpen + '0,0' + trnClose;

			that[dir + 'ScrollbarWrapper'].appendChild(bar);
			that[dir + 'ScrollbarIndicator'] = bar;
		}

		if (dir == 'h') {
			that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
			that.hScrollbarIndicatorSize = max(round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
			that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
			that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
			that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
		} else {
			that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
			that.vScrollbarIndicatorSize = max(round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
			that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
			that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
			that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
		}

		// Reset position
		that._indicatorPos(dir);
	},
	
	_orientChange: function () {
		var that = this;

		if (that.options.momentum) that.unbind('webkitTransitionEnd');

		setTimeout(function () {
			that.refresh();
		}, 0);
	},
	
	_pos: function (x, y) {
		var that = this;

		that.x = that.hScroll ? x : 0;
		that.y = that.vScroll ? y : 0;
		
		that.scroller.style.webkitTransform = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + that.scale + ')';
		
		that._indicatorPos('h');
		that._indicatorPos('v');
	},
	
	_indicatorPos: function (dir) {
		var that = this,
			pos = dir == 'h' ? that.x : that.y;
		
		if (!that[dir + 'Scrollbar']) return;
		
		pos = that[dir + 'ScrollbarProp'] * pos;
	
		if (pos < 0) {
			pos = that.options.fixedScrollbar ? 0 : pos + pos*3;
			if (that[dir + 'ScrollbarIndicatorSize'] + pos < 9) pos = -that[dir + 'ScrollbarIndicatorSize'] + 8;
		} else if (pos > that[dir + 'ScrollbarMaxScroll']) {
			pos = that.options.fixedScrollbar ? that[dir + 'ScrollbarMaxScroll'] : pos + (pos - that[dir + 'ScrollbarMaxScroll'])*3;
			if (that[dir + 'ScrollbarIndicatorSize'] + that[dir + 'ScrollbarMaxScroll'] - pos < 9) pos = that[dir + 'ScrollbarIndicatorSize'] + that[dir + 'ScrollbarMaxScroll'] - 8;
		}
		that[dir + 'ScrollbarWrapper'].style.webkitTransitionDelay = '0';
		that[dir + 'ScrollbarWrapper'].style.opacity = '1';
		that[dir + 'ScrollbarIndicator'].style.webkitTransform = trnOpen + (dir == 'h' ? pos + 'px,0' : '0,' + pos + 'px') + trnClose;
	},
	
	_transitionTime: function (time) {
		var that = this;
		
		time += 'ms';
		that.scroller.style.webkitTransitionDuration = time;

		if (that.hScrollbar) that.hScrollbarIndicator.style.webkitTransitionDuration = time;
		if (that.vScrollbar) that.vScrollbarIndicator.style.webkitTransitionDuration = time;
	},
	
	_start: function (e) {
		var that = this,
			point = hasTouch ? e.changedTouches[0] : e,
			offsetLeft = offsetTop = 0, el,
			matrix;

		that.moved = false;

		e.preventDefault();

		if (e.touches.length == 2 && that.options.zoom && hasGesture) {
			// As object position might change over time, we calculate the offset each time (overkill?)
			el = that.wrapper;
			do {
				offsetLeft += el.offsetLeft;
				offsetTop += el.offsetTop;
			} while (el = el.offsetParent);

			that.originX = abs(e.touches[0].pageX + e.touches[1].pageX - offsetLeft*2) / 2 - that.x;
			that.originY = abs(e.touches[0].pageY + e.touches[1].pageY - offsetTop*2) / 2 - that.y;
			return;
		}

		that.moved = false;
		that.distX = 0;
		that.distY = 0;
		that.absDistX = 0;
		that.absDistY = 0;
		that.dirX = 0;
		that.dirY = 0;
		that.returnTime = 0;
//		that.scroller.style.webkitTransitionTimingFunction = 'cubic-bezier(0,0,0,1)';
//		that.scroller.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33, 0.66, 0.66, 1)';
		
		that._transitionTime(0);
		
		if (that.options.momentum) {
			matrix = new WebKitCSSMatrix(window.getComputedStyle(that.scroller, null).webkitTransform);
			if (matrix.e != that.x || matrix.f != that.y) {
				that.unbind('webkitTransitionEnd');
				that._pos(matrix.e, matrix.f);
			}
		}

		that.startX = that.x;
		that.startY = that.y;
		that.pointX = point.pageX;
		that.pointY = point.pageY;
		
		that.startTime = e.timeStamp;

		// Registering/unregistering of events is done to preserve resources on Android
//		that.unbind(START_EV);
		that.bind(MOVE_EV);
		that.bind(END_EV);
		that.bind(CANCEL_EV);
	},
	
	_move: function (e) {
		if (e.touches.length > 1) return;

		var that = this,
			point = hasTouch ? e.changedTouches[0] : e,
			deltaX = point.pageX - that.pointX,
			deltaY = point.pageY - that.pointY,
			newX = that.x + deltaX,
			newY = that.y + deltaY;

		e.preventDefault();

		that.pointX = point.pageX;
		that.pointY = point.pageY;

		// Slow down if outside of the boundaries
		if (newX > 0 || newX < that.maxScrollX) {
			newX = that.options.bounce ? that.x + round(deltaX / 2.5) : newX > 0 ? 0 : that.maxScrollX;
		}
		if (newY > 0 || newY < that.maxScrollY) { 
			newY = that.options.bounce ? that.y + round(deltaY / 2.5) : newY > 0 ? 0 : that.maxScrollY;
		}

		if (that.absDistX < 4 && that.absDistY < 4) {
			that.distX += deltaX;
			that.distY += deltaY;
			that.absDistX = abs(that.distX);
			that.absDistY = abs(that.distY);
			return;
		}
		
		// Lock direction
		if (that.options.lockDirection) {
			if (that.absDistX > that.absDistY+3) {
				newY = that.y;
				deltaY = 0;
			} else if (that.absDistY > that.absDistX+3) {
				newX = that.x;
				deltaX = 0;
			}
		}
		
		that.moved = true;
		that._pos(newX, newY);
		that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if (e.timeStamp - that.startTime > 300) {
			that.startTime = e.timeStamp;
			that.startX = that.x;
			that.startY = that.y;
		}
	},
	
	_end: function (e) {
		if (e.touches.length != 0) return;

		var that = this,
			point = hasTouch ? e.changedTouches[0] : e,
			target, ev,
			momentumX = momentumY = { dist:0, time:0 },
			duration = e.timeStamp - that.startTime,
			newPosX = that.x, newPosY = that.y,
			newDuration;

//		that.bind(START_EV);
		that.unbind(MOVE_EV);
		that.unbind(END_EV);
		that.unbind(CANCEL_EV);

		if (!that.moved) {
			if (hasTouch) {
				// Find the last touched element
				target = point.target;
				while (target.nodeType != 1) {
					target = target.parentNode;
				}

				ev = document.createEvent('MouseEvents');
				ev.initMouseEvent('click', true, true, e.view, 1,
					point.screenX, point.screenY, point.clientX, point.clientY,
					e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
					0, null);
				ev._fake = true;
				target.dispatchEvent(ev);
				target.focus();
			}

			that._resetPos();
			return;
		}
		
		if (duration < 300 && that.options.momentum) {
			momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
			momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, that.scrollerH - that.wrapperH + that.y, that.options.bounce ? that.wrapperH : 0) : momentumY;
		}

		if (momentumX.dist || momentumY.dist) {
			newPosX = that.x + momentumX.dist;
			newPosY = that.y + momentumY.dist;
			newDuration = max(max(momentumX.time, momentumY.time), 10);		// Minimum duration 10ms
			that.bind('webkitTransitionEnd');
			that.scrollTo(newPosX, newPosY, newDuration);
		} else {
			that._resetPos(200);
		}
	},
	
	_resetPos: function (time) {
		var that = this,
			resetX = that.x,
			resetY = that.y;
		
		if (that.x > 0) resetX = 0;
		else if (that.x < that.maxScrollX) resetX = that.maxScrollX;

		if (that.y > 0) resetY = 0;
		else if (that.y < that.maxScrollY) resetY = that.maxScrollY;

		if (resetX == that.x && resetY == that.y) {
			if (that.hScrollbar && that.options.hideScrollbar) {
				that.hScrollbarWrapper.style.webkitTransitionDelay = '300ms';
				that.hScrollbarWrapper.style.opacity = '0';
			}
			if (that.vScrollbar && that.options.hideScrollbar) {
				that.vScrollbarWrapper.style.webkitTransitionDelay = '300ms';
				that.vScrollbarWrapper.style.opacity = '0';
			}
		
			return;
		}

		that.bind('webkitTransitionEnd');
		that.scrollTo(resetX, resetY, time || 0);
	},
	
	_momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
		var that = this,
			deceleration = 0.0006,
			speed = abs(dist) / time,
			newDist = (speed * speed) / (2 * deceleration),
			newTime = outsideDist = 0;

		// Proportinally reduce speed if we are outside of the boundaries 
		if (dist > 0 && newDist > maxDistUpper) {
			that.scroller.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.66,0.88,1)';		// Subtle change of scroller motion
			outsideDist = (size / (6 / (newDist / speed * deceleration)));
			maxDistUpper = maxDistUpper + outsideDist;
			that.returnTime = 800 / size * outsideDist + 100;
			speed = speed * maxDistUpper / newDist;
			newDist = maxDistUpper;
		} else if (dist < 0 && newDist > maxDistLower) {
			that.scroller.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.66,0.88,1)';		// Subtle change of scroller motion
			outsideDist = (size / (6 / (newDist / speed * deceleration)));
			maxDistLower = maxDistLower + outsideDist;
			that.returnTime = 800 / size * outsideDist + 100;
			speed = speed * maxDistLower / newDist;
			newDist = maxDistLower;
		} else {
			that.scroller.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33, 0.66, 0.66, 1)';
		}

		newDist = newDist * (dist < 0 ? -1 : 1);
		newTime = speed / deceleration;

		return { dist: round(newDist), time: round(newTime) };
	},
	
	_transitionEnd: function (e) {
		var that = this;

		that.unbind('webkitTransitionEnd');
		that._resetPos(that.returnTime);
		that.returnTime = 0;
	},
	
	_gestStart: function (e) {
		var that = this;

		that._transitionTime(0);

		that.unbind('gesturestart');
		that.bind('gesturechange');
		that.bind('gestureend');
		that.bind('gesturecancel');
	},

	_gestChange: function (e) {
		var that = this,
			scale = min(4, max(1, that.scale * e.scale)),
			x, y;

		if (scale > 1 && scale < 4) {
			x = that.originX - that.originX * e.scale + that.x;
			y = that.originY - that.originY * e.scale + that.y;
			that.scroller.style.webkitTransform = trnOpen + x + 'px,' + y + 'px' + trnClose + ' scale(' + scale + ')';
		}
	},

	_gestEnd: function (e) {
		var that = this;

		that.scale = min(4, max(1, that.scale * e.scale));
		that.x = that.originX - round(that.originX * e.scale) + that.x;
		that.y = that.originY - round(that.originY * e.scale) + that.y;

		that.refresh();

		that.bind('gesturestart')
		that.unbind('gesturechange');
		that.unbind('gestureend');
		that.unbind('gesturecancel');
	},

	scrollTo: function (x, y, time) {
		var that = this;
		
		that._transitionTime(time);
		that._pos(x, y);
	},
	
	destroy: function () {
		that.scroller.style.webkitTransform = '';

		that.unbind('webkitTransitionEnd');
		that.unbind(ORIENT_EV);
		that.unbind(START_EV);
		that.unbind(MOVE_EV);
		that.unbind(END_EV);
		that.unbind(CANCEL_EV);
		that.unbind('gesturestart')
		that.unbind('gesturechange');
		that.unbind('gestureend');
		that.unbind('gesturecancel');
	},
	
	bind: function (type, el) {
		(el || this.scroller).addEventListener(type, this, false);
	},
	
	unbind: function (type, el) {
		(el || this.scroller).removeEventListener(type, this, false);
	},
};


var has3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),
	hasTouch = 'ontouchstart' in window,
	hasGesture = 'ongesturestart' in window,
	isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
	isAndroid = (/android/gi).test(navigator.appVersion),
	ORIENT_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	START_EV = hasTouch ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	END_EV = hasTouch ? 'touchend' : 'mouseup',
	CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
	trnOpen = 'translate' + (has3d ? '3d(' : '('),
	trnClose = has3d ? ',0)' : ')',
	abs = Math.abs, round = Math.round, min = Math.min, max = Math.max;

window.iScroll = iScroll;
})();
