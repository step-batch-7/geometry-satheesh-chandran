const Point = require('./point');

class Circle {
  constructor(a, b) {
    this.o = new Point(a.x, a.y);
    this.r = b;
  }
  toString() {
    return `[Circle @(${this.o.x},${this.o.y}) radius ${this.r}]`;
  }
  isEqualTo(other) {
    return this.o.isEqualTo(other.o) && this.r == other.r;
  }

  get area() {
    return Math.PI * this.r * this.r;
  }

  get perimeter() {
    return 2 * Math.PI * this.r;
  }

  hasPoint(p) {
    const x = p.x;
    const y = p.y;
    const g = this.o.x;
    const h = this.o.y;
    return (x - g) ** 2 + (y - h) ** 2 == this.r ** 2;
  }

  isOn(c) {
    return c.hasPoint(this);
  }

  moveTo(point) {
    return new Circle(point, this.r);
  }

  covers(p) {
    const x = p.x;
    const y = p.y;
    const g = this.o.x;
    const h = this.o.y;
    return (x - g) ** 2 + (y - h) ** 2 <= this.r ** 2;
  }
}

module.exports = Circle;
