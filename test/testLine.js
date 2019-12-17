const assert = require('assert');
const Line = require('../src/line');
const Point = require('../src/point');

describe('Line Class', function() {
  describe('toString', function() {
    it('should return the details of line as a string format', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
      assert.deepStrictEqual(line.toString(), '[Line (1,2) to (2,3)]');
    });
  });

  describe('isEqualTo', function() {
    it('should give true if the given to lines are equal', function() {
      const a = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
      const b = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
      assert.deepStrictEqual(a.isEqualTo(b), true);
    });
    it('should give true if the given to lines are equal even the coordinates are given reverse', function() {
      const a = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
      const b = new Line({ x: 2, y: 3 }, { x: 1, y: 2 });
      assert.deepStrictEqual(a.isEqualTo(b), true);
    });
    it('should give false if the given to lines are not equal', function() {
      const a = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
      const b = new Line({ x: 1, y: 2 }, { x: 3, y: 2 });
      assert.deepStrictEqual(a.isEqualTo(b), false);
    });
    it('should give false if the given to lines are not equal', function() {
      const a = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
      const b = [
        { x: 1, y: 2 },
        { x: 3, y: 2 }
      ];
      assert.deepStrictEqual(a.isEqualTo(b), false);
    });
  });

  describe('length', function() {
    it('should return the distance of the given value', function() {
      const a = new Line({ x: 1, y: 1 }, { x: 4, y: 5 });
      assert.equal(a.length, 5);
    });
  });

  describe('slope', function() {
    it('should return the slope of the given line', function() {
      const a = new Line({ x: 1, y: 4 }, { x: 2, y: 5 });
      assert.equal(a.slope, 1);
    });
  });

  describe('isParellel', function() {
    it('should give true if two given lines are parellel ', function() {
      const a = new Line({ x: 1, y: 3 }, { x: 3, y: 5 });
      const b = new Line({ x: 1, y: 4 }, { x: 2, y: 5 });
      assert.equal(a.isParellel(b), true);
    });
    it('should give false if two given lines are parellel ', function() {
      const a = new Line({ x: 1, y: 3 }, { x: 3, y: 5 });
      const b = new Line({ x: 1, y: 2 }, { x: 2, y: 5 });
      assert.equal(a.isParellel(b), false);
    });
    it('should give false if other argument is not an instance of Line', function() {
      const a = new Line({ x: 1, y: 3 }, { x: 3, y: 5 });
      const b = [
        { x: 1, y: 2 },
        { x: 2, y: 5 }
      ];
      assert.equal(a.isParellel(b), false);
    });
  });
  describe('midPoint', function() {
    it('should give the mid point of the given line', function() {
      const a = new Line({ x: -3, y: 5 }, { x: 8, y: -1 });
      assert.deepStrictEqual(a.midPoint, [2.5, 2]);
    });
  });

  describe('split', function() {
    it('should split the given line from the middle of the given line', function() {
      const a = new Line({ x: -3, y: 5 }, { x: 8, y: -1 });
      const expected = [
        new Line({ x: -3, y: 5 }, { x: 2.5, y: 2 }),
        new Line({ x: 2.5, y: 2 }, { x: 8, y: -1 })
      ];
      assert.deepStrictEqual(a.split(), expected);
    });
  });

  describe('hasPoint', function() {
    it('should return true if the given point lies in the line', function() {
      const p = new Point(2, 2);
      const a = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.ok(a.hasPoint(p));

      const q = new Point(1, 2);
      const b = new Line({ x: 1, y: 1 }, { x: 1, y: 3 });
      assert.ok(b.hasPoint(q));

      const r = new Point(2, 1);
      const c = new Line({ x: 1, y: 1 }, { x: 3, y: 1 });
      assert.ok(c.hasPoint(r));
    });
    it('should return false if the given point not lies in the line', function() {
      const p = new Point(2, 3);
      const a = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.ok(!a.hasPoint(p));

      const q = new Point(4, 4);
      const b = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.ok(!b.hasPoint(q));
    });
  });

  describe('findX', function() {
    it('should return the value of X if value of Y is given', function() {
      const a = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.deepStrictEqual(a.findX(2), 2);
      const b = new Line({ x: 1, y: 0 }, { x: 1, y: 5 });
      assert.deepStrictEqual(b.findX(5), 1);
      assert.deepStrictEqual(b.findX(0), 1);
      assert.deepStrictEqual(b.findX(6), NaN);
    });
  });
});
