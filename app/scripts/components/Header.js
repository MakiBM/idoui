import addEventListeners from '../utils/addEventListeners';
import scroller from '../utils/scroller';

class Header {
  constructor (query) {
    this.cacheElements(query);
    this.bindEvents();
  }

  cacheElements (query) {
    this.header = document.querySelector(query);
  }

  bindEvents () {
    addEventListeners(window, 'load scroll resize', this.toggle.bind(this));
  }

  toggle () {
    if (scroller.pos == 0 || window.matchMedia('(max-width: 768px)').matches) this.header.classList.remove('is-fixed');
    else this.header.classList.add('is-fixed');
  }
}

export default new Header('.js-Header');
