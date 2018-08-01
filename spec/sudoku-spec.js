import { Sudoku } from './../src/sudoku';
describe('Sudoku', function()
{
  let puzzleOne;

  beforeEach(function()
  {
    puzzleOne = new Sudoku();
  });

  it('should show how beforeEach() works', function()
  {
    console.log(puzzleOne.solution);
  });

  it('compare sudoku puzzles', function()
  {
    let puzzleTwo = new Sudoku();
    expect(puzzleOne.Equals(puzzleTwo)).toEqual(true);
  });

  it('create sudoku puzzles', function()
  {
    puzzleOne.CreatePuzzle();
    //expect(puzzleOne.Equals(puzzleTwo)).toEqual(true);
  });

});
