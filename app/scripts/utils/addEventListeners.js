const addEventListeners = (el, events, fn) =>
  events.split(' ').forEach(e => el.addEventListener(e, fn, false));

export default addEventListeners;

