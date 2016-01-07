/**
 * Part, detects environment, supports, etc
 *
 */
'use strict';

/**
 * detectVendorPrefix
 * Browser vendor, used to apply CSS properties
 * @param {Object} detects - object to write detected data
 */
const detectVendorPrefix = detects => {
  let elementStyle = document.createElement('div').style;
  let vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
  let vendor = false;

  for (let i = 0, l = vendors.length; i < l; i++) {
    if (vendors[i] + 'ransform' in elementStyle) {
      vendor = vendors[i].substr(0, vendors[i].length - 1);
      break;
    }
  }

  detects.vendor = vendor;
};

/**
 * prefixCSSProperty
 * If needed prefix the CSS property with the vendor specific version
 * @param {string}   style - property to prefix
 * @param {Object} detects - object to write detected data
 */
const prefixCSSProperty = (style, detects) => {
  let { vendor} = detects;

  if (vendor === false) {
    return false;
  }

  var elementStyle = document.createElement('div').style;
  style = vendor === '' ? style : vendor + style.charAt(0).toUpperCase() + style.substr(1);
  return style in elementStyle && style;
};

/**
 * detectPointerEvents
 * Find what kind of events supports on client
 * @param {Object} detects - object to write detected data
 */
const detectPointerEvents = detects => {

  Object.assign(detects, {
    hasPointerEvents: !!window.navigator.pointerEnabled,
    hasMSpointerEvents: !!window.navigator.msPointerEnabled,

    // we are going to use user agent spoofing to prevent touch events on desktop. TODO: can it be done w/o spoofing?
    useTouchEvents: ('ontouchstart' in window) && /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(window.navigator.userAgent),
  });

  detects.useMouseEvents = !detects.hasPointerEvents && !detects.hasMSpointerEvents && !detects.useTouchEvents;
};

/**
 * apply
 * Extend object with calculated client data
 * @param {object} IscrollPrototype - target object
 */
export default IscrollPrototype => {
  IscrollPrototype.detects = {};
  IscrollPrototype.styles = {};
  let { detects, styles } = IscrollPrototype;

  // run detects;
  detectPointerEvents(detects);
  detectVendorPrefix(detects);

  // run style prefixes (#should move out of here soon)
  Object.assign(styles, {
    transform: prefixCSSProperty('transform', detects),
    transitionDuration: prefixCSSProperty('transitionDuration', detects),
  });
};
