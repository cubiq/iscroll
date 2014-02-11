
	_initIndicators: function () {
		var interactive = this.options.interactiveScrollbars,
			defaultScrollbars = typeof this.options.scrollbars != 'object',
			customStyle = typeof this.options.scrollbars != 'string',
			indicator1,
			indicator2,
			indicatorY,
			indicatorX;

		if ( this.options.scrollbars ) {
			// Vertical scrollbar
			if ( this.options.scrollY ) {
				indicatorY = {
					el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeIndicator,
					listenX: false
				};

				this.wrapper.appendChild(indicatorY.el);
			}

			// Horizontal scrollbar
			if ( this.options.scrollX ) {
				indicatorX = {
					el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeIndicator,
					listenY: false
				};

				this.wrapper.appendChild(indicatorX.el);
			}
		} 

		if (this.options.indicators) {
			indicator1 = this.options.indicators.length ? this.options.indicators[0] : this.options.indicators;
			indicator2 = this.options.indicators[1] && this.options.indicators[1];
		}

		if ( indicator1 ) {
			this.indicator1 = new Indicator(this, indicator1);
		}

		if ( indicator2 ) {
			this.indicator2 = new Indicator(this, indicator2);
		}

		if ( indicatorY ) {
			this.indicatorY = new Indicator(this, indicatorY);
		}

		if ( indicatorX ) {
			this.indicatorX = new Indicator(this, indicatorX);
		}

		this.on('refresh', function () {
			if ( this.indicator1 ) {
				this.indicator1.refresh();
			}

			if ( this.indicator2 ) {
				this.indicator2.refresh();
			}

			if ( this.indicatorY ) {
				this.indicatorY.refresh();
			}

			if ( this.indicatorX ) {
				this.indicatorX.refresh();
			}
		});

		this.on('destroy', function () {
			if ( this.indicator1 ) {
				this.indicator1.destroy();
				this.indicator1 = null;
			}

			if ( this.indicator2 ) {
				this.indicator2.destroy();
				this.indicator2 = null;
			}

			if ( this.indicatorY ) {
				this.indicatorY.destroy();
				this.indicatorY = null;
			}

			if ( this.indicatorX ) {
				this.indicatorX.destroy();
				this.indicatorX = null;
			}
		});
	},
