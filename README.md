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

### options
Here is quick options object overview:
```javascript
new IScroll("#example", {
  // define starting position of scroller
  startX: 0,
  startY: 0,

  scrollY: true,
  lockDirection: true,
  directionLockThreshold: 5,
  momentum: true,

  bounce: true,
  bounceTime: 600,
  bounceEasing: '',

  preventDefault: true,

  // use hardware compositing
  HWCompositing: true,
  // use transition (falls back to requestAnimationFrame if false)
  useTransition: true,
  // use transforms
  useTransform: true
});
```

## Build system (for developers only)

iScroll comes with a custom build system. The required nodejs packages are included in the package.json. To build all main releases just do:

	./build.js dist

The compiled scripts will be saved in the /build and /dist directories.
