/**
 * Created by chaos on 14-6-30.
 * @description
 * a plugin for iscroll for pull refresh and infinite load
 */

(function (IScroll) {
    var old_initInfinite = IScroll.prototype._init;
    IScroll.prototype._init = function () {
        old_initInfinite.apply(this);
        //option use customer infinite events
        if (this.options.infiniteEvents) {
            //设置probeType=2，
            /*
            * This regulates the probe aggressiveness or the frequency at which the scroll event is fired. Valid values are: 1, 2, 3. The higher the number the more aggressive the probe. The more aggressive the probe the higher the impact on the CPU.
             probeType: 1 has no impact on performance. The scroll event is fired only when the scroller is not busy doing its stuff.
             probeType: 2 always executes the scroll event except during momentum and bounce. This resembles the native onScroll event.
             probeType: 3 emits the scroll event with a to-the-pixel precision. Note that the scrolling is forced to requestAnimationFrame (ie: useTransition:false).*/
            this.options.probeType = 2;
            this.pullDownling = false;
            this.pullUping = false;
            this.on('scroll', function () {
                if (this.pullDownling || this.pullUping) {
                    return;
                }
                if (this.y > 0) {
                    this.pullDownling = true;
                    this._execEvent('pullDown')
                } else if (this.y < this.maxScrollY) {
                    this.pullUping = true;
                    this._execEvent('pullUp');
                }
            })
            this.on('scrollEnd', function () {
                this.refresh();
                this.pullDownling = this.pullUping = false;
            })
        }

    }
})(IScroll)