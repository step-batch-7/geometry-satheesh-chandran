class Point {
  constructor(x, y) {
    [this.x, this.y] = [x, y];
    Object.freeze(this);
  }
  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }
  visit(other) {
    if (typeof other !== 'function') {
      return undefined;
    }
    return other(this.x, this.y);
  }
  isEqualTo(other) {
    if (other instanceof Point) {
      return this.x == other.x && this.y == other.y;
    }
    return false;
  }
  clone() {
    return new Point(this.x, this.y);
  }

  findDistanceTo(other) {
    if (!(other instanceof Point)) {
      return NaN;
    }
    const xRange = this.x - other.x;
    const yRange = this.y - other.y;
    return Math.sqrt(xRange * xRange + yRange * yRange);
  }

  isOn(a) {
    return a.hasPoint(this);
  }
}

module.exports = Point;
