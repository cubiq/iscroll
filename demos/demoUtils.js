// https://github.com/WICG/EventListenerOptions/pull/30
function isPassive() {
    var supportsCaptureOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'capture', {
            get: function () {
                supportsCaptureOption = true;
            }
        }));
    } catch(e) {}
    return supportsCaptureOption;
}
  		  