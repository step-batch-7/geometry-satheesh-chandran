const assert = require('assert');
const Line  = require('../src/line');

describe('toString',function(){
  it('should return the details of line as a string format',function(){
    const line = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
    assert.deepStrictEqual(line.toString(),'[Line (1,2) to (2,3)]')
  })
});

describe('isEqualTo',function(){
  it('should give true if the given to lines are equal',function(){
    const a = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
    const b = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
    assert.deepStrictEqual(a.isEqualTo(b),true)
  })
  it('should give false if the given to lines are not equal',function(){
    const a = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
    const b = new Line({ x: 1, y: 2 }, { x: 3, y: 2 });
    assert.deepStrictEqual(a.isEqualTo(b),false)
  })
});