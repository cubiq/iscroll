module.exports = {
  eventType: undefined,     // what event type will be used. undefined = autodetect
  'document': document,     // the bottom most DOM element used for "move" and "end" events
  preventDefault: true,

  // scrolling
  allowOverscroll: true,
  scrollY: true,
  scrollX: false,

  // events
  onReady: undefined
};