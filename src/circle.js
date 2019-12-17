const Point = require('./point');

class Circle {
  constructor(a, b) {
    this.o = new Point(a.x, a.y);
    this.r = b;
  }
  toString() {
    return `[Circle @(${this.o.x},${this.o.y}) radius ${this.r}]`;
  }
}

module.exports = Circle;
