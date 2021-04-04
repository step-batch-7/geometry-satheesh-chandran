const Point = require('./point');

const isCollinear = function (firstPoint, secondPoint, thirdPoint) {
  //[x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)] = 0;
  const [x1, y1] = [firstPoint.x, firstPoint.y];
  const [x2, y2] = [secondPoint.x, secondPoint.y];
  const [x3, y3] = [thirdPoint.x, thirdPoint.y];
  const collinearity = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
  return collinearity;
};

const isBetween = function (range, num) {
  return (
    (num >= range[0] && num <= range[1]) || (num <= range[0] && num >= range[1])
  );
};

const midPoint = function (pointA, pointB) {
  const xSum = pointB.x + pointA.x;
  const ySum = pointB.y + pointA.y;
  return [xSum / 2, ySum / 2];
};

class Line {
  constructor(a, b) {
    this.pointA = new Point(a.x, a.y);
    this.pointB = new Point(b.x, b.y);
    Object.freeze(this);
  }
  toString() {
    return `[Line (${this.pointA.points.x},${this.pointA.points.y}) to (${this.pointB.points.x},${this.pointB.points.y})]`;
  }
  isEqualTo(other) {
    return (
      (other instanceof Line &&
        this.pointA.isEqualTo(other.pointA) &&
        this.pointB.isEqualTo(other.pointB)) ||
      (this.pointA.isEqualTo(other.pointB) &&
        this.pointB.isEqualTo(other.pointA))
    );
  }
  get length() {
    const xRange = this.pointB.points.x - this.pointA.points.x;
    const yRange = this.pointB.points.y - this.pointA.points.y;
    return Math.sqrt(xRange * xRange + yRange * yRange);
  }
  get slope() {
    const xRange = this.pointB.points.x - this.pointA.points.x;
    const yRange = this.pointB.points.y - this.pointA.points.y;
    const slope = yRange / xRange;
    return slope;
  }
  isParallelTo(other) {
    if (!(other instanceof Line)) {
      return false;
    }
    const collinearity = isCollinear(
      { x: this.pointA.points.x, y: this.pointA.points.y },
      { x: this.pointB.points.x, y: this.pointB.points.y },
      { x: other.pointB.points.x, y: other.pointB.points.y }
    );
    const thisSlope = this.slope == -Infinity ? Infinity : this.slope;
    const otherSlope = other.slope == -Infinity ? Infinity : other.slope;
    const slopeEquality = thisSlope == otherSlope;
    return !collinearity && slopeEquality;
  }

  split() {
    const middle = midPoint(this.pointA, this.pointB);
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
  hasPoint(point) {
    if (!(point instanceof Point)) {
      return false;
    }
    const xRange = [this.pointB.points.x, this.pointA.points.x];
    const yRange = [this.pointB.points.y, this.pointA.points.y];
    const collinearity = isCollinear(
      { x: this.pointA.points.x, y: this.pointA.points.y },
      { x: this.pointB.points.x, y: this.pointB.points.y },
      { x: point.points.x, y: point.points.y }
    );
    return (
      collinearity &&
      isBetween(xRange, point.points.x) &&
      isBetween(yRange, point.points.y)
    );
  }

  findX(other) {
    const slope = this.slope;
    const x = (other - this.pointA.points.y) / slope + this.pointA.points.x;
    const newPoint = new Point(x, other);
    const consistOf = isBetween(
      [this.pointA.points.y, this.pointB.points.y],
      other
    );
    if (this.pointA.points.y == this.pointB.points.y && consistOf) {
      return this.pointA.points.x;
    }
    if (this.hasPoint(newPoint)) {
      return x;
    }
    return NaN;
  }

  findY(other) {
    const slope = this.slope;
    const y = slope * (other - this.pointA.points.x) + this.pointA.points.y;
    const newPoint = new Point(other, y);
    const consistOf = isBetween([this.pointA.points.x, this.pointB.points.x], other);
    if (this.pointA.points.x == this.pointB.points.x && consistOf) {
      return this.pointA.points.y;
    }
    if (this.hasPoint(newPoint)) {
      return y;
    }

    return NaN;
  }
  findPointFromStart(d) {
    // (𝑥𝑡,𝑦𝑡)=(((1−𝑡)𝑥0+𝑡𝑥1),((1−𝑡)𝑦0+𝑡𝑦1))
    if (d > this.length) {
      return null;
    }
    if (!(typeof d == 'number') || d < 0) {
      return null;
    }
    const t = d / this.length;
    const x = (1 - t) * this.pointA.points.x + t * this.pointB.points.x;
    const y = (1 - t) * this.pointA.points.y + t * this.pointB.points.y;
    return new Point(x, y);
  }

  findPointFromEnd(d) {
    if (d > this.length) {
      return null;
    }
    if (!(typeof d == 'number') || d < 0) {
      return null;
    }
    const t = d / this.length;
    const x = (1 - t) * this.pointB.points.x + t * this.pointA.points.x;
    const y = (1 - t) * this.pointB.points.y + t * this.pointA.points.y;
    return new Point(x, y);
  }
}

module.exports = Line;
