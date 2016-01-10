/**
 * Easings collection
 */

/**
 * Inertia easing
 * @param {Number} currentFrame
 * @param {Number} currentValue
 * @param {Number} ammountOfChange
 * @param {Number} totalFrames
 */
const inertia = (t, b, c, d) => {
  return c*((t=t/d-1)*t*t + 1) + b;
};

/**
 * Inertia easing
 * @param {Number} currentFrame
 * @param {Number} currentValue
 * @param {Number} ammountOfChange
 * @param {Number} totalFrames
 */
const outQuartic = (t, b, c, d) => {
  var ts=(t/=d)*t;
  var tc=ts*t;
  return b+c*(-1*ts*ts + 4*tc + -6*ts + 4*t);
}


export { inertia, outQuartic };