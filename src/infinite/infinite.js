
	_initInfinite: function () {
		var el = this.options.infiniteElements;

		this.infiniteElements = typeof el == 'string' ? document.querySelectorAll(el) : el;
		this.infiniteLength = this.infiniteElements.length;
		this.infiniteMaster = this.infiniteElements[0];
		this.infiniteElementSize = this.options.scrollY ? this.infiniteMaster.offsetHeight : this.infiniteMaster.offsetWidth;
		this.infiniteSize = this.infiniteLength * this.infiniteElementSize;

		this.options.cacheSize = this.options.cacheSize || 1000;
		this.infiniteCacheBuffer = Math.round(this.options.cacheSize / 4);

		//this.infiniteCache = {};
		this.options.dataset.call(this, 0, this.options.cacheSize);

		this.on('refresh', function () {
			var elementsPerPage;
			if ( this.options.scrollY ) {
				elementsPerPage = Math.ceil(this.wrapperHeight / this.infiniteElementSize);
			} else {
				elementsPerPage = Math.ceil(this.wrapperWidth  / this.infiniteElementSize);
			}
			this.infiniteUpperBufferSize = Math.floor((this.infiniteLength - elementsPerPage) / 2);
			this.reorderInfinite();
		});

		this.on('scroll', this.reorderInfinite);
	},

	// TO-DO: clean up the mess
	reorderInfinite: function () {
		var offset = this.options.scrollY ? -this.y : -this.x;

		var minorPhase = Math.max(Math.floor(offset / this.infiniteElementSize) - this.infiniteUpperBufferSize, 0),
			majorPhase = Math.floor(minorPhase / this.infiniteLength),
			phase = minorPhase - majorPhase * this.infiniteLength;

		var position = 0;
		var i = 0;
		var update = [];

		//var cachePhase = Math.floor((minorPhase + this.infiniteLength / 2) / this.infiniteCacheBuffer);
		var cachePhase = Math.floor(minorPhase / this.infiniteCacheBuffer);

		while ( i < this.infiniteLength ) {
			position = i * this.infiniteElementSize + majorPhase * this.infiniteSize;

			if ( phase > i ) {
				position += this.infiniteElementSize * this.infiniteLength;
			}

			if ( this.infiniteElements[i]._position !== position ) {
				this.infiniteElements[i]._phase = position / this.infiniteElementSize;

				if ( this.infiniteElements[i]._phase < this.options.infiniteLimit ) {
					this.infiniteElements[i]._position = position;
					if ( this.options.infiniteUseTransform ) {

						this.infiniteElements[i].style[utils.style.transform] = 'translate(' +
								(this.options.scrollY ? '0, ' + position + 'px' : position + 'px, 0') +
								')' + this.translateZ;

					} else {
						this.infiniteElements[i].style[this.options.scrollY ? 'top' : 'left'] = position + 'px';
					}
					update.push(this.infiniteElements[i]);
				}
			}

			i++;
		}

		if ( this.cachePhase != cachePhase && (cachePhase === 0 || minorPhase - this.infiniteCacheBuffer > 0) ) {
			this.options.dataset.call(this, Math.max(cachePhase * this.infiniteCacheBuffer - this.infiniteCacheBuffer, 0), this.options.cacheSize);
		}

		this.cachePhase = cachePhase;

		this.updateContent(update);
	},

	updateContent: function (els) {
		if ( this.infiniteCache === undefined ) {
			return;
		}

		for ( var i = 0, l = els.length; i < l; i++ ) {
			this.options.dataFiller.call(this, els[i], this.infiniteCache[els[i]._phase]);
		}
	},

	updateCache: function (start, data) {
		var firstRun = this.infiniteCache === undefined;

		this.infiniteCache = {};

		for ( var i = 0, l = data.length; i < l; i++ ) {
			this.infiniteCache[start++] = data[i];
		}

		if ( firstRun ) {
			this.updateContent(this.infiniteElements);
		}

	},

