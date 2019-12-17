const assert = require('chai').assert;
const Rectangle = require('../src/rectangle');

describe('Rectangle', function() {
  describe('toString', function() {
    it('should return string format of the given rectangle', function() {
      const r = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const expected = '[Rectangle (1,1) to (5,4)]';
      assert.equal(r.toString(), expected);
    });
  });

  describe('area', function() {
    it('should return the area of the given rectangle', function() {
      const r = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.equal(r.area, 2);
    });
  });

  describe('perimeter', function() {
    it('should return the perimeter of the given rectangle', function() {
      const r = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.equal(r.perimeter, 6);
    });
  });

  describe('isEqualTo', function() {
    it('should return true if the given rectangles are equal', function() {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const b = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.ok(a.isEqualTo(b));
    });
    it('should return true if the given rectangles are equal', function() {
      const a = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const b = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.isFalse(a.isEqualTo(b));
    });
  });
});
