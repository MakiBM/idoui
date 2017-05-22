const timestamp = () =>
  'now' in window.performance ? performance.now() : new Date().getTime();

export default timestamp;
