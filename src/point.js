class Point {
  #x;
  #y;

  constructor(x, y) {
    [this.#x, this.#y] = [x, y];
    Object.freeze(this);
  }

  get points() {
    return { x: this.#x, y: this.#y };
  }

  toString() {
    return `[Point @(${this.#x},${this.#y})]`;
  }
  visit(other) {
    return typeof other === 'function' ? other(this.#x, this.#y) : undefined;
  }
  isEqualTo(other) {
    return (
      other instanceof Point &&
      this.#x == other.points.x &&
      this.#y == other.points.y
    );
  }
  clone() {
    return new Point(this.#x, this.#y);
  }

  findDistanceTo(other) {
    if (!(other instanceof Point)) {
      return NaN;
    }
    const xRange = this.#x - other.points.x;
    const yRange = this.#y - other.points.y;
    return Math.sqrt(xRange * xRange + yRange * yRange);
  }

  isOn(line) {
    return line.hasPoint(this);
  }
}

module.exports = Point;
