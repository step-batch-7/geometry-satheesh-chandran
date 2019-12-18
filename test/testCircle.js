const assert = require('chai').assert;
const Circle = require('../src/circle');
const Point = require('../src/point');

describe('circle', function() {
  describe('toString', function() {
    it('should give a string format of given circle', function() {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const expected = '[Circle @(0,0) radius 5]';
      assert.equal(circle.toString(), expected);
    });
  });

  describe('isEqualTo', function() {
    it('should return true if the given two circles are equal', function() {
      const a = new Circle({ x: 0, y: 0 }, 5);
      const b = new Circle({ x: 0, y: 0 }, 5);
      assert.ok(a.isEqualTo(b));
    });
    it('should return false if the given two circles origin is same and radius is not equal', function() {
      const a = new Circle({ x: 0, y: 0 }, 5);
      const b = new Circle({ x: 0, y: 0 }, 4);
      assert.isFalse(a.isEqualTo(b));
    });
    it('should return false if the given two circles origin is not same and radius are equal', function() {
      const a = new Circle({ x: 0, y: 0 }, 5);
      const b = new Circle({ x: 0, y: 1 }, 5);
      assert.isFalse(a.isEqualTo(b));
    });
    it("should return false if the given two circle's origin and radius are different equal", function() {
      const a = new Circle({ x: 0, y: 0 }, 4);
      const b = new Circle({ x: 0, y: 1 }, 5);
      assert.isFalse(a.isEqualTo(b));
    });
    it('should return false if the given other circle is not an instance of circle', function() {
      const a = new Circle({ x: 0, y: 0 }, 5);
      const b = { o: { x: 0, y: 0 }, r: 5 };
      assert.isFalse(a.isEqualTo(b));
    });
  });

  describe('area', function() {
    it('should return area of a given circle', function() {
      const a = new Circle({ x: 0, y: 0 }, 7);
      assert.approximately(a.area, 153.938, 0.0001);
    });
  });

  describe('perimeter', function() {
    it('should return perimeter of the given circle', function() {
      const a = new Circle({ x: 0, y: 0 }, 7);
      assert.approximately(a.perimeter, 43.9822, 0.0001);
    });
  });

  describe('hasPoint', function() {
    it('should return true if the given point is present in the circle', function() {
      const c = new Circle({ x: 0, y: 0 }, 5);
      const p = new Point(0, 5);
      assert.ok(c.hasPoint(p));
    });
    it('should return false if the given point is not present in the circle', function() {
      const c = new Circle({ x: 0, y: 0 }, 5);
      const p = new Point(0, 6);
      assert.isFalse(c.hasPoint(p));
    });
    it('should return false if the given point is not an instanceof Point', function() {
      const c = new Circle({ x: 0, y: 0 }, 5);
      const p = { x: 0, y: 5 };
      assert.isFalse(c.hasPoint(p));
    });
  });

  describe('moveTo', function() {
    it("should move the circle from it's orgin to given origin", function() {
      const c1 = new Circle({ x: 0, y: 0 }, 5);
      const point = { x: 1, y: 1 };
      const c2 = new Circle({ x: 1, y: 1 }, 5);
      assert.deepStrictEqual(c1.moveTo(point), c2);
    });
  });

  describe('covers', function() {
    it('should return true if the given point is covered by the circle', function() {
      const c = new Circle({ x: 0, y: 0 }, 5);
      const p = new Point(0, 4);
      assert.ok(c.covers(p));
      const a = new Circle({ x: 0, y: 0 }, 5);
      const b = new Point(1, -3);
      assert.ok(a.covers(b));
    });
    it('should return false if the given point is not covered by the circle', function() {
      const c = new Circle({ x: 0, y: 0 }, 5);
      const p = new Point(0, 6);
      assert.isFalse(c.covers(p));
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const point = new Point(0, -6);
      assert.isFalse(circle.covers(point));
    });
    it('should return false if the given point is lies on the circumference', function() {
      const c = new Circle({ x: 0, y: 0 }, 5);
      const p = new Point(0, 5);
      assert.isFalse(c.covers(p));
    });
    it('should return false if the given point is not an instanceof Point', function() {
      const c = new Circle({ x: 0, y: 0 }, 5);
      const p = { x: 0, y: 1 };
      assert.isFalse(c.covers(p));
    });
  });
});
