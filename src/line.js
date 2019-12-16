const isPointsEqual = function(pointA, pointB) {
  return pointA.x == pointB.x && pointA.y == pointB.y;
};

class Line {
  constructor(a, b) {
    [this.pointA, this.pointB] = [
      { x: a.x, y: a.y },
      { x: b.x, y: b.y }
    ];
  }
  toString() {
    return `[Line (${this.pointA.x},${this.pointA.y}) to (${this.pointB.x},${this.pointB.y})]`;
  }
  isEqualTo(other) {
    if (other instanceof Line) {
      return (
        isPointsEqual(this.pointA, other.pointA) &&
        isPointsEqual(this.pointB, other.pointB)
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
}

module.exports = Line;
