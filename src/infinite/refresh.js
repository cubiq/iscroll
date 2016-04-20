
		this.scrollerWidth	= this.scroller.offsetWidth;
		this.scrollerHeight	= this.scroller.offsetHeight;

		this.maxScrollX	= this.wrapperWidth - this.scrollerWidth;
		this.maxScrollY	= this.wrapperHeight - this.scrollerHeight;
		this.options.infiniteLimit = this.options.infiniteLimit || Math.floor(2147483645 / this.infiniteElementSize);

		if ( this.options.infiniteElements ) {
			if ( this.options.scrollY ) {
				this.maxScrollY = -this.options.infiniteLimit * this.infiniteElementSize + this.wrapperHeight;
			} else {
				this.maxScrollX = -this.options.infiniteLimit * this.infiniteElementSize + this.wrapperWidth;
			}
		}

