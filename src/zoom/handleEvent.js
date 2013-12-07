
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);

				if ( this.options.zoom && e.touches && e.touches.length > 1 ) {
					this._zoomStart(e);
				}
				break;
			case 'touchmove':
			case 'MSPointerMove':
			case 'mousemove':
				if ( this.options.zoom && e.touches && e.touches[1] ) {
					this._zoom(e);
					return;
				}
				this._move(e);
				break;
			case 'touchend':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				if ( this.scaled ) {
					this._zoomEnd(e);
					return;
				}
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				if ( this.options.wheelAction == 'zoom' ) {
					this._wheelZoom(e);
					return;	
				}
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
		}
	}

};