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
});
