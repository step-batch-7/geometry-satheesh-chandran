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
  isEqualTo(other) {
    if (other instanceof Point) {
      return this.x == other.x && this.y == other.y;
    }
    return false;
  }
  clone() {
    return new Point(this.x, this.y);
  }
}

module.exports = Point;
