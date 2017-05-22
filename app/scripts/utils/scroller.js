import addEventListeners from './addEventListeners';

class Scroller {
  constructor () {
    this.pos = 0;
    this.body = document.documentElement || document.body.parentNode || document.body; // cross browser handling
    this.bindEvents();
  }

  bindEvents () {
    addEventListeners(window, 'load resize scroll', this.setPos.bind(this));
  }

  setPos () {
    this.pos = window.pageYOffset ? window.pageYOffset : this.body.scrollTop;
  }
}

export default new Scroller();
