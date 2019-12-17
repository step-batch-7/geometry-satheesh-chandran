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
});
