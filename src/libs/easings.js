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


export { inertia };