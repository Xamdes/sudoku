export class Sudoku
{
  constructor()
  {
    this.solution = [];
    this.insertionPoint = [-1,-1];
    this.ResetArray();
  }

  CreatePuzzle()
  {
    console.log("CREATE PUZZLE");
    console.log(this.solution);
    while(this.solution[8][8] === 0)
    {
      this.InsertNextNumber(RandomInt(9));
    }
  }

  ResetArray()
  {
    this.solution = [];
    for(let i = 0; i < 9; i++)
    {
      this.solution.push(this.constructor.EmptyRow().slice());
    }
  }

  static DefaultRow()
  {
    let temp = [9,8,7,6,5,4,3,2,1];
    return temp;
  }

  static EmptyRow()
  {
    let temp = [0,0,0,0,0,0,0,0,0];
    return temp;
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

  ValidColumn(columnNumber)
  {
    let tempSolution = this.solution[columnNumber].slice().sort().reverse();
    for(let i = 0; i < 9; i++)
    {
      if(tempSolution[i] === 0)
      {
        return true;
      }
      else if(tempSolution[i] != this.constructor.DefaultRow()[i])
      {
        return false;
      }
    }
    return true;
  }

  ValidRow(rowNumber)
  {
    let tempRow = [];
    for(let i = 0; i < 9; i++)
    {
      tempRow.push(this.solution[i][rowNumber]);
    }
    tempRow.sort().reverse();
    for(let i = 0; i < 9; i++)
    {
      if(tempRow[i] === 0)
      {
        return true;
      }
      else if(tempRow[i] != this.constructor.DefaultRow()[i])
      {
        return false;
      }
    }
    return true;
  }

  InsertNextNumber(number)
  {
    if(this.insertionPoint[0] === -1)
    {
      for(let i = 0; i < 9; i++)
      {
        for(let j = 0; j < 9; j++)
        {
          if(this.solution[i][j] === 0)
          {
            this.insertionPoint = [i,j];
            i = j = 10;
          }
        }
      }
    }
    let column = this.insertionpoint[0];
    let row = this.insertionpoint[1];
    console.log(row+" | "+column);
    this.solution[column][row] = number;
    if(this.ValidColumn(column) && this.ValidRow(row))
    {
      this.insertionPoint = [-1,-1];
      return true;
    }
    else
    {
      this.soltion[column,row] = 0;
      return false;
    }

  }
}

function RandomInt(max)
{
  return (Math.floor(Math.random()*max+1));
}
