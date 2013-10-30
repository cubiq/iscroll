/*! iScroll v5.0.8 ~ (c) 2008-2013 Matteo Spinelli ~ http://cubiq.org/license */
var IScroll=function(window,document,Math){function IScroll(t,i){this.wrapper="string"==typeof t?document.querySelector(t):t,this.scroller=this.wrapper.children[0],this.scrollerStyle=this.scroller.style,this.options={resizeIndicator:!0,mouseWheelSpeed:20,snapThreshold:.334,startX:0,startY:0,scrollY:!0,directionLockThreshold:5,momentum:!0,pageStops:!1,alwaysOverscroll:!0,bounce:!0,bounceTime:600,bounceEasing:"",preventDefault:!0,HWCompositing:!0,useTransition:!0,useTransform:!0};for(var s in i)this.options[s]=i[s];this.translateZ=this.options.HWCompositing&&utils.hasPerspective?" translateZ(0)":"",this.options.useTransition=utils.hasTransition&&this.options.useTransition,this.options.useTransform=utils.hasTransform&&this.options.useTransform,this.options.eventPassthrough=this.options.eventPassthrough===!0?"vertical":this.options.eventPassthrough,this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault,this.options.scrollY="vertical"==this.options.eventPassthrough?!1:this.options.scrollY,this.options.scrollX="horizontal"==this.options.eventPassthrough?!1:this.options.scrollX,this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough,this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold,this.options.bounceEasing="string"==typeof this.options.bounceEasing?utils.ease[this.options.bounceEasing]||utils.ease.circular:this.options.bounceEasing,this.options.resizePolling=void 0===this.options.resizePolling?60:this.options.resizePolling,this.options.tap===!0&&(this.options.tap="tap"),this.options.invertWheelDirection=this.options.invertWheelDirection?-1:1,this.x=0,this.y=0,this.directionX=0,this.directionY=0,this._events={},this._init(),this.refresh(),this.scrollTo(this.options.startX,this.options.startY),this.enable()}function createDefaultScrollbar(t,i,s){var e=document.createElement("div"),o=document.createElement("div");return s===!0&&(e.style.cssText="position:absolute;z-index:9999",o.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"),o.className="iScrollIndicator","h"==t?(s===!0&&(e.style.cssText+=";height:7px;left:2px;right:2px;bottom:0",o.style.height="100%"),e.className="iScrollHorizontalScrollbar"):(s===!0&&(e.style.cssText+=";width:7px;bottom:2px;top:2px;right:1px",o.style.width="100%"),e.className="iScrollVerticalScrollbar"),i||(e.style.pointerEvents="none"),e.appendChild(o),e}function Indicator(t,i){this.wrapper="string"==typeof i.el?document.querySelector(i.el):i.el,this.indicator=this.wrapper.children[0],this.indicatorStyle=this.indicator.style,this.scroller=t,this.options={listenX:!0,listenY:!0,interactive:!1,resize:!0,defaultScrollbars:!1,speedRatioX:0,speedRatioY:0};for(var s in i)this.options[s]=i[s];this.sizeRatioX=1,this.sizeRatioY=1,this.maxPosX=0,this.maxPosY=0,this.options.interactive&&(utils.addEvent(this.indicator,"touchstart",this),utils.addEvent(this.indicator,"MSPointerDown",this),utils.addEvent(this.indicator,"mousedown",this),utils.addEvent(window,"touchend",this),utils.addEvent(window,"MSPointerUp",this),utils.addEvent(window,"mouseup",this))}var rAF=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},utils=function(){function t(t){return e===!1?!1:""===e?t:e+t.charAt(0).toUpperCase()+t.substr(1)}var i={},s=document.createElement("div").style,e=function(){for(var t,i=["t","webkitT","MozT","msT","OT"],e=0,o=i.length;o>e;e++)if(t=i[e]+"ransform",t in s)return i[e].substr(0,i[e].length-1);return!1}();i.getTime=Date.now||function(){return(new Date).getTime()},i.extend=function(t,i){for(var s in i)t[s]=i[s]},i.addEvent=function(t,i,s,e){t.addEventListener(i,s,!!e)},i.removeEvent=function(t,i,s,e){t.removeEventListener(i,s,!!e)},i.momentum=function(t,i,s,e,o){var n,r,h=t-i,a=Math.abs(h)/s,l=6e-4;return n=t+a*a/(2*l)*(0>h?-1:1),r=a/l,e>n?(n=o?e-o/2.5*(a/8):e,h=Math.abs(n-t),r=h/a):n>0&&(n=o?o/2.5*(a/8):0,h=Math.abs(t)+n,r=h/a),{destination:Math.round(n),duration:r}};var o=t("transform");return i.extend(i,{hasTransform:o!==!1,hasPerspective:t("perspective")in s,hasTouch:"ontouchstart"in window,hasPointer:navigator.msPointerEnabled,hasTransition:t("transition")in s}),i.isAndroidBrowser=/Android/.test(window.navigator.appVersion)&&/Version\/\d/.test(window.navigator.appVersion),i.extend(i.style={},{transform:o,transitionTimingFunction:t("transitionTimingFunction"),transitionDuration:t("transitionDuration"),transformOrigin:t("transformOrigin")}),i.hasClass=function(t,i){var s=new RegExp("(^|\\s)"+i+"(\\s|$)");return s.test(t.className)},i.addClass=function(t,s){if(!i.hasClass(t,s)){var e=t.className.split(" ");e.push(s),t.className=e.join(" ")}},i.removeClass=function(t,s){if(i.hasClass(t,s)){var e=new RegExp("(^|\\s)"+s+"(\\s|$)","g");t.className=t.className.replace(e,"")}},i.offset=function(t){for(var i=-t.offsetLeft,s=-t.offsetTop;t=t.offsetParent;)i-=t.offsetLeft,s-=t.offsetTop;return{left:i,top:s}},i.extend(i.eventType={},{touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2,MSPointerDown:3,MSPointerMove:3,MSPointerUp:3}),i.extend(i.ease={},{quadratic:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(t){return t*(2-t)}},circular:{style:"cubic-bezier(0.1, 0.57, 0.1, 1)",fn:function(t){return Math.sqrt(1- --t*t)}},back:{style:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",fn:function(t){var i=4;return(t-=1)*t*((i+1)*t+i)+1}},bounce:{style:"",fn:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}},elastic:{style:"",fn:function(t){var i=.22,s=.4;return 0===t?0:1==t?1:s*Math.pow(2,-10*t)*Math.sin((t-i/4)*2*Math.PI/i)+1}}}),i.tap=function(t,i){var s=document.createEvent("Event");s.initEvent(i,!0,!0),s.pageX=t.pageX,s.pageY=t.pageY,t.target.dispatchEvent(s)},i.click=function(t){var i,s=t.target;"SELECT"!=s.tagName&&"INPUT"!=s.tagName&&"TEXTAREA"!=s.tagName&&(i=document.createEvent("MouseEvents"),i.initMouseEvent("click",!0,!0,t.view,1,s.screenX,s.screenY,s.clientX,s.clientY,t.ctrlKey,t.altKey,t.shiftKey,t.metaKey,0,null),i._constructed=!0,s.dispatchEvent(i))},i}();return IScroll.prototype={version:"5.0.8",_init:function(){this._initEvents(),(this.options.scrollbars||this.options.indicators)&&this._initIndicators(),this.options.mouseWheel&&this._initWheel(),this.options.snap&&this._initSnap(),this.options.keyBindings&&this._initKeys()},destroy:function(){this._initEvents(!0),this._execEvent("destroy")},_transitionEnd:function(t){t.target==this.scroller&&(this._transitionTime(0),this.resetPosition(this.options.bounceTime)||this._execEvent("scrollEnd"))},_start:function(t){if(!(1!=utils.eventType[t.type]&&0!==t.button||!this.enabled||this.initiated&&utils.eventType[t.type]!==this.initiated)){this.options.preventDefault&&!utils.isAndroidBrowser&&t.preventDefault();var i,s=t.touches?t.touches[0]:t;this.initiated=utils.eventType[t.type],this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.directionLocked=0,this._transitionTime(),this.isAnimating=!1,this.startTime=utils.getTime(),this.options.useTransition&&this.isInTransition&&(i=this.getComputedPosition(),this._translate(Math.round(i.x),Math.round(i.y)),this.isInTransition=!1),this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=s.pageX,this.pointY=s.pageY,this._execEvent("scrollStart")}},_move:function(t){if(this.enabled&&utils.eventType[t.type]===this.initiated){this.options.preventDefault&&t.preventDefault();var i,s,e,o,n=t.touches?t.touches[0]:t,r=this.hasHorizontalScroll||this.options.alwaysOverscroll?n.pageX-this.pointX:0,h=this.hasVerticalScroll||this.options.alwaysOverscroll?n.pageY-this.pointY:0,a=utils.getTime();if(this.pointX=n.pageX,this.pointY=n.pageY,this.distX+=r,this.distY+=h,e=Math.abs(this.distX),o=Math.abs(this.distY),!(a-this.endTime>300&&10>e&&10>o)){if(this.directionLocked||this.options.freeScroll||(e>o+this.options.directionLockThreshold?(this.directionLocked="h",this._lockOtherScrollers("h")):o>=e+this.options.directionLockThreshold?(this.directionLocked="v",this._lockOtherScrollers("v")):this.directionLocked="n"),"h"==this.directionLocked){if("vertical"==this.options.eventPassthrough)t.preventDefault();else if("horizontal"==this.options.eventPassthrough)return this.initiated=!1,void 0;h=0}else if("v"==this.directionLocked){if("horizontal"==this.options.eventPassthrough)t.preventDefault();else if("vertical"==this.options.eventPassthrough)return this.initiated=!1,void 0;r=0}i=this.x+r,s=this.y+h,(i>0||i<this.maxScrollX)&&(i=this.options.bounce?this.x+r/3:i>0?0:this.maxScrollX),(s>0||s<this.maxScrollY)&&(s=this.options.bounce?this.y+h/3:s>0?0:this.maxScrollY),this.directionX=r>0?-1:0>r?1:0,this.directionY=h>0?-1:0>h?1:0,this.moved=!0,this._translate(i,s),a-this.startTime>300&&(this.startTime=a,this.startX=this.x,this.startY=this.y)}}},_end:function(t){if(this.enabled&&utils.eventType[t.type]===this.initiated){this.options.preventDefault&&t.preventDefault();var i,s,e=(t.changedTouches?t.changedTouches[0]:t,utils.getTime()-this.startTime),o=Math.round(this.x),n=Math.round(this.y),r=Math.abs(o-this.startX),h=Math.abs(n-this.startY),a=0,l="";if(this.scrollTo(o,n),this.isInTransition=0,this.initiated=0,this.endTime=utils.getTime(),!this.resetPosition(this.options.bounceTime)){if(!this.moved)return this.options.tap&&utils.tap(t,this.options.tap),this.options.click&&utils.click(t),void 0;if(this._events.flick&&200>e&&100>r&&100>h)return this._execEvent("flick"),void 0;if(this.options.momentum&&300>e&&(i=this.hasHorizontalScroll?utils.momentum(this.x,this.startX,e,this.maxScrollX,this.options.bounce?this.wrapperWidth:0):{destination:o,duration:0},s=this.hasVerticalScroll?utils.momentum(this.y,this.startY,e,this.maxScrollY,this.options.bounce?this.wrapperHeight:0):{destination:n,duration:0},o=i.destination,n=s.destination,a=Math.max(i.duration,s.duration),this.isInTransition=1,this.options.pageStops)){var c=this.x-this.startX<0?-1:1;Math.abs(o-this.startX)>this.wrapperWidth&&(o=c*this.wrapperWidth+this.startX)}if(this.options.snap){var p=this._nearestSnap(o,n);this.currentPage=p,o=p.x,n=p.y,a=this.options.snapSpeed||Math.max(Math.max(Math.min(r,1e3),Math.min(r,1e3)),300),this.directionX=0,this.directionY=0,l=this.options.bounceEasing,this._execEvent("pageChangePending")}return o!=this.x||n!=this.y?((o>0||o<this.maxScrollX||n>0||n<this.maxScrollY)&&(l=utils.ease.quadratic),this.scrollTo(o,n,a,l),void 0):(this._execEvent("scrollEnd"),void 0)}}},_resize:function(){var t=this;clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){t.refresh()},this.options.resizePolling)},_scrollLock:function(t){this.initiated&&(this.hasHorizontalScroll&&"v"==t.lockDirection?this.initiated=0:this.hasVerticalScroll&&"h"==t.lockDirection&&(this.initiated=0))},_lockOtherScrollers:function(t){var i=document.createEvent("Event");i.initEvent("scrollLock",!0,!0),i.lockDirection=t,window.dispatchEvent(i)},resetPosition:function(t){var i=this.x,s=this.y;return t=t||0,!this.hasHorizontalScroll||this.x>0?i=0:this.x<this.maxScrollX&&(i=this.maxScrollX),!this.hasVerticalScroll||this.y>0?s=0:this.y<this.maxScrollY&&(s=this.maxScrollY),i==this.x&&s==this.y?!1:(this.scrollTo(i,s,t,this.options.bounceEasing),!0)},disable:function(){this.enabled=!1},enable:function(){this.enabled=!0},refresh:function(){if(this.wrapper.offsetHeight,this.wrapperWidth=this.wrapper.clientWidth,this.wrapperHeight=this.wrapper.clientHeight,this.scrollerWidth=this.scroller.scrollWidth,this.scrollerHeight=this.scroller.scrollHeight,this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.maxScrollY=this.wrapperHeight-this.scrollerHeight,this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<0,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<0,this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,this.wrapperOffset=utils.offset(this.wrapper),this._execEvent("refresh"),this.resetPosition(),this.options.snap&&0!==this.pages.length){var t=this._nearestSnap(this.x,this.y);if(this.x==t.x&&this.y==t.y)return;this.currentPage=t,this.scrollTo(t.x,t.y)}},on:function(t,i){this._events[t]||(this._events[t]=[]),this._events[t].push(i)},_execEvent:function(t){if(this._events[t]){var i=0,s=this._events[t].length;if(s)for(;s>i;i++)this._events[t][i].call(this)}},scrollBy:function(t,i,s,e){t=this.x+t,i=this.y+i,s=s||0,this.scrollTo(t,i,s,e)},scrollTo:function(t,i,s,e){e=e||utils.ease.circular,!s||this.options.useTransition&&e.style?(this._transitionTimingFunction(e.style),this._transitionTime(s),this._translate(t,i)):this._animate(t,i,s,e.fn)},scrollToElement:function(t,i,s,e,o){if(t=t.nodeType?t:this.scroller.querySelector(t)){var n=utils.offset(t);n.left-=this.wrapperOffset.left,n.top-=this.wrapperOffset.top,s===!0&&(s=Math.round(t.offsetWidth/2-this.wrapper.offsetWidth/2)),e===!0&&(e=Math.round(t.offsetHeight/2-this.wrapper.offsetHeight/2)),n.left-=s||0,n.top-=e||0,n.left=n.left>0?0:n.left<this.maxScrollX?this.maxScrollX:n.left,n.top=n.top>0?0:n.top<this.maxScrollY?this.maxScrollY:n.top,i=void 0===i||null===i||"auto"===i?Math.max(2*Math.abs(n.left),2*Math.abs(n.top)):i,this.scrollTo(n.left,n.top,i,o)}},_transitionTime:function(t){t=t||0,this.scrollerStyle[utils.style.transitionDuration]=t+"ms",this.indicator1&&this.indicator1.transitionTime(t),this.indicator2&&this.indicator2.transitionTime(t)},_transitionTimingFunction:function(t){this.scrollerStyle[utils.style.transitionTimingFunction]=t,this.indicator1&&this.indicator1.transitionTimingFunction(t),this.indicator2&&this.indicator2.transitionTimingFunction(t)},_translate:function(t,i){this.options.useTransform?this.scrollerStyle[utils.style.transform]="translate("+t+"px,"+i+"px)"+this.translateZ:(t=Math.round(t),i=Math.round(i),this.scrollerStyle.left=t+"px",this.scrollerStyle.top=i+"px"),this.x=t,this.y=i,this.indicator1&&this.indicator1.updatePosition(),this.indicator2&&this.indicator2.updatePosition()},_initEvents:function(t){var i=t?utils.removeEvent:utils.addEvent,s=this.options.bindToWrapper?this.wrapper:window;i(window,"orientationchange",this),i(window,"resize",this),i(window,"scrollLock",this),i(this.wrapper,"mousedown",this),i(s,"mousemove",this),i(s,"mousecancel",this),i(s,"mouseup",this),utils.hasPointer&&(i(this.wrapper,"MSPointerDown",this),i(s,"MSPointerMove",this),i(s,"MSPointerCancel",this),i(s,"MSPointerUp",this)),utils.hasTouch&&(i(this.wrapper,"touchstart",this),i(s,"touchmove",this),i(s,"touchcancel",this),i(s,"touchend",this)),i(this.scroller,"transitionend",this),i(this.scroller,"webkitTransitionEnd",this),i(this.scroller,"oTransitionEnd",this),i(this.scroller,"MSTransitionEnd",this)},getComputedPosition:function(){var t,i,s=window.getComputedStyle(this.scroller,null);return this.options.useTransform?(s=s[utils.style.transform].split(")")[0].split(", "),t=+(s[12]||s[4]),i=+(s[13]||s[5])):(t=+s.left.replace(/[^-\d]/g,""),i=+s.top.replace(/[^-\d]/g,"")),{x:t,y:i}},_initIndicators:function(){var t,i,s=this.options.interactiveScrollbars,e=("object"!=typeof this.options.scrollbars,"string"!=typeof this.options.scrollbars);this.options.scrollbars?(this.options.scrollY&&(t={el:createDefaultScrollbar("v",s,this.options.scrollbars),interactive:s,defaultScrollbars:!0,customStyle:e,resize:this.options.resizeIndicator,listenX:!1},this.wrapper.appendChild(t.el)),this.options.scrollX&&(i={el:createDefaultScrollbar("h",s,this.options.scrollbars),interactive:s,defaultScrollbars:!0,customStyle:e,resize:this.options.resizeIndicator,listenY:!1},this.wrapper.appendChild(i.el))):(t=this.options.indicators.length?this.options.indicators[0]:this.options.indicators,i=this.options.indicators[1]&&this.options.indicators[1]),t&&(this.indicator1=new Indicator(this,t)),i&&(this.indicator2=new Indicator(this,i)),this.on("refresh",function(){this.indicator1&&this.indicator1.refresh(),this.indicator2&&this.indicator2.refresh()}),this.on("destroy",function(){this.indicator1&&(this.indicator1.destroy(),this.indicator1=null),this.indicator2&&(this.indicator2.destroy(),this.indicator2=null)})},_initWheel:function(){utils.addEvent(this.wrapper,"mousewheel",this),utils.addEvent(this.wrapper,"DOMMouseScroll",this),this.on("destroy",function(){utils.removeEvent(this.wrapper,"mousewheel",this),utils.removeEvent(this.wrapper,"DOMMouseScroll",this)})},_wheel:function(t){if(this.enabled){var i,s,e,o,n=this;if(clearTimeout(this.wheelTimeout),this.wheelTimeout=setTimeout(function(){n._execEvent("scrollEnd")},400),t.preventDefault(),"wheelDeltaX"in t)i=t.wheelDeltaX/120,s=t.wheelDeltaY/120;else if("wheelDelta"in t)i=s=t.wheelDelta/120;else{if(!("detail"in t))return;i=s=-t.detail/3}i*=this.options.mouseWheelSpeed,s*=this.options.mouseWheelSpeed,this.hasVerticalScroll||(i=s),e=this.x+(this.hasHorizontalScroll?i*this.options.invertWheelDirection:0),o=this.y+(this.hasVerticalScroll?s*this.options.invertWheelDirection:0),e>0?e=0:e<this.maxScrollX&&(e=this.maxScrollX),o>0?o=0:o<this.maxScrollY&&(o=this.maxScrollY),this.scrollTo(e,o,0)}},_initSnap:function(){this.currentPage={},"string"==typeof this.options.snap&&(this.options.snapElement=this.scroller.querySelectorAll(this.options.snap)),this.on("refresh",function(){var t,i,s,e,o,n=0,r=0,h=0,a=0,l=this.options.snapStepX||this.wrapperWidth,c=this.options.snapStepY||this.wrapperHeight;if(this.pages=[],this.currentPage.pageX=0,this.currentPage.pageY=0,this.options.snap===!0)for(s=Math.round(l/2),e=Math.round(c/2);h>-this.scrollerWidth;){for(this.pages[n]=[],t=0,a=0;a>-this.scrollerHeight;)this.pages[n][t]={x:Math.max(h,this.maxScrollX),y:Math.max(a,this.maxScrollY),width:l,height:c,cx:h-s,cy:a-e},a-=c,t++;h-=l,n++}else for(o=this.scroller.querySelectorAll(this.options.snap),t=o.length,i=-1;t>n;n++)(0===n||o[n].offsetLeft<=o[n-1].offsetLeft)&&(r=0,i++),this.pages[r]||(this.pages[r]=[]),h=Math.max(-o[n].offsetLeft,this.maxScrollX),a=Math.max(-o[n].offsetTop,this.maxScrollY),s=h-Math.round(o[n].offsetWidth/2),e=a-Math.round(o[n].offsetHeight/2),this.pages[r][i]={x:h,y:a,width:o[n].offsetWidth,height:o[n].offsetHeight,cx:s,cy:e},h>this.maxScrollX&&r++;0!==this.pages.length&&(0===this.pages[0].length&&(this.pages[0][0]={x:Math.max(h,this.maxScrollX),y:Math.max(a,this.maxScrollY),width:l,height:c,cx:h-s,cy:a-e}),this.goToPage(this.currentPage.pageX||0,this.currentPage.pageY||0,0),0===this.options.snapThreshold%1?(this.snapThresholdX=this.options.snapThreshold,this.snapThresholdY=this.options.snapThreshold):(this.snapThresholdX=Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width*this.options.snapThreshold),this.snapThresholdY=Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height*this.options.snapThreshold)))}),this.on("flick",function(){var t=this.options.snapSpeed||Math.max(Math.max(Math.min(Math.abs(this.x-this.startX),1e3),Math.min(Math.abs(this.y-this.startY),1e3)),300);this.goToPage(this.currentPage.pageX+this.directionX,this.currentPage.pageY+this.directionY,t)})},_nearestSnap:function(t,i){var s=0,e=this.pages.length,o=0;if(Math.abs(t-this.absStartX)<this.snapThresholdX&&Math.abs(i-this.absStartY)<this.snapThresholdY)return this.currentPage;for(t>0?t=0:t<this.maxScrollX&&(t=this.maxScrollX),i>0?i=0:i<this.maxScrollY&&(i=this.maxScrollY);e>s;s++)if(t>=this.pages[s][0].cx){t=this.pages[s][0].x;break}for(e=this.pages[s].length;e>o;o++)if(i>=this.pages[0][o].cy){i=this.pages[0][o].y;break}return s==this.currentPage.pageX&&(s+=this.directionX,0>s?s=0:s>=this.pages.length&&(s=this.pages.length-1),t=this.pages[s][0].x),o==this.currentPage.pageY&&(o+=this.directionY,0>o?o=0:o>=this.pages[0].length&&(o=this.pages[0].length-1),i=this.pages[0][o].y),{x:t,y:i,pageX:s,pageY:o}},goToPage:function(t,i,s,e){e=e||this.options.bounceEasing,this.pages.length>0&&t>=this.pages.length?t=this.pages.length-1:0>t&&(t=0),this.pages[0].length>0&&i>=this.pages[0].length?i=this.pages[0].length-1:0>i&&(i=0);var o=this.pages[t][i].x,n=this.pages[t][i].y;s=void 0===s?this.options.snapSpeed||Math.max(Math.max(Math.min(Math.abs(o-this.x),1e3),Math.min(Math.abs(n-this.y),1e3)),300):s,this.currentPage={x:o,y:n,pageX:t,pageY:i},this._execEvent("pageChangePending"),this.scrollTo(o,n,s,e)},next:function(t,i){var s=this.currentPage.pageX,e=this.currentPage.pageY;s++,s>=this.pages.length&&this.hasVerticalScroll&&(s=0,e++),this.goToPage(s,e,t,i)},prev:function(t,i){var s=this.currentPage.pageX,e=this.currentPage.pageY;s--,0>s&&this.hasVerticalScroll&&(s=0,e--),this.goToPage(s,e,t,i)},_initKeys:function(){var t,i={pageUp:33,pageDown:34,end:35,home:36,left:37,up:38,right:39,down:40};if("object"==typeof this.options.keyBindings)for(t in this.options.keyBindings)"string"==typeof this.options.keyBindings[t]&&(this.options.keyBindings[t]=this.options.keyBindings[t].toUpperCase().charCodeAt(0));else this.options.keyBindings={};for(t in i)this.options.keyBindings[t]=this.options.keyBindings[t]||i[t];utils.addEvent(window,"keydown",this),this.on("destroy",function(){utils.removeEvent(window,"keydown",this)})},_key:function(t){if(this.enabled){var i,s=this.options.snap,e=s?this.currentPage.pageX:this.x,o=s?this.currentPage.pageY:this.y,n=utils.getTime(),r=this.keyTime||0,h=.25;switch(this.options.useTransition&&this.isInTransition&&(i=this.getComputedPosition(),this._translate(Math.round(i.x),Math.round(i.y)),this.isInTransition=!1),this.keyAcceleration=200>n-r?Math.min(this.keyAcceleration+h,50):0,t.keyCode){case this.options.keyBindings.pageUp:this.hasHorizontalScroll&&!this.hasVerticalScroll?e+=s?1:this.wrapperWidth:o+=s?1:this.wrapperHeight;break;case this.options.keyBindings.pageDown:this.hasHorizontalScroll&&!this.hasVerticalScroll?e-=s?1:this.wrapperWidth:o-=s?1:this.wrapperHeight;break;case this.options.keyBindings.end:e=s?this.pages.length-1:this.maxScrollX,o=s?this.pages[0].length-1:this.maxScrollY;break;case this.options.keyBindings.home:e=0,o=0;break;case this.options.keyBindings.left:e+=s?-1:5+this.keyAcceleration>>0;break;case this.options.keyBindings.up:o+=s?1:5+this.keyAcceleration>>0;break;case this.options.keyBindings.right:e-=s?-1:5+this.keyAcceleration>>0;break;case this.options.keyBindings.down:o-=s?1:5+this.keyAcceleration>>0}if(s)return this.goToPage(e,o),void 0;e>0?(e=0,this.keyAcceleration=0):e<this.maxScrollX&&(e=this.maxScrollX,this.keyAcceleration=0),o>0?(o=0,this.keyAcceleration=0):o<this.maxScrollY&&(o=this.maxScrollY,this.keyAcceleration=0),this.scrollTo(e,o,0),this.keyTime=n}},_animate:function(t,i,s,e){function o(){var c,p,u,d=utils.getTime();return d>=l?(n.isAnimating=!1,n._translate(t,i),n.resetPosition(n.options.bounceTime)||n._execEvent("scrollEnd"),void 0):(d=(d-a)/s,u=e(d),c=(t-r)*u+r,p=(i-h)*u+h,n._translate(c,p),n.isAnimating&&rAF(o),void 0)}var n=this,r=this.x,h=this.y,a=utils.getTime(),l=a+s;this.isAnimating=!0,o()},handleEvent:function(t){switch(t.type){case"touchstart":case"MSPointerDown":case"mousedown":this._start(t);break;case"touchmove":case"MSPointerMove":case"mousemove":this._move(t);break;case"touchend":case"MSPointerUp":case"mouseup":case"touchcancel":case"MSPointerCancel":case"mousecancel":this._end(t);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(t);break;case"DOMMouseScroll":case"mousewheel":this._wheel(t);break;case"keydown":this._key(t);break;case"scrollLock":this._scrollLock(t)}}},Indicator.prototype={handleEvent:function(t){switch(t.type){case"touchstart":case"MSPointerDown":case"mousedown":this._start(t);break;case"touchmove":case"MSPointerMove":case"mousemove":this._move(t);break;case"touchend":case"MSPointerUp":case"mouseup":case"touchcancel":case"MSPointerCancel":case"mousecancel":this._end(t)}},destroy:function(){this.options.interactive&&(utils.removeEvent(this.indicator,"touchstart",this),utils.removeEvent(this.indicator,"MSPointerDown",this),utils.removeEvent(this.indicator,"mousedown",this),utils.removeEvent(window,"touchmove",this),utils.removeEvent(window,"MSPointerMove",this),utils.removeEvent(window,"mousemove",this),utils.removeEvent(window,"touchend",this),utils.removeEvent(window,"MSPointerUp",this),utils.removeEvent(window,"mouseup",this)),this.options.defaultScrollbars&&this.wrapper.parentNode.removeChild(this.wrapper)},_start:function(t){var i=t.touches?t.touches[0]:t;t.preventDefault(),t.stopPropagation(),this.transitionTime(0),this.initiated=!0,this.moved=!1,this.lastPointX=i.pageX,this.lastPointY=i.pageY,this.startTime=utils.getTime(),utils.addEvent(window,"touchmove",this),utils.addEvent(window,"MSPointerMove",this),utils.addEvent(window,"mousemove",this),this.scroller._execEvent("scrollStart")},_move:function(t){var i,s,e,o,n=t.touches?t.touches[0]:t;utils.getTime(),this.moved=!0,i=n.pageX-this.lastPointX,this.lastPointX=n.pageX,s=n.pageY-this.lastPointY,this.lastPointY=n.pageY,e=this.x+i,o=this.y+s,this._pos(e,o),t.preventDefault(),t.stopPropagation()},_end:function(t){this.initiated&&(this.initiated=!1,t.preventDefault(),t.stopPropagation(),utils.removeEvent(window,"touchmove",this),utils.removeEvent(window,"MSPointerMove",this),utils.removeEvent(window,"mousemove",this),this.moved&&this.scroller._execEvent("scrollEnd"))},transitionTime:function(t){t=t||0,this.indicatorStyle[utils.style.transitionDuration]=t+"ms"},transitionTimingFunction:function(t){this.indicatorStyle[utils.style.transitionTimingFunction]=t},refresh:function(){this.transitionTime(0),this.indicatorStyle.display=this.options.listenX&&!this.options.listenY?this.scroller.hasHorizontalScroll?"block":"none":this.options.listenY&&!this.options.listenX?this.scroller.hasVerticalScroll?"block":"none":this.scroller.hasHorizontalScroll||this.scroller.hasVerticalScroll?"block":"none",this.scroller.hasHorizontalScroll&&this.scroller.hasVerticalScroll?(utils.addClass(this.wrapper,"iScrollBothScrollbars"),utils.removeClass(this.wrapper,"iScrollLoneScrollbar"),this.options.defaultScrollbars&&this.options.customStyle&&(this.options.listenX?this.wrapper.style.right="8px":this.wrapper.style.bottom="8px")):(utils.removeClass(this.wrapper,"iScrollBothScrollbars"),utils.addClass(this.wrapper,"iScrollLoneScrollbar"),this.options.defaultScrollbars&&this.options.customStyle&&(this.options.listenX?this.wrapper.style.right="2px":this.wrapper.style.bottom="2px")),this.wrapper.offsetHeight,this.options.listenX&&(this.wrapperWidth=this.wrapper.clientWidth,this.options.resize?(this.indicatorWidth=Math.max(Math.round(this.wrapperWidth*this.wrapperWidth/this.scroller.scrollerWidth),8),this.indicatorStyle.width=this.indicatorWidth+"px"):this.indicatorWidth=this.indicator.clientWidth,this.maxPosX=this.wrapperWidth-this.indicatorWidth,this.sizeRatioX=this.options.speedRatioX||this.scroller.maxScrollX&&this.maxPosX/this.scroller.maxScrollX),this.options.listenY&&(this.wrapperHeight=this.wrapper.clientHeight,this.options.resize?(this.indicatorHeight=Math.max(Math.round(this.wrapperHeight*this.wrapperHeight/this.scroller.scrollerHeight),8),this.indicatorStyle.height=this.indicatorHeight+"px"):this.indicatorHeight=this.indicator.clientHeight,this.maxPosY=this.wrapperHeight-this.indicatorHeight,this.sizeRatioY=this.options.speedRatioY||this.scroller.maxScrollY&&this.maxPosY/this.scroller.maxScrollY),this.updatePosition()},updatePosition:function(){var t=Math.round(this.sizeRatioX*this.scroller.x)||0,i=Math.round(this.sizeRatioY*this.scroller.y)||0;this.options.ignoreBoundaries||(0>t?t=0:t>this.maxPosX&&(t=this.maxPosX),0>i?i=0:i>this.maxPosY&&(i=this.maxPosY)),this.x=t,this.y=i,this.scroller.options.useTransform?this.indicatorStyle[utils.style.transform]="translate("+t+"px,"+i+"px)"+this.scroller.translateZ:(this.indicatorStyle.left=t+"px",this.indicatorStyle.top=i+"px")},_pos:function(t,i){0>t?t=0:t>this.maxPosX&&(t=this.maxPosX),0>i?i=0:i>this.maxPosY&&(i=this.maxPosY),t=this.options.listenX?Math.round(t/this.sizeRatioX):this.scroller.x,i=this.options.listenY?Math.round(i/this.sizeRatioY):this.scroller.y,this.scroller.scrollTo(t,i)}},"object"==typeof angular&&"object"==typeof angular.version&&angular.module("iscroll",[]).directive("iscrollable",function($parse,$timeout){return{restrict:"A",require:"?ngModel",link:function(scope,element,attrs,controller){var opt=eval("({"+attrs.iscrollable+"})"),iscroll=new IScroll(element[0],opt);scope.currentPage=iscroll.currentPage;var refresh=function(){$timeout(function(){scope.currentPage=iscroll.currentPage})};$timeout(refresh,500),iscroll.on("pageChangePending",refresh),iscroll.on("scrollEnd",refresh),scope.$on("layoutChange",function(){iscroll.refresh()})}}}),IScroll.ease=utils.ease,IScroll}(window,document,Math);