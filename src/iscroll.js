/**
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * iScroll v4.0 Beta 4
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Copyright (c) 2010 Matteo Spinelli, http://cubiq.org/
 * Released under MIT license
 * http://cubiq.org/dropbox/mit-license.txt
 * 
 * Last updated: 2011.03.10
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 */

(function(){
function iScroll (el, options) {
	var that = this, doc = document, div, i;

	that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
	that.wrapper.style.overflow = 'hidden';
	that.scroller = that.wrapper.children[0];

	// Default options
	that.options = {
		HWTransition: true,		// Experimental, internal use only
		HWCompositing: true,	// Experimental, internal use only
		hScroll: true,
		vScroll: true,
		hScrollbar: true,
		vScrollbar: true,
		fixedScrollbar: isAndroid,
		fadeScrollbar: (isIDevice && has3d) || !hasTouch,
		hideScrollbar: isIDevice || !hasTouch,
		scrollbarClass: '',
		bounce: has3d,
		bounceLock: false,
		momentum: has3d,
		lockDirection: true,
		zoom: false,
		zoomMin: 1,
		zoomMax: 4,
		snap: false,
		pullToRefresh: false,
		pullDownLabel: ['Pull down to refresh...', 'Release to refresh...', 'Loading...'],
		pullUpLabel: ['Pull up to refresh...', 'Release to refresh...', 'Loading...'],
		onPullDown: function () {},
		onPullUp: function () {},
		onScrollStart: null,
		onScrollEnd: null,
		onZoomStart: null,
		onZoomEnd: null,
		checkDOMChange: false		// Experimental
	};

	// User defined options
	for (i in options) {
		that.options[i] = options[i];
	}

	that.options.HWCompositing = that.options.HWCompositing && hasCompositing;
	that.options.HWTransition = that.options.HWTransition && hasCompositing;

	if (that.options.HWCompositing) {
		that.scroller.style.cssText += '-webkit-transition-property:-webkit-transform;-webkit-transform-origin:0 0;-webkit-transform:' + trnOpen + '0,0' + trnClose;
	} else {
		that.scroller.style.cssText += '-webkit-transition-property:top,left;-webkit-transform-origin:0 0;top:0;left:0';
	}

	if (that.options.HWTransition) {
		that.scroller.style.cssText += '-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-webkit-transition-duration:0;';
	}

	that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
	that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
	
	that.pullDownToRefresh = that.options.pullToRefresh == 'down' || that.options.pullToRefresh == 'both';
	that.pullUpToRefresh = that.options.pullToRefresh == 'up' || that.options.pullToRefresh == 'both';
	
	if (that.pullDownToRefresh) {
		div = doc.createElement('div');
		div.className = 'iScrollPullDown';
		div.innerHTML = '<span class="iScrollPullDownIcon"></span><span class="iScrollPullDownLabel">' + that.options.pullDownLabel[0] + '</span>\n';
		that.scroller.insertBefore(div, that.scroller.children[0]);
		that.options.bounce = true;
		that.pullDownEl = div;
		that.pullDownLabel = div.getElementsByTagName('span')[1];
	}
	
	if (that.pullUpToRefresh) {
		div = doc.createElement('div');
		div.className = 'iScrollPullUp';
		div.innerHTML = '<span class="iScrollPullUpIcon"></span><span class="iScrollPullUpLabel">' + that.options.pullUpLabel[0] + '</span>\n';
		that.scroller.appendChild(div);
		that.options.bounce = true;
		that.pullUpEl = div;
		that.pullUpLabel = div.getElementsByTagName('span')[1];
	}

	that.refresh();

	that._bind(RESIZE_EV, window);
	that._bind(START_EV);
/*	that._bind(MOVE_EV);
	that._bind(END_EV);
	that._bind(CANCEL_EV);*/

	if (hasGesture && that.options.zoom) {
		that._bind('gesturestart');
		that.scroller.style.webkitTransform = that.scroller.style.webkitTransform + ' scale(1)';
	}
	
	if (!hasTouch) {
		that._bind('mousewheel');
	}
	
	if (that.options.checkDOMChange) {
		that.DOMChangeInterval = setInterval(function () { that._checkSize(); }, 250);
	}
}

iScroll.prototype = {
	x: 0, y: 0,
	currPageX: 0, currPageY: 0,
	pagesX: [], pagesY: [],
	offsetBottom: 0,
	offsetTop: 0,
	scale: 1, lastScale: 1,
	contentReady: true,
	
	handleEvent: function (e) {
		var that = this;

		switch(e.type) {
			case START_EV: that._start(e); break;
			case MOVE_EV: that._move(e); break;
			case END_EV:
			case CANCEL_EV: that._end(e); break;
			case 'webkitTransitionEnd': that._transitionEnd(e); break;
			case RESIZE_EV: that._resize(); break;
			case 'gesturestart': that._gestStart(e); break;
			case 'gesturechange': that._gestChange(e); break;
			case 'gestureend':
			case 'gesturecancel': that._gestEnd(e); break;
			case 'mousewheel': that._wheel(e); break;
		}
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
				bar.className = that.options.scrollbarClass + dir.toUpperCase();
			} else {
				bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:7px' : 'width:7px;bottom:7px;top:2px;right:1px');
			}
			bar.style.cssText += 'pointer-events:none;-webkit-transition-property:opacity;-webkit-transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');

			that.wrapper.appendChild(bar);
			that[dir + 'ScrollbarWrapper'] = bar;

			// Create the scrollbar indicator
			bar = doc.createElement('div');
			if (!that.options.scrollbarClass) {
				bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-webkit-background-clip:padding-box;-webkit-box-sizing:border-box;' + (dir == 'h' ? 'height:100%;-webkit-border-radius:4px 3px;' : 'width:100%;-webkit-border-radius:3px 4px;');
			}
			bar.style.cssText += 'pointer-events:none;-webkit-transition-property:-webkit-transform;-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-webkit-transition-duration:0;-webkit-transform:' + trnOpen + '0,0' + trnClose;

			that[dir + 'ScrollbarWrapper'].appendChild(bar);
			that[dir + 'ScrollbarIndicator'] = bar;
		}

		if (dir == 'h') {
			that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
			that.hScrollbarIndicatorSize = m.max(m.round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
			that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
			that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
			that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
		} else {
			that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
			that.vScrollbarIndicatorSize = m.max(m.round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
			that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
			that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
			that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
		}

		// Reset position
		that._indicatorPos(dir, true);
	},
	
	_resize: function () {
		var that = this;

		//if (that.options.momentum) that._unbind('webkitTransitionEnd');

		setTimeout(function () {
			that.refresh();
		}, 0);
	},
	
	_checkSize: function () {
		var that = this,
			scrollerW,
			scrollerH;

		if (that.moved || that.zoomed || !that.contentReady) return;

		scrollerW = m.round(that.scroller.offsetWidth * that.scale),
		scrollerH = m.round((that.scroller.offsetHeight - that.offsetBottom - that.offsetTop) * that.scale);

		if (scrollerW == that.scrollerW && scrollerH == that.scrollerH) return;

		that.refresh();
	},
	
	_pos: function (x, y) {
		var that = this;

		that.x = that.hScroll ? x : 0;
		that.y = that.vScroll ? y : 0;

		that.scroller.style.webkitTransform = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + that.scale + ')';
//		that.scroller.style.left = that.x + 'px';
//		that.scroller.style.top = that.y + 'px';

		that._indicatorPos('h');
		that._indicatorPos('v');
	},
	
	_indicatorPos: function (dir, hidden) {
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
		that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
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
			matrix;

		that.moved = false;

		e.preventDefault();

		if (hasTouch && e.touches.length == 2 && that.options.zoom && hasGesture && !that.zoomed) {
			that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft*2) / 2 - that.x;
			that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop*2) / 2 - that.y;
		}

		that.moved = false;
		that.distX = 0;
		that.distY = 0;
		that.absDistX = 0;
		that.absDistY = 0;
		that.dirX = 0;
		that.dirY = 0;
		that.returnTime = 0;
		
		that._transitionTime(0);
		
		if (that.options.momentum) {
			if (that.scrollInterval) {
				clearInterval(that.scrollInterval);
				that.scrollInterval = null;
			}

			if (that.options.HWCompositing) {
				matrix = new WebKitCSSMatrix(window.getComputedStyle(that.scroller, null).webkitTransform);
				if (matrix.m41 != that.x || matrix.m42 != that.y) {
					that._unbind('webkitTransitionEnd');
					that._pos(matrix.m41, matrix.m42);
				}
			} else {
				matrix = window.getComputedStyle(that.scroller, null);
				if (that.x + 'px' != matrix.left || that.y + 'px' != matrix.top) {
					that._unbind('webkitTransitionEnd');
					that._pos(matrix.left.replace(/[^0-9]/g)*1, matrix.top.replace(/[^0-9]/g)*1);
				}
			}
			
		}

		that.scroller.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.66,0.66,1)';
		if (that.hScrollbar) that.hScrollbarIndicator.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.66,0.66,1)';
		if (that.vScrollbar) that.vScrollbarIndicator.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.66,0.66,1)';
		that.startX = that.x;
		that.startY = that.y;
		that.pointX = point.pageX;
		that.pointY = point.pageY;
		
		that.startTime = e.timeStamp;

		if (that.options.onScrollStart) that.options.onScrollStart.call(that);

		// Registering/unregistering of events is done to preserve resources on Android
//		setTimeout(function () {
//			that._unbind(START_EV);
			that._bind(MOVE_EV);
			that._bind(END_EV);
			that._bind(CANCEL_EV);
//		}, 0);
	},
	
	_move: function (e) {
		if (hasTouch && e.touches.length > 1) return;

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
			newX = that.options.bounce ? that.x + (deltaX / 2.4) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
		}
		if (newY > 0 || newY < that.maxScrollY) { 
			newY = that.options.bounce ? that.y + (deltaY / 2.4) : newY >= 0 || that.maxScrollY >= 0 ? 0 : that.maxScrollY;

			// Pull down to refresh
			if (that.options.pullToRefresh && that.contentReady) {
				if (that.pullDownToRefresh && newY > that.offsetBottom) {
					that.pullDownEl.className = 'iScrollPullDown flip';
					that.pullDownLabel.innerText = that.options.pullDownLabel[1];
				} else if (that.pullDownToRefresh && that.pullDownEl.className.match('flip')) {
					that.pullDownEl.className = 'iScrollPullDown';
					that.pullDownLabel.innerText = that.options.pullDownLabel[0];
				}
				
				if (that.pullUpToRefresh && newY < that.maxScrollY - that.offsetTop) {
					that.pullUpEl.className = 'iScrollPullUp flip';
					that.pullUpLabel.innerText = that.options.pullUpLabel[1];
				} else if (that.pullUpToRefresh && that.pullUpEl.className.match('flip')) {
					that.pullUpEl.className = 'iScrollPullUp';
					that.pullUpLabel.innerText = that.options.pullUpLabel[0];
				}
			}
		}

		if (that.absDistX < 4 && that.absDistY < 4) {
			that.distX += deltaX;
			that.distY += deltaY;
			that.absDistX = m.abs(that.distX);
			that.absDistY = m.abs(that.distY);
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
		if (hasTouch && e.touches.length != 0) return;

		var that = this,
			point = hasTouch ? e.changedTouches[0] : e,
			target, ev,
			momentumX = { dist:0, time:0 },
			momentumY = { dist:0, time:0 },
			duration = e.timeStamp - that.startTime,
			newPosX = that.x, newPosY = that.y,
			newDuration,
			snap;

//		that._bind(START_EV);
		that._unbind(MOVE_EV);
		that._unbind(END_EV);
		that._unbind(CANCEL_EV);
		
		if (that.zoomed) return;

		if (!that.moved) {
			if (hasTouch) {
				if (that.doubleTapTimer && that.options.zoom) {
					// Double tapped
					clearTimeout(that.doubleTapTimer);
					that.doubleTapTimer = null;
					that.zoom(that.pointX, that.pointY, that.scale == 1 ? 2 : 1);
				} else {
					that.doubleTapTimer = setTimeout(function () {
						that.doubleTapTimer = null;

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
					}, that.options.zoom ? 250 : 0);
				}
			}

			that._resetPos();
			return;
		}

		if (that.pullDownToRefresh && that.contentReady && that.pullDownEl.className.match('flip')) {
			that.pullDownEl.className = 'iScrollPullDown loading';
			that.pullDownLabel.innerText = that.options.pullDownLabel[2];
			that.scroller.style.marginTop = '0';
			that.offsetBottom = 0;
			that.refresh();
			that.contentReady = false;
			that.options.onPullDown();
		}

		if (that.pullUpToRefresh && that.contentReady && that.pullUpEl.className.match('flip')) {
			that.pullUpEl.className = 'iScrollPullUp loading';
			that.pullUpLabel.innerText = that.options.pullUpLabel[2];
			that.scroller.style.marginBottom = '0';
			that.offsetTop = 0;
			that.refresh();
			that.contentReady = false;
			that.options.onPullUp();
		}

		if (duration < 300 && that.options.momentum) {
			momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
			momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;

			newPosX = that.x + momentumX.dist;
			newPosY = that.y + momentumY.dist;

 			if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
 			if ((that.y > 0 && newPosY > 0) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
		}

		if (momentumX.dist || momentumY.dist) {
			newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);

			// Do we need to snap?
			if (that.options.snap) {
				snap = that._snap(newPosX, newPosY);
				newPosX = snap.x;
				newPosY = snap.y;
				newDuration = m.max(snap.time, newDuration);
			}
			
/*			if (newPosX > 0 || newPosX < that.maxScrollX || newPosY > 0 || newPosY < that.maxScrollY) {
				// Subtle change of scroller motion
				that.scroller.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.66,0.5,1)';
				if (that.hScrollbar) that.hScrollbarIndicator.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.66,0.5,1)';
				if (that.vScrollbar) that.vScrollbarIndicator.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.66,0.5,1)';
			}*/

			that.scrollTo(newPosX, newPosY, newDuration);
			return;
		}
		
		// Do we need to snap?
		if (that.options.snap) {
			snap = that._snap(that.x, that.y);
			if (snap.x != that.x || snap.y != that.y) {
				that.scrollTo(snap.x, snap.y, snap.time);
			}
			return;
		}

		that._resetPos();
	},
	
	_resetPos: function (time) {
		var that = this,
			resetX = that.x,
			resetY = that.y;

		if (that.x >= 0) resetX = 0;
		else if (that.x < that.maxScrollX) resetX = that.maxScrollX;

		if (that.y >= 0 || that.maxScrollY > 0) resetY = 0;
		else if (that.y < that.maxScrollY) resetY = that.maxScrollY;

		if (resetX == that.x && resetY == that.y) {
			if (that.moved) {
				if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);		// Execute custom code on scroll end
				that.moved = false;
			}

			if (that.zoomed) {
				if (that.options.onZoomEnd) that.options.onZoomEnd.call(that);			// Execute custom code on scroll end
				that.zoomed = false;
			}

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

		if (time === undefined) time = 200;

		// Invert ease
		if (time) {
			that.scroller.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.0,0.33,1)';
			if (that.hScrollbar) that.hScrollbarIndicator.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.0,0.33,1)';
			if (that.vScrollbar) that.vScrollbarIndicator.style.webkitTransitionTimingFunction = 'cubic-bezier(0.33,0.0,0.33,1)';
		}

		that.scrollTo(resetX, resetY, time);
	},
	
	_timedScroll: function (destX, destY, runtime) {
		var that = this,
			startX = that.x, startY = that.y,
			startTime = (new Date).getTime(),
			easeOut;

		that._transitionTime(0);
		
		if (that.scrollInterval) {
			clearInterval(that.scrollInterval);
			that.scrollInterval = null;
		}
		
		that.scrollInterval = setInterval(function () {
			var now = (new Date).getTime(),
				newX, newY;
				
			if (now >= startTime + runtime) {
				clearInterval(that.scrollInterval);
				that.scrollInterval = null;

				that._pos(destX, destY);
				that._transitionEnd();
				return;
			}
	
			now = (now - startTime) / runtime - 1;
			easeOut = m.sqrt(1 - now * now);
			newX = (destX - startX) * easeOut + startX;
			newY = (destY - startY) * easeOut + startY;
			that._pos(newX, newY);
		}, 20);
	},
	
	_transitionEnd: function (e) {
		var that = this;
		
		if (e) e.stopPropagation();

		that._unbind('webkitTransitionEnd');

		that._resetPos(that.returnTime);
		that.returnTime = 0;
	},
	

	/**
	 *
	 * Gestures
	 *
	 */
	_gestStart: function (e) {
		var that = this;

		that._transitionTime(0);
		that.lastScale = 1;
		
		if (that.options.onZoomStart) that.options.onZoomStart.call(that);

		that._unbind('gesturestart');
		that._bind('gesturechange');
		that._bind('gestureend');
		that._bind('gesturecancel');
	},
	
	_gestChange: function (e) {
		var that = this,
			scale = that.scale * e.scale,
			x, y, relScale;

		that.zoomed = true;

		if (scale < that.options.zoomMin) scale = that.options.zoomMin;
		else if (scale > that.options.zoomMax) scale = that.options.zoomMax;

		relScale = scale / that.scale;
		x = that.originX - that.originX * relScale + that.x;
		y = that.originY - that.originY * relScale + that.y;
		that.scroller.style.webkitTransform = trnOpen + x + 'px,' + y + 'px' + trnClose + ' scale(' + scale + ')';
		that.lastScale = relScale;
	},

	_gestEnd: function (e) {
		var that = this,
			scale = that.scale,
			lastScale = that.lastScale;

		that.scale = scale * lastScale;
		if (that.scale < that.options.zoomMin + 0.05) that.scale = that.options.zoomMin;
		else if (that.scale > that.options.zoomMax - 0.05) that.scale = that.options.zoomMax;
		lastScale = that.scale / scale;
		that.x = that.originX - that.originX * lastScale + that.x;
		that.y = that.originY - that.originY * lastScale + that.y;

		that.scroller.style.webkitTransform = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + that.scale + ')';

		setTimeout(function () {
			that.refresh();
		}, 0);

		that._bind('gesturestart');
		that._unbind('gesturechange');
		that._unbind('gestureend');
		that._unbind('gesturecancel');
	},
	
	_wheel: function (e) {
		var that = this,
			deltaX = that.x + e.wheelDeltaX / 12,
			deltaY = that.y + e.wheelDeltaY / 12;

		if (deltaX > 0) deltaX = 0;
		else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;

		if (deltaY > 0) deltaY = 0;
		else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;

		that.scrollTo(deltaX, deltaY, 0);
	},

	
	/**
	 *
	 * Utilities
	 *
	 */
	_momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
		var that = this,
			deceleration = 0.0006,
			speed = m.abs(dist) / time,
			newDist = (speed * speed) / (2 * deceleration),
			newTime = 0, outsideDist = 0;

		// Proportinally reduce speed if we are outside of the boundaries 
		if (dist > 0 && newDist > maxDistUpper) {
			outsideDist = size / (6 / (newDist / speed * deceleration));
			maxDistUpper = maxDistUpper + outsideDist;
			that.returnTime = 800 / size * outsideDist + 100;
			speed = speed * maxDistUpper / newDist;
			newDist = maxDistUpper;
		} else if (dist < 0 && newDist > maxDistLower) {
			outsideDist = size / (6 / (newDist / speed * deceleration));
			maxDistLower = maxDistLower + outsideDist;
			that.returnTime = 800 / size * outsideDist + 100;
			speed = speed * maxDistLower / newDist;
			newDist = maxDistLower;
		}

		newDist = newDist * (dist < 0 ? -1 : 1);
		newTime = speed / deceleration;

		return { dist: newDist, time: m.round(newTime) };
	},

	_offset: function (el, tree) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;
			
		if (!tree) return { x: left, y: top };

		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		} 

		return { x: left, y: top };
	},

	_snap: function (x, y) {
		var that = this,
			i, l,
			page, time,
			sizeX, sizeY;

		// Check page X
		page = that.pagesX.length-1;
		for (i=0, l=that.pagesX.length; i<l; i++) {
			if (x >= that.pagesX[i]) {
				page = i;
				break;
			}
		}
		if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
		x = that.pagesX[page];
		sizeX = m.abs(x - that.pagesX[that.currPageX]);
		sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
		that.currPageX = page;

		// Check page Y
		page = that.pagesY.length-1;
		for (i=0; i<page; i++) {
			if (y >= that.pagesY[i]) {
				page = i;
				break;
			}
		}
		if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
		y = that.pagesY[page];
		sizeY = m.abs(y - that.pagesY[that.currPageY]);
		sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
		that.currPageY = page;

		// Snap with constant speed (proportional duration)
		time = m.round(m.max(sizeX, sizeY)) || 200;

		return { x: x, y: y, time: time };
	},

	_bind: function (type, el) {
		(el || this.scroller).addEventListener(type, this, false);
	},

	_unbind: function (type, el) {
		(el || this.scroller).removeEventListener(type, this, false);
	},


	/**
	 *
	 * Public methods
	 *
	 */
	destroy: function () {
		var that = this;

		if (that.options.checkDOMChange) clearTimeout(that.DOMChangeInterval);

		// Remove pull to refresh
		if (that.pullDownToRefresh) {
			that.pullDownEl.parentNode.removeChild(that.pullDownEl);
		}
		if (that.pullUpToRefresh) {
			that.pullUpEl.parentNode.removeChild(that.pullUpEl);
		}

		// Remove the scrollbars
		that.hScrollbar = false;
		that.vScrollbar = false;
		that._scrollbar('h');
		that._scrollbar('v');

		// Free some mem
		that.scroller.style.webkitTransform = '';

		// Remove the event listeners
		that._unbind('webkitTransitionEnd');
		that._unbind(RESIZE_EV);
		that._unbind(START_EV);
		that._unbind(MOVE_EV);
		that._unbind(END_EV);
		that._unbind(CANCEL_EV);

		if (that.options.zoom) {
			that._unbind('gesturestart');
			that._unbind('gesturechange');
			that._unbind('gestureend');
			that._unbind('gesturecancel');
		}
	},
	
	refresh: function () {
		var that = this,
			pos = 0, page = 0,
			i, l, els,
			oldHeight, offsets,
			loading;

		if (that.pullDownToRefresh) {
			loading = that.pullDownEl.className.match('loading');
			if (loading && !that.contentReady) {
				oldHeight = that.scrollerH;
				that.contentReady = true;
				that.pullDownEl.className = 'iScrollPullDown';
				that.pullDownLabel.innerText = that.options.pullDownLabel[0];
				that.offsetBottom = that.pullDownEl.offsetHeight;
				that.scroller.style.marginTop = -that.offsetBottom + 'px';
			} else if (!loading) {
				that.offsetBottom = that.pullDownEl.offsetHeight;
				that.scroller.style.marginTop = -that.offsetBottom + 'px';
			}
		}

		if (that.pullUpToRefresh) {
			loading = that.pullUpEl.className.match('loading');
			if (loading && !that.contentReady) {
				oldHeight = that.scrollerH;
				that.contentReady = true;
				that.pullUpEl.className = 'iScrollPullUp';
				that.pullUpLabel.innerText = that.options.pullUpLabel[0];
				that.offsetTop = that.pullUpEl.offsetHeight;
				that.scroller.style.marginBottom = -that.offsetTop + 'px';
			} else if (!loading) {
				that.offsetTop = that.pullUpEl.offsetHeight;
				that.scroller.style.marginBottom = -that.offsetTop + 'px';
			}
		}

		that.wrapperW = that.wrapper.clientWidth;
		that.wrapperH = that.wrapper.clientHeight;
		that.scrollerW = m.round(that.scroller.offsetWidth * that.scale);
		that.scrollerH = m.round((that.scroller.offsetHeight - that.offsetBottom - that.offsetTop) * that.scale);
		that.maxScrollX = that.wrapperW - that.scrollerW;
		that.maxScrollY = that.wrapperH - that.scrollerH;
		that.dirX = 0;
		that.dirY = 0;
		
		that._transitionTime(0);

		that.hScroll = that.options.hScroll && that.maxScrollX < 0;
		that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);
		that.hScrollbar = that.hScroll && that.options.hScrollbar;
		that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;

		// Prepare the scrollbars
		that._scrollbar('h');
		that._scrollbar('v');

		// Snap
		if (typeof that.options.snap == 'string') {
			that.pagesX = [];
			that.pagesY = [];
			els = that.scroller.querySelectorAll(that.options.snap);
			for (i=0, l=els.length; i<l; i++) {
				pos = that._offset(els[i]);
				that.pagesX[i] = pos.x < that.maxScrollX ? that.maxScrollX : pos.x * that.scale;
				that.pagesY[i] = pos.y < that.maxScrollY ? that.maxScrollY : pos.y * that.scale;
			}
		} else if (that.options.snap) {
			that.pagesX = [];
			while (pos >= that.maxScrollX) {
				that.pagesX[page] = pos;
				pos = pos - that.wrapperW;
				page++;
			}
			if (that.maxScrollX%that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length-1] + that.pagesX[that.pagesX.length-1];

			pos = 0;
			page = 0;
			that.pagesY = [];
			while (pos >= that.maxScrollY) {
				that.pagesY[page] = pos;
				pos = pos - that.wrapperH;
				page++;
			}
			if (that.maxScrollY%that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length-1] + that.pagesY[that.pagesY.length-1];
		}
		
		// Recalculate wrapper offsets
		if (that.options.zoom) {
			offsets = that._offset(that.wrapper, true);
			that.wrapperOffsetLeft = -offsets.x;
			that.wrapperOffsetTop = -offsets.y;
		}

		if (oldHeight && that.y == 0) {
			oldHeight = oldHeight - that.scrollerH + that.y;
			that.scrollTo(0, oldHeight, 0);
		}
		
		that._resetPos();
	},

	scrollTo: function (x, y, time, relative) {
		var that = this;

		if (relative) {
			x = that.x - x;
			y = that.y - y;
		}

		time = !time || (m.round(that.x) == m.round(x) && m.round(that.y) == m.round(y)) ? 0 : time;

		that.moved = true;

		if (!that.options.HWTransition) {
			that._timedScroll(x, y, time);
			return;
		}

		if (time) that._bind('webkitTransitionEnd');
		that._transitionTime(time);
		that._pos(x, y);
		if (!time) setTimeout(function () { that._transitionEnd(); }, 0);
	},

	scrollToElement: function (el, time) {
		var that = this, pos;
		el = el.nodeType ? el : that.scroller.querySelector(el);
		if (!el) return;

		pos = that._offset(el);
		pos.x = pos.x > 0 ? 0 : pos.x < that.maxScrollX ? that.maxScrollX : pos.x;
		pos.y = pos.y > 0 ? 0 : pos.y < that.maxScrollY ? that.maxScrollY : pos.y;
		time = time === undefined ? m.max(m.abs(pos.x)*2, m.abs(pos.y)*2) : time;

		that.scrollTo(pos.x, pos.y, time);
	},

	scrollToPage: function (pageX, pageY, time) {
		var that = this, x, y;
		
		if (that.options.snap) {
			pageX = pageX == 'next' ? that.currPageX+1 : pageX == 'prev' ? that.currPageX-1 : pageX;
			pageY = pageY == 'next' ? that.currPageY+1 : pageY == 'prev' ? that.currPageY-1 : pageY;

			pageX = pageX < 0 ? 0 : pageX > that.pagesX.length-1 ? that.pagesX.length-1 : pageX;
			pageY = pageY < 0 ? 0 : pageY > that.pagesY.length-1 ? that.pagesY.length-1 : pageY;

			that.currPageX = pageX;
			that.currPageY = pageY;
			x = that.pagesX[pageX];
			y = that.pagesY[pageY];
		} else {
			x = -that.wrapperW * pageX;
			y = -that.wrapperH * pageY;
			if (x < that.maxScrollX) x = that.maxScrollX;
			if (y < that.maxScrollY) y = that.maxScrollY;
		}

		that.scrollTo(x, y, time || 400);
	},

	zoom: function (x, y, scale) {
		var that = this,
			relScale = scale / that.scale;

		x = x - that.wrapperOffsetLeft - that.x;
		y = y - that.wrapperOffsetTop - that.y;
		that.x = x - x * relScale + that.x;
		that.y = y - y * relScale + that.y;

		that.scale = scale;

		if (that.options.onZoomStart) that.options.onZoomStart.call(that);

		that.refresh();

		that._bind('webkitTransitionEnd');
		that._transitionTime(200);

		setTimeout(function () {
			that.zoomed = true;
			that.scroller.style.webkitTransform = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + scale + ')';
		}, 0);
	}
};


var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
	hasTouch = 'ontouchstart' in window,
	hasGesture = 'ongesturestart' in window,
//	hasHashChange = 'onhashchange' in window,
//	hasTransitionEnd = 'onwebkittransitionend' in window,
	hasCompositing = 'WebKitTransitionEvent' in window,
	isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
	isAndroid = (/android/gi).test(navigator.appVersion),
	RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	START_EV = hasTouch ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	END_EV = hasTouch ? 'touchend' : 'mouseup',
	CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
	trnOpen = 'translate' + (has3d ? '3d(' : '('),
	trnClose = has3d ? ',0)' : ')',
	m = Math;

if (typeof exports !== 'undefined') exports.iScroll = iScroll;
else window.iScroll = iScroll;

})();