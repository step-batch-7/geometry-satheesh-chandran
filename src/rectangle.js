const Line = require('./line');

class Rectangle {
  constructor(end1, end2) {
    this.diagonal = new Line(end1, end2);
    this.length = Math.abs(end1.x - end2.x);
    this.breadth = Math.abs(end1.y - end2.y);
  }

  toString() {
    return `[Rectangle (${this.diagonal.pointA.x},${this.diagonal.pointA.y}) to (${this.diagonal.pointB.x},${this.diagonal.pointB.y})]`;
  }

  get area() {
    return this.length * this.breadth;
  }

  get perimeter() {
    return 2 * (this.length + this.breadth);
  }
}

module.exports = Rectangle;
