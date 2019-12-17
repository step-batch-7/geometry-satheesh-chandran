const Line = require('./line');

class Rectangle {
  constructor(end1, end2) {
    this.diagonal = new Line(end1, end2);
    this.length = Math.abs(end1.x - end2.x);
    this.breadth = Math.abs(end1.y - end2.y);
  }
}

module.exports = Rectangle;
