
	this.scrollerWidth	= Math.round(this.scroller.parentNode.offsetWidth * this.scale);
	this.scrollerHeight	= Math.round(this.scroller.parentNode.offsetHeight * this.scale);

	this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
	this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;
