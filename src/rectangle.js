const Line = require('./line');

class Rectangle {
  constructor(end1, end2) {
    this.diagonal = new Line(end1, end2);
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
}

console.log(new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 }));
module.exports = Rectangle;
