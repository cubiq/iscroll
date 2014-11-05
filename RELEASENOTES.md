# Release notes for iScroll

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