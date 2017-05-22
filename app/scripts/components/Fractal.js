import scroller from '../utils/scroller';

class Fractal {
  constructor (query) {
    this.canvas = document.querySelector(query);
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions()

    this.progress = 0.5;
    this.run();
    window.addEventListener('scroll', this.run.bind(this));
  }

  run () {
    this.progress += scroller.pos / 10000;
    window.requestAnimationFrame(() => this.draw(this.progress));
  }

  drawTriangle (p0, p1, p2) {
    this.ctx.beginPath();
    this.ctx.moveTo(p0[0], p0[1]);
    this.ctx.lineTo(p1[0], p1[1]);
    this.ctx.lineTo(p2[0], p2[1]);
    this.ctx.fillStyle = '#000';
    this.ctx.fill();
  }

  sierpinski (p0, p1, p2, limit, progress) {
    if (limit > 0) {
      const a = progress;
      const b = -a * 2;
      const tx = 0.5 + Math.sin(a) * 0.05;
      const ty = 0.5 + Math.sin(b) * 0.25;
      const pA = [p0[0] + (p1[0] - p0[0]) * tx, p0[1] + (p1[1] - p0[1]) * ty];
      const pB = [p1[0] + (p2[0] - p1[0]) * tx, p1[1] + (p2[1] - p1[1]) * ty];
      const pC = [p2[0] + (p0[0] - p2[0]) * tx, p2[1] + (p0[1] - p2[1]) * ty];
      this.sierpinski(p0, pA, pC, limit - 1, progress);
      this.sierpinski(pA, p1, pB, limit - 1, progress);
      this.sierpinski(pC, pB, p2, limit - 1, progress);
    } else {
      this.drawTriangle(p0, p1, p2);
    }
  }

  draw (progress) {
    // if (progress < 0.025) return
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.rotate(progress  * 0.25);
    const p0 = [0, -321];
    const p1 = [278, 160];
    const p2 = [-278, 160];
    this.sierpinski(p0, p1, p2, 7, progress);
    this.ctx.restore();
  }

  setDimensions () {
    this.width = this.canvas.width = window.innerWidth / 2;
    this.height = this.canvas.height = window.innerHeight;
  }
}

export default new Fractal('.js-Fractal');
