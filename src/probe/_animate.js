
	_animate: function (destX, destY, duration, easingFn) {
		var that = this,
			startX = this.x,
			startY = this.y,
          lastX = startX,
          lastY = startY,
			startTime = utils.getTime(),
			destTime = startTime + duration;

		function step () {
			var now = utils.getTime(),
				newX, newY,
             offsetX, offsetY,
				easing;

			if ( now >= destTime ) {
				that.isAnimating = false;
				that._translate(destX, destY);
				
				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd');
				}

				return;
			}
      
          offsetY = that.y - lastY;
          offsetX = that.x - lastX;

          if (offsetX) {
            startX += offsetX;
            destX += offsetX;
          }

          if (offsetY) {
            startY += offsetX;
            destY += offsetX;
          }

			now = ( now - startTime ) / duration;
			easing = easingFn(now);
			newX = ( destX - startX ) * easing + startX;
			newY = ( destY - startY ) * easing + startY;
			that._translate(newX, newY);

			if ( that.isAnimating ) {
				rAF(step);
			}

			if ( that.options.probeType == 3 ) {
				that._execEvent('scroll');
			}
		}

		this.isAnimating = true;
		step();
	},
