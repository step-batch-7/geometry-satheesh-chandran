const Point = require('./point');

const isCollinear = function(firstPoint, secondPoint, thirdPoint) {
  //[x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)] = 0;
  const [x1, y1] = [firstPoint.x, firstPoint.y];
  const [x2, y2] = [secondPoint.x, secondPoint.y];
  const [x3, y3] = [thirdPoint.x, thirdPoint.y];
  const collinearity = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
  return collinearity;
};

const isBetween = function(range, num) {
  return (
    (num >= range[0] && num <= range[1]) || (num <= range[0] && num >= range[1])
  );
};

const midPoint = function(pointA, pointB) {
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
    const slope = yRange / xRange;
    return slope;
  }
  isParallelTo(other) {
    if (!(other instanceof Line)) {
      return false;
    }
    const collinearity = isCollinear(
      { x: this.pointA.x, y: this.pointA.y },
      { x: this.pointB.x, y: this.pointB.y },
      { x: other.pointB.x, y: other.pointB.y }
    );
    return !collinearity && this.slope == other.slope;
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
  hasPoint(p) {
    if (!(p instanceof Point)) {
      return false;
    }
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
    const consistOf = isBetween([this.pointA.y, this.pointB.y], other);
    if (this.pointA.y == this.pointB.y && consistOf) {
      return this.pointA.x;
    }
    if (this.hasPoint(newPoint)) {
      return x;
    }
    return NaN;
  }

  findY(other) {
    const slope = this.slope;
    const y = slope * (other - this.pointA.x) + this.pointA.y;
    const newPoint = new Point(other, y);
    const consistOf = isBetween([this.pointA.x, this.pointB.x], other);
    if (this.pointA.x == this.pointB.x && consistOf) {
      return this.pointA.y;
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
    const x = (1 - t) * this.pointA.x + t * this.pointB.x;
    const y = (1 - t) * this.pointA.y + t * this.pointB.y;
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
    const x = (1 - t) * this.pointB.x + t * this.pointA.x;
    const y = (1 - t) * this.pointB.y + t * this.pointA.y;
    return new Point(x, y);
  }
}

module.exports = Line;
