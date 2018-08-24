var assert = require("assert");
var A = require('./functions.js');

describe('Functions.js', function(){
  describe('addTeamToTable', function(){
    it('is a function', function() { 
      assert(typeof A.addTeamToTable === 'function');
    })
  })

  describe('indexOfTeamToUpdate', function(){
    it('is a function', function() { 
      assert(typeof A.indexOfTeamToUpdate === 'function');
    })
    it('should take a team key to return an index from teams array', function(){
      expect(A.indexOfTeamToUpdate([{key: 'hull'}],'hull')).toBe(0);
    })
    it('should take a team key to return -1 from teams array', function(){
      expect(A.indexOfTeamToUpdate([{key: 'liverpool'}],'hull')).toBe(-1);
    })
  })

  describe('updateTeamInTable', function(){
    it('is a function', function() { 
      assert(typeof A.updateTeamInTable === 'function');
    })
  })

  describe('haveEqualPoints', function(){
    it('is a function', function() { 
      assert(typeof A.haveEqualPoints === 'function');
    })
    it('should take two numbers and return a boolean', function(){
      expect(A.haveEqualPoints(20,20)).toBe(true);
    })
  })

  describe('haveEqualGoalDifference', function(){
    it('is a function', function() { 
      assert(typeof A.haveEqualGoalDifference === 'function');
    })
    it('should take two numbers and return a boolean', function(){
      expect(A.haveEqualGoalDifference(20,20)).toBe(true);
    })
  })

  describe('sortOnGoalsFor', function(){
    it('is a function', function() { 
      assert(typeof A.sortOnGoalsFor === 'function');
    })
  })

  describe('sortOnGoalDifference', function(){
    it('is a function', function() { 
      assert(typeof A.sortOnGoalDifference === 'function');
    })
  })

  describe('sortOnPoints', function(){
    it('is a function', function() { 
      assert(typeof A.sortOnPoints === 'function');
    })
  })

  describe('sortTableIntoOrder', function(){
    it('is a function', function() { 
      assert(typeof A.sortTableIntoOrder === 'function');
    })
  })

  describe('addRankToTable', function(){
    it('is a function', function() { 
      assert(typeof A.addRankToTable === 'function');
    })
  })

  describe('buildTableFromResults', function(){
    it('is a function', function() { 
      assert(typeof A.buildTableFromResults === 'function');
    })
  })
});