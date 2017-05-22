function throttle(fn, threshhold = 250) {
  let last;
  let deferTimer;

  return function (...args) {
    const context = this;
    const now = +new Date;

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold)
    } else {
      last = now;
      fn.apply(context, args);
    }
  }
}

export default throttle;
