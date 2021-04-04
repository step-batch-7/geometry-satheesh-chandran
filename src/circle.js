const Point = require('./point');

class Circle {
  constructor(a, radius) {
    this.origin = new Point(a.x, a.y);
    this.radius = radius;
    Object.freeze(this);
  }

  toString() {
    return `[Circle @(${this.origin.points.x},${this.origin.points.y}) radius ${this.radius}]`;
  }

  isEqualTo(other) {
    return this.origin.isEqualTo(other.origin) && this.radius == other.radius;
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }

  get perimeter() {
    return 2 * Math.PI * this.radius;
  }

  hasPoint(point) {
    if (!(point instanceof Point)) {
      return false;
    }
    const { x, y } = point.points;
    const { x: g, y: h } = this.origin.points;
    return (x - g) ** 2 + (y - h) ** 2 == this.radius ** 2;
  }

  moveTo(point) {
    return new Circle(point, this.radius);
  }

  covers(point) {
    if (!(point instanceof Point)) {
      return false;
    }
    const { x, y } = point.points;
    const { x: g, y: h } = this.origin.points;
    return (x - g) ** 2 + (y - h) ** 2 < this.radius ** 2;
  }
}

module.exports = Circle;
