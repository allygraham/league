var assert = require("assert");
var A = require('./functions.js');

describe('Function.js', function(){
  describe('Array Split', function(){
    it('is a function', function() { 
      assert(typeof A.arraySplit === 'function');
    })
    it('should take [] and 0 to return []', function(){
      assert.deepEqual(A.arraySplit([],0), []);
    })
    it('should take [1,2,3,4,5] and 3 to return [[1,2],[3,4],[5]]', function(){
      assert.deepEqual(A.arraySplit([1,2,3,4,5],3), [[1,2],[3,4],[5]]);
    })
    it('should take [1,2,3,4,5,6,7,8] and 4 to return [[1,2],[3,4],[5,6],[7,8]]', function(){
      assert.deepEqual(A.arraySplit([1,2,3,4,5,6,7,8],4), [[1,2],[3,4],[5,6],[7,8]]);
    })
  })
});