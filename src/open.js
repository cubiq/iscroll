if (typeof window == 'undefined' && typeof module != 'undefined')
  module.exports = { __disabled: 'No SSR support' };
else

(function (window, document, Math) {
