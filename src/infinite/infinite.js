
	_initInfinite: function () {
		var el = this.options.infiniteElements;

		this.infiniteElements = typeof el == 'string' ? document.querySelectorAll(el) : el;
		this.infiniteLength = this.infiniteElements.length;
		this.infiniteMaster = this.infiniteElements[0];
		this.infiniteElementHeight = this.infiniteMaster.offsetHeight;
		this.infiniteHeight = this.infiniteLength * this.infiniteElementHeight;
		// Used to check if we are currently loading any data.
		this.dataLoads = [];
		// Used to check if a fixed row limit was set in the options. If not, a limit
		// is set when the end of the cache is reached and no more data is loading.
		this.infiniteLimitSet = this.options.infiniteLimit !== undefined;

		this.options.cacheSize = this.options.cacheSize || 1000;
		this.infiniteCacheBuffer = Math.round(this.options.cacheSize / 4);

		this.loadData(0, this.options.cacheSize);

		this.on('refresh', function () {
			var elementsPerPage = Math.ceil(this.wrapperHeight / this.infiniteElementHeight);
			this.infiniteUpperBufferSize = Math.floor((this.infiniteLength - elementsPerPage) / 2);
			this.reorderInfinite();
		});

		this.on('scroll', this.reorderInfinite);
	},

	// TO-DO: clean up the mess
	reorderInfinite: function () {
		var center = -this.y + this.wrapperHeight / 2;

		var minorPhase = Math.max(Math.floor(-this.y / this.infiniteElementHeight) - this.infiniteUpperBufferSize, 0),
			majorPhase = Math.floor(minorPhase / this.infiniteLength),
			phase = minorPhase - majorPhase * this.infiniteLength;

		var top = 0;
		var i = 0;
		var update = [];

		//var cachePhase = Math.floor((minorPhase + this.infiniteLength / 2) / this.infiniteCacheBuffer);
		var cachePhase = Math.floor(minorPhase / this.infiniteCacheBuffer);

		while ( i < this.infiniteLength ) {
			top = i * this.infiniteElementHeight + majorPhase * this.infiniteHeight;

			if ( phase > i ) {
				top += this.infiniteElementHeight * this.infiniteLength;
			}

			if ( this.infiniteElements[i]._top !== top ) {
				this.infiniteElements[i]._phase = top / this.infiniteElementHeight;

				if ( this.infiniteElements[i]._phase < this.options.infiniteLimit ) {
					this.infiniteElements[i]._top = top;
					if ( this.options.infiniteUseTransform ) {
						this.infiniteElements[i].style[utils.style.transform] = 'translate(0, ' + top + 'px)' + this.translateZ;
					} else {
						this.infiniteElements[i].style.top = top + 'px';
					}
					update.push(this.infiniteElements[i]);
				}
			}

			i++;
		}

		if ( this.cachePhase != cachePhase && (cachePhase === 0 || minorPhase - this.infiniteCacheBuffer > 0) ) {
			this.loadData(Math.max(cachePhase * this.infiniteCacheBuffer - this.infiniteCacheBuffer, 0), this.options.cacheSize);
		}

		this.cachePhase = cachePhase;

		this.updateContent(update);
	},

	updateContent: function (els) {
		if ( this.infiniteCache === undefined ) {
			// We need to disable scrolling and updating until we have data!
			this.disable();
			return;
		}

		for ( var i = 0, l = els.length; i < l; i++ ) {
			// Check if the cache has data for the current element.
			if(this.infiniteCache[els[i]._phase] === undefined) {
				// The cache has no data for the current element. This either means
				// the data is still loading or there is no more data.
				if(this.dataLoads.length > 0) {
					// Still loading data...
					this.disable();
					this.infiniteCacheUpdateAfterLoad = true;
					return;
				} else {
					// Not loading any more data. End of data reached. Clear row and set row limit.
					els[i].innerHTML = '';
					if(!this.infiniteLimitSet) {
						this.infiniteLimitSet = true;
						// Calculation of new row limit is pretty much the same as in *refresh* method.
						this.options.infiniteLimit = Math.floor(els[i]._top / this.infiniteElementHeight);
						this.maxScrollY = -this.options.infiniteLimit * this.infiniteElementHeight + this.wrapperHeight;
					}
					return;
				}
			}
			this.options.dataFiller.call(this, els[i], this.infiniteCache[els[i]._phase]);
		}
	},

	loadData: function(start, count) {
		this.dataLoads.push(1);
		this.options.dataset.call(this, start, count);
	},

	updateCache: function (start, data) {
		var firstRun = this.infiniteCache === undefined;
		var updateAfterLoad = this.infiniteCacheUpdateAfterLoad !== undefined;
		this.infiniteCacheUpdateAfterLoad = undefined;

		this.infiniteCache = {};

		for ( var i = 0, l = data.length; i < l; i++ ) {
			this.infiniteCache[start++] = data[i];
		}

		this.dataLoads.pop();

		if ( firstRun ) {
			this.updateContent(this.infiniteElements);
		}

		this.enable();
	},

