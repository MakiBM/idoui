import smoothScroll from '../utils/smoothScroll';
import scroller from '../utils/scroller';
import throttle from '../utils/throttle';

class Nav {
  constructor (query) {
    this.cacheElements(query);
    this.setVals();
    this.bindEvents();
  }

  cacheElements (query) {
    this.smoothActive = false;
    this.nav = document.querySelector(query);
    this.links = Array.from(this.nav.querySelectorAll('a'));
    const hashes = this.links.map(link => link.getAttribute('href')).join(',');
    this.targets = Array.from(document.querySelectorAll(hashes));
    this.currentActive = this.links[0];
  }

  bindEvents () {
    this.nav.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 100));
    window.addEventListener('load', this.setVals.bind(this));
  }

  handleClick (e) {
    e.preventDefault();
    const id = this.links.indexOf(e.target);
    this.smoothActiveToggle();
    this.setActive(e.target);
    setTimeout(this.smoothActiveToggle.bind(this), 500);
    smoothScroll(this.targets[id], 500);
  }

  handleScroll () {
    if (this.smoothActive) return;
    if (scroller.pos >= this.documentHeight - this.windowHeight - 100) {
      this.setActive(this.links.slice(-1)[0]);
      return;
    }
    const targets = this.targets;
    const isScrolledToTarget = (_, id) => targets[id].getBoundingClientRect().top <= 0;
    const lastLink = this.links.filter(isScrolledToTarget).slice(-1)[0];

    this.setActive(lastLink);
  }

  setActive (link) {
    if (this.currentActive != link) {
      link.classList.add('is-active');
      this.currentActive.classList.remove('is-active');
      this.currentActive = link;
    }
  }

  setVals () {
    this.documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    this.windowHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.getElementsByTagName('body')[0].clientHeight;
  }

  smoothActiveToggle () {
    this.smoothActive = !this.smoothActive;
  }
}

export default new Nav('.js-Nav');
