const assert = require('chai').assert;
const Rectangle = require('../src/rectangle');
const Point = require('../src/point');

describe('Rectangle', function () {
  describe('toString', function () {
    it('should return string format of the given rectangle', function () {
      const r = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const expected = '[Rectangle (1,1) to (5,4)]';
      assert.equal(r.toString(), expected);
    });
  });

  describe('area', function () {
    it('should return the area of the given rectangle', function () {
      const r = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.equal(r.area, 2);
    });
  });

  describe('perimeter', function () {
    it('should return the perimeter of the given rectangle', function () {
      const r = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.equal(r.perimeter, 6);
    });
  });

  describe('isEqualTo', function () {
    it('should return true if the given rectangles are equal', function () {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const b = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.ok(a.isEqualTo(b));
    });
    it('should return true if given equal rectangles and given with opposite diagonal points', function () {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const b = new Rectangle({ x: 2, y: 1 }, { x: 1, y: 3 });
      assert.ok(a.isEqualTo(b));
    });
    it('should return true if the given rectangles are equal', function () {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const b = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.isFalse(a.isEqualTo(b));
    });
    it('should return true if the given rectangles are equal', function () {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const b = { a: { x: 1, y: 1 }, c: { x: 3, y: 3 } };
      assert.isFalse(a.isEqualTo(b));
    });
  });

  describe('hasPoint', function () {
    it('should return true if the circumference of the rectangle have the given point', function () {
      const a = new Rectangle({ x: 2, y: 1 }, { x: 1, y: 3 });
      const p = new Point(1, 3);
      assert.ok(a.hasPoint(p));
    });
    it('should return false if the circumference of the rectangle not have the given point', function () {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const p = new Point(1, 4);
      assert.isFalse(a.hasPoint(p));
    });
    it('should return false if the given point is not an instance of point', function () {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const p = { x: 1, y: 3 };
      assert.isFalse(a.hasPoint(p));
    });
  });

  describe('covers', function () {
    it('should return true if the rectangle covers the given point', function () {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const p = new Point(1.5, 2.5);
      assert.ok(a.covers(p));
    });
    it('should return false if the rectangle not covers the given point', function () {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const point = new Point(2, 4);
      assert.isFalse(rectangle.covers(point));
    });
    it('should return false if the given point is not an instance of point', function () {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const p = { x: 1, y: 3 };
      assert.isFalse(a.hasPoint(p));
    });
    it('should return false if the given point lies in the circumference of the rectangle', function () {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const point = new Point(2, 3);
      assert.isFalse(rectangle.covers(point));
    });
    it('should return false if given point is not an instance of Point class', function () {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const p = { x: 1.5, y: 2.5 };
      assert.isFalse(a.covers(p));
    });
  });
});
