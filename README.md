iScroll fork v4.1.9.2 - 2012-05-31
===========================

## Branch History:
 * Merged and Fixed oversized wrapper height: https://github.com/meckdahl
 * Android and optimization: https://github.com/LeoDutra

Bug resolved was observed in:
Safari version Version 5.1.4 (6534.54.16)
iOS 4.x Safari
- Scroll failed to work and just sprung back to starting point.

Issue due to clientHeight in usage case returned the same height for both wrapper and scroller.

This caused the expected scroll region to be zero. Height = ABS(wrapperHeight - scrollerHeight)

The wrapper height was pushed to its parent, which returned the correct (viewport) height.

Note:  This was inside Spine.JS webapp.

Enjoy,

Mark Eckdahl
www.schedulemax.com

iScroll v4.1.9 - 2011-09-22
===========================

The overflow:scroll for mobile webkit. Project started because webkit for iPhone does not provide a native way to scroll content inside a fixed size (width/height) div. So basically it was impossible to have a fixed header/footer and a scrolling central area. Until now. Read more at [cubiq.org](http://cubiq.org).

## Ender support
Using [Ender](http://ender.no.de), add it to your existing build

    $ ender add iscroll

Use it like this:

``` js
var myScroll = $('#doc').iScroll(options)
```

## Credits and Special thanks
iScroll is evolving thank to the help of all those who sent suggestions, bug reports and ideas on [github](https://github.com/cubiq/iscroll), my [blog](http://cubiq.org) and [googlecode](http://code.google.com/p/iscroll-js/). This is by no means the work of a sole man.

In completely random order:

- All Github [contributors](https://github.com/cubiq/iscroll/contributors)
- [beedesk](http://beedesk.com) for bug squashing in the pull to refresh feature
- [Daniel J. Pinter](http://twitter.com/#!/HeadDZombie) for continued support, bug reports and for killing zombies
- [Aseem Kishore](http://about.me/aseemk) for help with the zoom functionality
- [Alex Gibson](http://miniapps.co.uk/) for continued support and bug reports
- [Christoph Pojer](http://cpojer.net) for ideas, suggestions and bug reports
- [Shimon Dookdin](https://github.com/shimondoodkin) for help with wheel support
- [Will Bailey](http://blog.thirtymontgomery.com/) for commonJS compatibility
- [Aaron Reisman](https://github.com/lifeiscontent) for bug reports and continued support
- [David Haslem](https://github.com/therabidbanana) for suggestions and bug reports
- [gingertom](https://github.com/gingertom) for suggestions and bug reports
- [David Alan Hjelle](https://github.com/dahjelle) for bug squashing
- [iangilman](https://github.com/iangilman) for help with the zoom functionality
- All those who supported, linked, loved the iScroll
- I'm sure I'm missing someone, sorry about that. If you helped in the script development and you don't see your name here, please drop me a line
