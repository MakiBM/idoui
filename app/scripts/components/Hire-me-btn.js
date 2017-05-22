import smoothScroll from '../utils/smoothScroll';

class HireMeBtn {
  constructor (query) {
    this.cacheElements(query);
    this.bindEvents();
  }

  cacheElements (query) {
    this.btn = document.querySelector(query);
  }

  bindEvents () {
    this.btn.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick (e) {
    e.preventDefault();
    const target = document.querySelector('#contact')
    smoothScroll(target, 500);
  }
}

export default new HireMeBtn('.js-Hire-me-btn');
