const assert = require('assert');
const Point = require('../src/point');

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
});
