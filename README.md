iScroll v4.0 Beta 4
======================

The overflow:scroll for mobile webkit. Project started because webkit for iPhone does not provide a native way to scroll content inside a fixed size (width/height) div. So basically it was impossible to have a fixed header/footer and a scrolling central area. Until now. Read more at [cubiq.org](http://cubiq.org).

## Changes from main/upstream version of iScroll
- Added event "snapping" that is triggered when iScroll starts to snap towards a page. Very useful for carousel type uses.
- The dragging on the desktop now more closely mimics dragging on a touch enabled device. Specifically what happens if you drag beyond the edge of the iScroll div. This was done by binding mouse move and mouse up events to the document body rather than the iScroll div. 
- Added preventDefaultEvents option. Defaults to true. Disabling this can be handy if you want to do things like fast touch buttons within an iscroll div. 

## Credits and Special thanks
iScroll is evolving thank to the help of all those who sent suggestions, bug reports and ideas on [github](https://github.com/cubiq/iscroll), my [blog](http://cubiq.org) and [googlecode](http://code.google.com/p/iscroll-js/). This is by no means the work of a sole man.

In completely random order:

- [beedesk](http://beedesk.com) for bug squashing in the pull to refresh feature
- [Daniel J. Pinter](http://twitter.com/#!/HeadDZombie) for continued support, bug reports and for killing zombies
- [Aseem Kishore](http://about.me/aseemk) for help with the zoom functionality
- [Alex Gibson](http://miniapps.co.uk/) for continued support and bug reports
- [Christoph Pojer](http://cpojer.net) for ideas, suggestions and bug reports
- [Shimon Dookdin](https://github.com/shimondoodkin) for help with wheel support
- [Will Bailey](http://blog.thirtymontgomery.com/) for commonJS compatibility
- [Aaron Infidel](https://github.com/aaroninfidel) for bug reports and continued support
- All those who supported, linked, loved the iScroll
- I'm sure I'm missing someone, sorry about that. If you helped in the script development and you don't see your name here, please drop me a line
