
		this.scrollerWidth	= rect.width;
		this.scrollerHeight	= rect.height;

		this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;

		var limit;
		if ( this.options.infiniteElements ) {
			this.options.infiniteLimit = this.options.infiniteLimit || Math.floor(2147483645 / this.infiniteElementHeight);
			limit = -this.options.infiniteLimit * this.infiniteElementHeight + this.wrapperHeight;
		}
		this.maxScrollY		= limit !== undefined ? limit : this.wrapperHeight - this.scrollerHeight;
