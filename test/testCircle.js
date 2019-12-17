const assert = require('chai').assert;
const Circle = require('../src/circle');

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
});
