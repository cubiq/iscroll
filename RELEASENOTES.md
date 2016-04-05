# Release notes for iScroll

---

##  Version 5.2.0 - 2016.04.05

### Fixes
* Fixes weird scrolling in Chrome (#760, #441, #943, #927, #780)
* [#1009](https://github.com/cubiq/iscroll/issues/1009) fixes utils.prefixPointerEvent method
* [#1018](https://github.com/cubiq/iscroll/issues/1018), [#652](https://github.com/cubiq/iscroll/issues/652) fixes directionX/Y when scrolling with mouse
* [#924](https://github.com/cubiq/iscroll/issues/924), [#950](https://github.com/cubiq/iscroll/issues/950) clean up timer on destroy
* [#949](https://github.com/cubiq/iscroll/issues/949) removes unnecesary style values on wrapper when useTransition option is 'false'
* [#361](https://github.com/cubiq/iscroll/issues/361) fixes two click/tap events issue
* [#980](https://github.com/cubiq/iscroll/issues/980) fixes event propagation for wheel event
* [#768](https://github.com/cubiq/iscroll/issues/768) fixes indicators
* [#761](https://github.com/cubiq/iscroll/issues/761) fixes two scrollEnd events issue
* Fixes 'click' event is not fired when iScroll is disabled

### Changes
* Added AMD support
* Changed default value of disableMouse/disableTouch/disablePointer options
* Removed CLA non-sense

---

##  Version 5.1.3 - 2014.09.19

### Fixes
* [#577](https://github.com/cubiq/iscroll/issues/577) fixes scrolling in Firefox

---

##  Version 5.1.2 - 2014.06.02

### Fixes
* [#707](https://github.com/cubiq/iscroll/pull/707) fixes build fail when dist folder does not exist
* [#713](https://github.com/cubiq/iscroll/pull/713) Adds W3C pointer support and fixes issue with `MSPointerEvent` detection

---

##  Version 5.1.1 - 2014.01.10

### Fixes
* Infinite scroll now switch from `transform` to `top/left` based on `useTransform` option
* [#555](https://github.com/cubiq/iscroll/issues/555) removed unused variable
* [#372](https://github.com/cubiq/iscroll/issues/372) case insensitive check on tag names

### New features
* New `off` method to unload custom events
* Added `options.deceleration` to alter the momentum duration/speed
* Added release notes file

---

##  Version 5.1.0 - 2014.01.09

### Fixes
* [#558](https://github.com/cubiq/iscroll/issues/558) false positive for `isBadAndroid`

### New features
* Infinite scrolling
* Documentation
* `_execEvent` supports arguments

### Changes
* dist/minified files are no longer pushed to the main repo

---

*I started collecting release notes from version 5.1.0*
