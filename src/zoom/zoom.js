
	_initZoom: function () {
		this.scrollerStyle[utils.style.transformOrigin] = '0 0';
	},

	_zoomStart: function (e) {
		var c1 = Math.abs( e.touches[0].pageX - e.touches[1].pageX ),
			c2 = Math.abs( e.touches[0].pageY - e.touches[1].pageY );

		this.touchesDistanceStart = Math.sqrt(c1 * c1 + c2 * c2);
		this.startScale = this.scale;

		this.originX = Math.abs(e.touches[0].pageX + e.touches[1].pageX) / 2 + this.wrapperOffset.left - this.x;
		this.originY = Math.abs(e.touches[0].pageY + e.touches[1].pageY) / 2 + this.wrapperOffset.top - this.y;

		this._execEvent('zoomStart');
	},

	_zoom: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {
			e.preventDefault();
		}

		var c1 = Math.abs( e.touches[0].pageX - e.touches[1].pageX ),
			c2 = Math.abs( e.touches[0].pageY - e.touches[1].pageY ),
			distance = Math.sqrt( c1 * c1 + c2 * c2 ),
			scale = 1 / this.touchesDistanceStart * distance * this.startScale,
			lastScale,
			x, y;

		this.scaled = true;

		// CUSTOM: Modified to add switch to turn off 'bounce' effect on zooming - will default to normal behaviour
		if ( scale < this.options.zoomMin ) {
			scale = this.options.zoomBounce ? 0.5 * this.options.zoomMin * Math.pow(2.0, scale / this.options.zoomMin) : this.options.zoomMin;
		} else if ( scale > this.options.zoomMax ) {
			scale = this.options.zoomBounce ? 2.0 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / scale) : this.options.zoomMax;
		}


		lastScale = scale / this.startScale;
		x = this.originX - this.originX * lastScale + this.startX;
		y = this.originY - this.originY * lastScale + this.startY;

		this.scale = scale;

		this.scrollTo(x, y, 0);

		// CUSTOM: Added event to hook code into during zoom function
		this._execEvent('zoom');
	},

	_zoomEnd: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {
			e.preventDefault();
		}

		var newX, newY,
			lastScale;

		this.isInTransition = 0;
		this.initiated = 0;

		if ( this.scale > this.options.zoomMax ) {
			this.scale = this.options.zoomMax;
		} else if ( this.scale < this.options.zoomMin ) {
			this.scale = this.options.zoomMin;
		}

		// Update boundaries
		this.refresh();

		lastScale = this.scale / this.startScale;

		newX = this.originX - this.originX * lastScale + this.startX;
		newY = this.originY - this.originY * lastScale + this.startY;

		if ( newX > 0 ) {
			newX = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
		}

		if ( newY > 0 ) {
			newY = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
		}

		if ( this.x != newX || this.y != newY ) {
			this.scrollTo(newX, newY, this.options.bounceTime);
		}

		this.scaled = false;

		this._execEvent('zoomEnd');
	},

	zoom: function (scale, x, y, time) {
		if ( scale < this.options.zoomMin ) {
			scale = this.options.zoomMin;
		} else if ( scale > this.options.zoomMax ) {
			scale = this.options.zoomMax;
		}

		if ( scale == this.scale ) {
			return;
		}

		var relScale = scale / this.scale;

		x = x === undefined ? this.wrapperWidth / 2 : x;
		y = y === undefined ? this.wrapperHeight / 2 : y;
		time = time === undefined ? 300 : time;

		x = x + this.wrapperOffset.left - this.x;
		y = y + this.wrapperOffset.top - this.y;

		x = x - x * relScale + this.x;
		y = y - y * relScale + this.y;

		this.scale = scale;

		this.refresh();		// update boundaries

		if ( x > 0 ) {
			x = 0;
		} else if ( x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( y > 0 ) {
			y = 0;
		} else if ( y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		this.scrollTo(x, y, time);
	},

	// Updated to allow the Wheel Zoom to function in Firefox
	_wheelZoom: function (e) {
		var wheelDeltaY,
			deltaScale;

		e.preventDefault();

		if ( 'wheelDeltaX' in e ) {
			wheelDeltaY = e.wheelDeltaY / 120;
		} else if ( 'wheelDelta' in e ) {
			wheelDeltaY = e.wheelDelta / 120;
		} else if ( 'detail' in e ) {
			// FIX: Assign it to a value that exists and increase it.
			wheelDeltaY = (-e.detail / Math.abs(e.detail)) * 2;
		} else {
			return;
		}

		// FIX: Adjust the Y by the mouse wheel speed
		wheelDeltaY *= this.options.mouseWheelSpeed;

		deltaScale = this.scale + wheelDeltaY / 5;

		this.zoom(deltaScale, e.pageX, e.pageY, 0);

		// CUSTOM: Dispatch an event to hook into when scrolling
		this._execEvent('wheelZoom');
	},
