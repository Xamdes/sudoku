export class Sudoku
{
  constructor()
  {
    this.solution = [];
    this.ResetArray();
  }

  CreatePuzzle()
  {
    console.log("CREATE PUZZLE");
    let successfuleInsert = false;
    for(let row=0;row<9;row++)
    {
      for(let column=0;column<9;column++)
      {
        this.InsertNextNumber(row,column);
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

  GetColumn(column)
  {
    let solutionMatrix = this.solution;
    let columnArray = [];
    //Create Column
    for(let row=0;row< 9;row++)
    {
      columnArray.push(solutionMatrix[row][column]);
    }
    return columnArray;

  }

  GetRow(row)
  {
    let solutionMatrix = this.solution;
    let rowArray = solutionMatrix[row].slice();
    return rowArray;
  }

  GetBlock(row,column)
  {
    let location = [[0,1,2],[3,4,5],[6,7,8]];
    let block = [];
    let solutionMatrix = this.solution;
    let rowsLoc = Math.floor(row/3);
    let columnsLoc = Math.floor(column/3);
    let rows = location[rowsLoc];
    let columns = location[columnsLoc];

    for(let i=0;i<3;i++)
    {
      for(let j=0;j<3;j++)
      {
        block.push(solutionMatrix[rows[i]][columns[j]]);
      }
    }
    return block;
  }

  GetValidNumbersForPosition(column,row)
  {
    //What a full row, column or block should contain
    let validArray = [1,2,3,4,5,6,7,8,9];
    let returnArray = [];

    let positionRow = this.GetRow(row);
    let positionColumn = this.GetColumn(column);
    let positionBlock = this.GetBlock(row,column);
    console.log("Block: "+positionBlock);

    let combined = positionRow.concat(positionColumn).concat(positionBlock);
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

  InsertNextNumber(row,column)
  {
    //let 45;
    let randomNumber = (Math.floor((Math.random() * 100)%9)+1);
    let solutionArray = this.solution;
    let validArray = this.GetValidNumbersForPosition(column,row);

    let validLength = validArray.length;
    randomNumber = validArray[randomNumber%validLength];
    if(randomNumber == undefined)
    {
      randomNumber = 0;
    }

    console.log(validArray);
    console.log("INSERTING: "+randomNumber+" AT:"+row+":"+column);
    solutionArray[row][column] = randomNumber;
    return true;
  }

  ConsoleOutput()
  {
    let solutionArray = this.solution;
    let outputString ="OUTPUT SUDOKU PUZZLE\n";
    for(let i = 0; i < 9; i++)
    {
      outputString += ("ROW: "+i+" | ");
      for(let j=0;j<9;j++)
      {
        outputString += (solutionArray[i][j]);
        if(j==2 || j==5 || j==8)
        {
          outputString += " | ";
        }
        else
        {
          outputString += " ";
        }
      }
      if(i==2||i==5)
      {
        outputString += ("\n -------------------------");
      }
      outputString += ("\n");
    }
    console.log(outputString);
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
}


function NumberSort(a,b)
{
  return a - b;
}
