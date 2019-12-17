const Point = require('./point');

const isCollinear = function(firstPoint, secondPoint, thirdPoint) {
  let firstLineLength = new Line(firstPoint, secondPoint).length;
  let secondLineLength = new Line(thirdPoint, secondPoint).length;
  let thirdLineLength = new Line(firstPoint, thirdPoint).length;
  return (
    firstLineLength + secondLineLength == thirdLineLength ||
    firstLineLength + thirdLineLength == secondLineLength ||
    thirdLineLength + secondLineLength == firstLineLength
  );
};

const isBetween = function(range, num) {
  return (
    (num >= range[0] && num <= range[1]) || (num <= range[0] && num >= range[1])
  );
};

class Line {
  constructor(a, b) {
    this.pointA = new Point(a.x, a.y);
    this.pointB = new Point(b.x, b.y);
  }
  toString() {
    return `[Line (${this.pointA.x},${this.pointA.y}) to (${this.pointB.x},${this.pointB.y})]`;
  }
  isEqualTo(other) {
    if (other instanceof Line) {
      return (
        (this.pointA.isEqualTo(other.pointA) &&
          this.pointB.isEqualTo(other.pointB)) ||
        (this.pointA.isEqualTo(other.pointB) &&
          this.pointB.isEqualTo(other.pointA))
      );
    }
    return false;
  }
  get length() {
    const xRange = this.pointB.x - this.pointA.x;
    const yRange = this.pointB.y - this.pointA.y;
    return Math.sqrt(xRange * xRange + yRange * yRange);
  }
  get slope() {
    const xRange = this.pointB.x - this.pointA.x;
    const yRange = this.pointB.y - this.pointA.y;
    return yRange / xRange;
  }
  isParellel(other) {
    if (!other instanceof Line) {
      return false;
    }
    return this.slope == other.slope;
  }
  get midPoint() {
    const xSum = this.pointB.x + this.pointA.x;
    const ySum = this.pointB.y + this.pointA.y;
    return [xSum / 2, ySum / 2];
  }
  split() {
    const middle = this.midPoint;
    const firstLine = new Line(
      { x: this.pointA.x, y: this.pointA.y },
      { x: middle[0], y: middle[1] }
    );
    const secondLine = new Line(
      { x: middle[0], y: middle[1] },
      { x: this.pointB.x, y: this.pointB.y }
    );
    return [firstLine, secondLine];
  }
  hasPoint(p) {
    const xRange = [this.pointB.x, this.pointA.x];
    const yRange = [this.pointB.y, this.pointA.y];
    const collinearity = isCollinear(
      { x: this.pointA.x, y: this.pointA.y },
      { x: this.pointB.x, y: this.pointB.y },
      {
        x: p.x,
        y: p.y
      }
    );
    return collinearity && isBetween(xRange, p.x) && isBetween(yRange, p.y);
  }

  findX(other) {
    const slope = this.slope;
    const x = (other - this.pointA.y) / slope + this.pointA.x;
    const newPoint = new Point(x, other);
    if (this.hasPoint(newPoint)) {
      return x;
    }

    return NaN;
  }

  findY(other) {
    const slope = this.slope;
    // const y = (other - this.pointA.y) / slope + this.pointA.x;
    const y = slope * (other - this.pointA.x) + this.pointA.y;
    const newPoint = new Point(other, y);
    if (this.hasPoint(newPoint)) {
      return y;
    }

    return NaN;
  }
}

module.exports = Line;
