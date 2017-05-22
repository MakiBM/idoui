import scroller from './scroller';
import timestamp from './timestamp';
import {easeOutQuint} from './easings';

function smoothScroll (destination, duration = 200, easing = easeOutQuint, callback) {
  const start = scroller.pos;
  const startTime = timestamp();
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  const windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset =
    (typeof destination === 'number')
      ? destination
      : destination.getBoundingClientRect().top + scroller.pos;
  const destinationOffsetToScroll = Math.round(
    (documentHeight - destinationOffset < windowHeight)
      ? documentHeight - windowHeight
      : destinationOffset
  )

  function scroll() {
    const now = timestamp();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easing(time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll || 'requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) callback();
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

export default smoothScroll;
