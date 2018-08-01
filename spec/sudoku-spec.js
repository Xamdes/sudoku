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
    console.log(puzzleOne.insertionPoint);
    puzzleOne.CreatePuzzle();
    console.log("CREATE END");
    console.log(puzzleOne.solution);
    //expect(puzzleOne.Equals(puzzleTwo)).toEqual(true);
  });

});
