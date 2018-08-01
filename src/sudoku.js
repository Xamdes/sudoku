export class Sudoku
{
  constructor()
  {
    this.solution = [];
    this.insertionColumn = 0;
    this.insertionRow = 0;
    this.ResetArray();
  }

  CreatePuzzle()
  {
    console.log("CREATE PUZZLE");
    Math.random();
    let successfuleInsert = false;
    for(let i = 0; i<16; )
    {
      successfuleInsert = this.InsertNextNumber();
      if(successfuleInsert)
      {
        i++;
        console.log("SUCCESS");
        console.log(this.solution);
      }
      else
      {
        console.log("FAILURE");
      }
    }
  }

  ResetArray()
  {
    let temp = [0,0,0,0,0,0,0,0,0];
    this.solution = [];
    for(let i = 0; i < 9; i++)
    {
      this.solution.push(temp.slice());
    }
  }

  Equals(otherSudoku,sort=false)
  {
    if(sort)
    {
      let thisSolution = [];
      let otherSolution = [];
      for(let i = 0; i < 9; i++)
      {
        thisSolution.push(this.solution[i].slice().sort());
      }
      for(let i = 0; i < 9; i++)
      {
        otherSolution.push(otherSudoku.solution[i].slice().sort());
      }
      return thisSolution.Equals(otherSolution);
    }
    else
    {
      for(let i = 0; i < 9; i++)
      {
        for(let j = 0; j < 9; j++)
        {
          if(this.solution[i][j] != otherSudoku.solution[i][j])
          {
            return false;
          }
        }
      }
    }
    return true;
  }

  ColumnContains(columnNumber, number)
  {
    let tempSolution = this.solution;
    let tempColumn = [];
    for(let i = 0; i < 9; i++)
    {
      tempColumn.push(tempSolution[i][columnNumber]);
    }

    for(let i = 0; i < tempColumn.length;i++)
    {
      if(tempColumn[i] === number)
      {
        return true;
      }
    }
    return false;
  }

  RowContains(rowNumber, number)
  {
    let tempRow = this.solution[rowNumber].slice().sort().reverse();
    for(let i = 0; i < tempRow.length;i++)
    {
      if(tempRow[i] === number)
      {
        return true;
      }
    }
    return false;
  }

  InsertNextNumber()
  {
    let randomNumber = Math.floor((Math.random() * 100)%9);
    if(randomNumber === 0)
    {
      randomNumber = 9;
    }
    let solutionArray = this.solution;
    let insertionArray = this.insertionIndex;
    let column = this.insertionColumn;
    let row = this.insertionRow;
    console.log("INSERTING: "+randomNumber+" AT:"+row+":"+column);
    let columnValid=!(this.ColumnContains(column,randomNumber));
    let rowValid=!(this.RowContains(row,randomNumber));
    if(rowValid && columnValid)
    {
      solutionArray[row][column] = randomNumber;
      this.IncrementInsertionPoint();
      return true;
    }
    else
    {
      return false;
    }

  }

  IncrementInsertionPoint()
  {
    this.insertionColumn++;
    if(this.insertionColumn >8)
    {
      this.insertionColumn = 0;
      this.insertionRow++;
    }
  }
}
