const assert = require('assert');
const Point = require('../src/point');
describe('Point Class', function() {
  describe('toString', function() {
    it('should return the details of line as a string format', function() {
      const point = new Point(2, 3);
      assert.deepStrictEqual(point.toString(), '[Point @(2,3)]');
    });
  });
});
