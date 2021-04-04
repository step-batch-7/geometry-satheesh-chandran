const Line = require('./line');
const Point = require('./point');

const isBetween = ([min, max], num) => min < num && max > num;

class Rectangle {
  constructor(end1, end2) {
    this.a = new Point(end1.x, end1.y);
    this.c = new Point(end2.x, end2.y);
    Object.freeze(this);
  }

  toString() {
    return `[Rectangle (${this.a.points.x},${this.a.points.y}) to (${this.c.points.x},${this.c.points.y})]`;
  }

  get area() {
    const pointA = this.a.points;
    const pointC = this.c.points;
    return Math.abs(pointA.x - pointC.x) * Math.abs(pointA.y - pointC.y);
  }

  get perimeter() {
    const pointA = this.a.points;
    const pointC = this.c.points;
    return 2 * (Math.abs(pointA.x - pointC.x) + Math.abs(pointA.y - pointC.y));
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) {
      return false;
    }
    const pointA = this.a.points;
    const pointC = this.c.points;

    const b = new Point(pointC.x, pointA.y);
    const d = new Point(pointA.x, pointC.y);
    return (
      (this.a.isEqualTo(other.a) && this.c.isEqualTo(other.c)) ||
      (this.a.isEqualTo(other.c) && this.c.isEqualTo(other.a)) ||
      (other.a.isEqualTo(b) && other.c.isEqualTo(d)) ||
      (other.a.isEqualTo(d) && other.c.isEqualTo(b))
    );
  }

  hasPoint(p) {
    if (!(p instanceof Point)) {
      return false;
    }
    const b = new Point(this.c.points.x, this.a.points.y);
    const d = new Point(this.a.points.x, this.c.points.y);
    const ab = new Line(
      { x: this.a.points.x, y: this.a.points.y },
      { x: b.points.x, y: b.points.y }
    );
    const bc = new Line(
      { x: b.points.x, y: b.points.y },
      { x: this.c.points.x, y: this.c.points.y }
    );
    const cd = new Line(
      { x: this.c.points.x, y: this.c.points.y },
      { x: d.points.x, y: d.points.y }
    );
    const da = new Line(
      { x: d.points.x, y: d.points.y },
      { x: this.a.points.x, y: this.a.points.y }
    );
    return ab.hasPoint(p) || bc.hasPoint(p) || cd.hasPoint(p) || da.hasPoint(p);
  }

  covers(p) {
    if (!(p instanceof Point)) {
      return false;
    }
    const b = new Point(this.c.points.x, this.a.points.y);
    const d = new Point(this.a.points.x, this.c.points.y);
    const xMin = Math.min(
      this.a.points.x,
      this.c.points.x,
      b.points.x,
      d.points.x
    );
    const xMax = Math.max(
      this.a.points.x,
      this.c.points.x,
      b.points.x,
      d.points.x
    );
    const yMin = Math.min(
      this.a.points.y,
      this.c.points.y,
      b.points.y,
      d.points.y
    );
    const yMax = Math.max(
      this.a.points.y,
      this.c.points.y,
      b.points.y,
      d.points.y
    );
    return (
      isBetween([xMin, xMax], p.points.x) && isBetween([yMin, yMax], p.points.y)
    );
  }
}

module.exports = Rectangle;
