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

  GetValidNumbersForPosition(column,row)
  {
    //What a full row, column or block should contain
    let validArray = [1,2,3,4,5,6,7,8,9];
    let returnArray = [];
    let solutionMatrix = this.solution;

    //Create Row
    let positionRow = solutionMatrix[row].slice();
    let positionColumn = [];
    //Create Column
    for(let i = 0; i < 9; i++)
    {
      positionColumn.push(solutionMatrix[i][column]);
    }

    let combined = positionRow.concat(positionColumn);
    combined.sort(NumberSort);

    for(let i = 0; i < 9; i++)
    {
      combined.forEach(function(element){
        if(validArray[i] === element)
        {
          validArray[i] = 0;
        }
      });
    }

    validArray.forEach(function(element){
      if(element != 0)
      {
        returnArray.push(element);
      }
    });

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
