const assert = require('chai').assert;
const Point = require('../src/point');
const Line = require('../src/line');
const Circle = require('../src/circle');

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
    it("should return undefined if 'other' is not a function", function() {
      const a = new Point(2, 3);
      assert.isUndefined(a.visit(6));
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
    });
    it('should give NaN when the given point is not an instance of Point', function() {
      const point1 = new Point(1, 2);
      const point2 = { x: 3, y: 3 };
      assert.isNaN(point1.findDistanceTo(point2));
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
    it('should validate a point that is on the circumference of circle and on the x axis', () => {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const point = new Point(5, 0);
      assert.isTrue(point.isOn(circle));
    });
    it('should validate a point that is on the circumference of circle and on the y axis', () => {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const point = new Point(0, 5);
      assert.isTrue(point.isOn(circle));
    });
    it('should invalidate a point that is not on the circumference of circle', () => {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const point = new Point(0, 6);
      assert.isFalse(point.isOn(circle));
    });
  });

  describe('notEditable', function() {
    it('co-ordinates of the point should not be editable', function() {
      const point = new Point(4, 5);
      point.x = 45;
      point.y = 454;
      const expectedValue = new Point(4, 5);
      assert.deepStrictEqual(point, expectedValue);
    });
  });
});
