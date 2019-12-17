const Line = require('./line');
const Point = require('./point');

const isBetween = function(range, num) {
  return range[0] <= num && range[1] >= num;
};

class Rectangle {
  constructor(end1, end2) {
    this.a = new Point(end1.x, end1.y);
    this.c = new Point(end2.x, end2.y);
  }

  toString() {
    return `[Rectangle (${this.a.x},${this.a.y}) to (${this.c.x},${this.c.y})]`;
  }

  get area() {
    const length = Math.abs(this.a.x - this.c.x);
    const breadth = Math.abs(this.a.y - this.c.y);
    return length * breadth;
  }

  get perimeter() {
    const length = Math.abs(this.a.x - this.c.x);
    const breadth = Math.abs(this.a.y - this.c.y);
    return 2 * (length + breadth);
  }

  isEqualTo(other) {
    const thisLine = new Line(
      { x: this.a.x, y: this.a.y },
      { x: this.c.x, y: this.c.y }
    );
    const otherLine = new Line(
      { x: other.a.x, y: other.a.y },
      { x: other.c.x, y: other.c.y }
    );
    return thisLine.isEqualTo(otherLine);
  }

  hasPoint(p) {
    const b = new Point(this.c.x, this.a.y);
    const d = new Point(this.a.x, this.c.y);
    const ab = new Line(this.a, { x: b.x, y: b.y });
    const bc = new Line({ x: b.x, y: b.y }, this.c);
    const cd = new Line(this.c, { x: d.x, y: d.y });
    const da = new Line({ x: d.x, y: d.y }, this.a);
    return ab.hasPoint(p) || bc.hasPoint(p) || cd.hasPoint(p) || da.hasPoint(p);
  }

  covers(p) {
    const b = new Point(this.c.x, this.a.y);
    const d = new Point(this.a.x, this.c.y);
    const xMin = Math.min(this.a.x, this.c.x, b.x, d.x);
    const xMax = Math.max(this.a.x, this.c.x, b.x, d.x);
    const yMin = Math.min(this.a.y, this.c.y, b.y, d.y);
    const yMax = Math.max(this.a.y, this.c.y, b.y, d.y);
    return isBetween([xMin, xMax], p.x) && isBetween([yMin, yMax], p.y);
  }
}

module.exports = Rectangle;
