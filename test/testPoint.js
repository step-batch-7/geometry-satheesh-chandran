const { assert } = require('chai');
const Point = require('../src/point');
const Line = require('../src/line');
const Circle = require('../src/circle');

describe('Point Class', function () {
  describe('toString', function () {
    it('should return the details of line as a string format', () => {
      assert.deepStrictEqual(new Point(2, 3).toString(), '[Point @(2,3)]');
    });
  });

  describe('visit', function () {
    it('should give return value value of the given function', () => {
      const point = new Point(2, 3);
      const add = (x, y) => x + y;
      const mul = (x, y) => x * y;
      assert.equal(point.visit(add), 5);
      assert.equal(point.visit(mul), 6);
    });
    it("should return undefined if 'other' is not a function", () => {
      assert.isUndefined(new Point(2, 3).visit(6));
    });
  });

  describe('isEqualTo', function () {
    it('should give true if the given to points are equal', () => {
      assert.isTrue(new Point(2, 3).isEqualTo(new Point(2, 3)));
    });
    it('should give false if the given to points are not equal', () => {
      assert.isFalse(new Point(2, 3).isEqualTo(new Point(3, 2)));
    });
    it('should give false if the given to lines are not equal', () => {
      assert.isFalse(new Point(2, 3).isEqualTo({ x: 2, y: 3 }));
    });
  });

  describe('clone', function () {
    it('should give a copy of the given point', () => {
      const point = new Point(2, 3);
      assert.ok(point.isEqualTo(point.clone()));
    });
  });

  describe('findDistanceTo', function () {
    it('should return the distance from the one point to other point', () => {
      assert.equal(new Point(0, 1).findDistanceTo(new Point(5, 1)), 5);
    });
    it('should give NaN when the given point is not an instance of Point', () => {
      assert.isNaN(new Point(1, 2).findDistanceTo({ x: 3, y: 3 }));
    });
  });

  describe('isOn', function () {
    it('should return true if the point present on given line', () => {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.isTrue(new Point(2, 2).isOn(line));
    });
    it('should return false if the point is not lies in the given line', () => {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.isFalse(new Point(4, 4).isOn(line));
    });
    it('should validate a point that is on the circumference of circle and on the x axis', () => {
      assert.isTrue(new Point(5, 0).isOn(new Circle({ x: 0, y: 0 }, 5)));
    });
    it('should validate a point that is on the circumference of circle and on the y axis', () => {
      assert.isTrue(new Point(0, 5).isOn(new Circle({ x: 0, y: 0 }, 5)));
    });
    it('should invalidate a point that is not on the circumference of circle', () => {
      assert.isFalse(new Point(0, 6).isOn(new Circle({ x: 0, y: 0 }, 5)));
    });
  });

  describe('notEditable', function () {
    it('co-ordinates of the point should not be editable', () => {
      const point = new Point(4, 5);
      const expected = new Point(4, 5);
      point.x = 45;
      point.y = 454;
      assert.deepStrictEqual(point, expected);
    });
  });
});
