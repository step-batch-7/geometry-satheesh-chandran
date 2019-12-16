class Line{
  constructor(a,b) {
    [this.pointA, this.pointB] = [{ x:a.x,y:a.y },{ x:b.x,y:b.y }];
  }
  toString() {
    return `[Line (${this.pointA.x},${this.pointA.y}) to (${this.pointB.x},${this.pointB.y})]`
  }
}

module.exports = Line;