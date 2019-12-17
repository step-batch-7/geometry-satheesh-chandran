const assert = require('chai').assert;
const Point = require('../src/point');
const Line = require('../src/line');

describe('Point Class', function() {
  describe('toString', function() {
    it('should return the details of line as a string format', function() {
      const point = new Point(2, 3);
      assert.deepStrictEqual(point.toString(), '[Point @(2,3)]');
    });
  });

  describe('visit', function() {
    it('should give return value value of the given function', function() {
      const a = new Point(2, 3);
      assert.equal(
        a.visit((x, y) => x + y),
        5
      );
      assert.equal(
        a.visit((x, y) => x * y),
        6
      );
    });
  });
  describe('isEqualTo', function() {
    it('should give true if the given to points are equal', function() {
      const a = new Point(2, 3);
      const b = new Point(2, 3);
      assert.deepStrictEqual(a.isEqualTo(b), true);
    });
    it('should give false if the given to points are not equal', function() {
      const a = new Point(2, 3);
      const b = new Point(3, 2);
      assert.deepStrictEqual(a.isEqualTo(b), false);
    });
    it('should give false if the given to lines are not equal', function() {
      const a = new Point(2, 3);
      const b = { x: 2, y: 3 };
      assert.deepStrictEqual(a.isEqualTo(b), false);
    });
  });
  describe('clone', function() {
    it('should give a copy of the given point', function() {
      const a = new Point(2, 3);
      assert.ok(a.isEqualTo(a.clone()));
    });
  });

  describe('findDistanceTo', function() {
    it('should return the distance from the one point to other point', function() {
      const a = new Point(0, 1);
      const b = new Point(5, 1);
      assert.equal(a.findDistanceTo(b), 5);
      const c = { x: 5, y: 1 };
      assert.equal(a.findDistanceTo(c), 5);
    });
  });

  describe('isOn', function() {
    it('should return true if the point present on given line', function() {
      const point = new Point(2, 2);
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.ok(point.isOn(line));
    });
    it('should return false if the point is not lies in the given line', function() {
      const point = new Point(4, 4);
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.isFalse(point.isOn(line));
    });
  });
});
