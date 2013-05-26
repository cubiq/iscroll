# iScroll 5 beta 1

Detailed documentation soon to come. In the meantime please reference to the examples in the demos directory.
Note: The global variable in iScroll 5 is called `IScroll` while it was `iScroll` in verion 4.

## Getting Started
Once you have embedded iScroll 5 in your page, this is how you create an iScroll instance:
```javascript
var myscrollview = new IScroll("#myid");
```
The `IScroll` constructor excepts two arguments: `new iScroll(selector, options);
`selector` is a css selecor as you know it from jQuery or `querySelector`.
`options` is an object of options you can supply to the constructor.

### Options

#### options.resizeIndicator
Type: `Boolean`
Default value: `true`

Description goes here.

#### options.snapThreshold
Type: `Number`
Default value: `10`

Description goes here.

#### options.startX
Type: `Number`
Default value: `0`

The starting position of the scroller on the x-axis.

#### options.startY
Type: `Number`
Default value: `0`

The starting position of the scroller on the y-axis.

#### options.scrollY
Type: `Boolean`
Default value: `true`

Description goes here.

#### options.lockDirection
Type: `Boolean`
Default value: `true`

Prevent scroller from scrolling on both x- and y-axis.

#### options.directionLockThreshold
Type: `Number`
Default value: `5`

The number of pixels that need to be moved in one direction to trigger a direction lock for that direction.

#### options.momentum
Type: `Boolean`
Default value: `true`

Wheather the scroller should keep scrolling with some deaccelerating velocity after touchend.

#### options.bounce
Type: `Boolean`
Default value: `true`

Wheather the scroller should bounce on the edges.

#### options.bounceTime
Type: `Number`
Default value: `600`

Description goes here.

#### options.bounceEasing
Type: `String`
Default value: `''`

One of the predefined bounce easing functions: quadratic, circular, back, bounce or elastic.

#### options.preventDefault
Type: `Boolean`
Default value: `true`

Prevent default scroll handling of the browser.

#### options.HWCompositing
Type: `Boolean`
Default value: `true`

Use GPU to speed up compositing.

#### options.useTransition
Type: `Boolean`
Default value: `true`

Wheather to use CSS transitions. If set to false, IScroll falls back to requestAnimationFrame.

#### options.useTransform
Type: `Boolean`
Default value: `true`

Description goes here.

#### options.eventPassthrough
Type: `Boolean`
Default value: `undefined`

Description goes here.

#### options.tap
Type: `Boolean`
Default value: `undefined`

Description goes here.

#### options.invertWheelDirection
Type: `Boolean`
Default value: `undefined`

Description goes here.

#### options.scrollbars
Type: `Boolean`
Default value: `undefined`

Description goes here.

#### options.indicators
Type: `Boolean`
Default value: `undefined`

Description goes here.

#### options.mouseWheel
Type: `Boolean`
Default value: `undefined`

Description goes here.

#### options.snap
Type: `Boolean`
Default value: `undefined`

Description goes here.

#### options.keyBindings
Type: `Boolean`
Default value: `undefined`

Description goes here.


## Build system (for developers only)

iScroll comes with a custom build system. The required nodejs packages are included in the package.json. To build all main releases just do:

	./build.js dist

The compiled scripts will be saved in the /build and /dist directories.
