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
    return (
      isPointsEqual(this.pointA, other.pointA) &&
      isPointsEqual(this.pointB, other.pointB)
    );
  }
  get length() {
    const xRange = this.pointB.x - this.pointA.x;
    const yRange = this.pointB.y - this.pointA.y;
    return Math.sqrt(xRange * xRange + yRange * yRange);
  }
}

module.exports = Line;
