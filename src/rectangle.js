const Line = require('./line');

class Rectangle {
  constructor(end1, end2) {
    this.diagonal = new Line(
      { x: end1.x, y: end1.y },
      { x: end2.x, y: end2.y }
    );
    this.diagonal2 = new Line(
      { x: end2.x, y: end1.y },
      { x: end1.x, y: end2.y }
    );
  }

  toString() {
    return `[Rectangle (${this.diagonal.pointA.x},${this.diagonal.pointA.y}) to (${this.diagonal.pointB.x},${this.diagonal.pointB.y})]`;
  }

  get area() {
    const length = Math.abs(this.diagonal.pointA.x - this.diagonal.pointB.x);
    const breadth = Math.abs(this.diagonal.pointA.y - this.diagonal.pointB.y);
    return length * breadth;
  }

  get perimeter() {
    const length = Math.abs(this.diagonal.pointA.x - this.diagonal.pointB.x);
    const breadth = Math.abs(this.diagonal.pointA.y - this.diagonal.pointB.y);
    return 2 * (length + breadth);
  }

  isEqualTo(other) {
    return this.diagonal.isEqualTo(other.diagonal);
  }

  hasPoint(p) {
    const ab = new Line(this.diagonal.pointA, this.diagonal2.pointA);
    const bc = new Line(this.diagonal2.pointA, this.diagonal.pointB);
    const cd = new Line(this.diagonal.pointB, this.diagonal2.pointB);
    const da = new Line(this.diagonal2.pointB, this.diagonal.pointA);
    return ab.hasPoint(p) || bc.hasPoint(p) || cd.hasPoint(p) || da.hasPoint(p);
  }
}

module.exports = Rectangle;
