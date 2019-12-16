class Point {
  constructor(x, y) {
    [this.x, this.y] = [x, y];
  }
  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }
  visit(other) {
    return other(this.x, this.y);
  }
}

module.exports = Point;
