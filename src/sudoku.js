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
    let successfuleInsert = false;
    for(let i=0;i<60;)
    {
      successfuleInsert = this.InsertNextNumber();
      if(successfuleInsert)
      {
        i++;
        console.log("SUCCESS");
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
        thisSolution.push(this.solution[i].slice().sort(NumberSort));
      }
      for(let i = 0; i < 9; i++)
      {
        otherSolution.push(otherSudoku.solution[i].slice().sort(NumberSort));
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

  GetColumn(column)
  {
    let solutionMatrix = this.solution;
    let columnArray = [];
    //Create Column
    for(let i = 0; i < 9; i++)
    {
      columnArray.push(solutionMatrix[i][column]);
    }
    return columnArray;

  }

  GetRow(row)
  {
    let solutionMatrix = this.solution;
    let rowArray = solutionMatrix[row].slice();
    return rowArray;
  }

  GetValidNumbersForPosition(column,row)
  {
    //What a full row, column or block should contain
    let validArray = [1,2,3,4,5,6,7,8,9];
    let returnArray = [];
    let solutionMatrix = this.solution;

    let positionRow = this.GetRow(row);
    let positionColumn = this.GetColumn(column);


    let combined = positionRow.concat(positionColumn);
    combined.sort(NumberSort);

    /*Check Each Number in Valid Array if it isn't in the combinedArray
    then it must be a valid number
    */
    for(let i = 0; i < 9; i++)
    {
      let checkNumber = validArray[i];
      combined.forEach(function(element)
      {
        if(validArray[i] === element)
        {
          checkNumber = 0;
        }
      });
      if(checkNumber != 0)
      {
        returnArray.push(checkNumber);
      }
    }

    return returnArray;
  }

  InsertNextNumber()
  {
    //let 45;
    let randomNumber = Math.floor((Math.random() * 100)%9);
    if(randomNumber === 0)
    {
      randomNumber = 9;
    }
    let solutionArray = this.solution;
    let column = this.insertionColumn;
    let row = this.insertionRow;

    let validArray = this.GetValidNumbersForPosition(column,row);

    let validLength = validArray.length;
    randomNumber = validArray[randomNumber%validLength];

    console.log(validArray);
    console.log("INSERTING: "+randomNumber+" AT:"+row+":"+column);
    solutionArray[row][column] = randomNumber;
    this.IncrementInsertionPoint();
    return true;
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


  ConsoleOutput()
  {
    let solutionArray = this.solution;
    let outputString ="OUTPUT SUDOKU PUZZLE\n";
    for(let i = 0; i < 9; i++)
    {
      outputString += ("ROW: "+i+" |" + solutionArray[i]+"|\n");
    }
    console.log(outputString);
  }
}


function NumberSort(a,b)
{
  return a - b;
}
