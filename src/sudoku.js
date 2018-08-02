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
    let notDone = true;

    while(notDone)
    {
      this.ResetArray();
      this.FillBlock(0);
      this.FillBlock(1);
      this.FillBlock(2);
      this.FillBlock(6);
      this.FillBlock(7);
      this.FillBlock(8);
      this.FillBlock(3);

      let success = this.FillLastTwoBlocks(4,5);
      if(success)
      {
        notDone = false;
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

  FillBlock(blockNumber)
  {
    console.log("FILLING BLOCK: "+blockNumber);
    let offsets = [[0,0],[0,3],[0,6],[3,0],[3,3],[3,6],[6,0],[6,3],[6,6]];
    let blockOffset = offsets[blockNumber];
    let rowBound = 3+blockOffset[0];
    let columnBound = 3+blockOffset[1];
    let repeatLoop = true;
    while(repeatLoop)
    {
      repeatLoop=false;
      for(let row=blockOffset[0];row<rowBound && (!repeatLoop);row++)
      {
        for(let column=blockOffset[1];column<columnBound && (!repeatLoop);column++)
        {
          //&& (!repeatLoop)
          repeatLoop = !(this.InsertRandomNumberAt(row,column));
          if(repeatLoop)
          {
            this.ResetBlock(blockNumber);
            console.log("REPEAT");
          }
        }
      }
    }
  }

  //Special algorithm when last two blocks need to be filled
  FillLastTwoBlocks(blockOne)
  {
    let solutionMatrix = this.solution;
    let offsets = [[0,0],[0,3],[0,6],[3,0],[3,3],[3,6],[6,0],[6,3],[6,6]];
    let blockOneOffsets = offsets[blockOne];
    let TwoBlocks = [];
    let rows = [];
    let outputString = "\n";

    for(let row=blockOneOffsets[0]; row<6;row++)
    {
      for(let column=blockOneOffsets[1];column<9;column++)
      {
        rows.push(this.GetValidNumbersForPosition(column,row));
      }
      TwoBlocks.push(rows.slice());
      rows = [];
    }

    let emptyArraysFound = false;
    let singleArraysFound = false;
    for(let i=0;i<3;i++)
    {
      for(let j =0;j<6;j++)
      {
        let offsetX = blockOneOffsets[0]+i;
        let offsetY = blockOneOffsets[1]+j;
        let valueArray = TwoBlocks[i][j];

        outputString += ("["+valueArray+"]");

        if(valueArray.length === 1)
        {
          let value = valueArray[0];
          console.log("INSERTING POINT ("+offsetX+","+offsetY+") "+ "VALUE: "+value);
          this.InsertNumberAt(offsetX,offsetY,value);
          singleArraysFound = true;
        }
        if(valueArray.length === 0)
        {
          emptyArraysFound = true;
        }
      }
      outputString += ("\n");
    }
    console.log(outputString);
    return !(emptyArraysFound || !singleArraysFound)
  }

  ResetBlock(blockNumber)
  {
    let solutionMatrix = this.solution;
    let offsets = [[0,0],[0,3],[0,6],[3,0],[3,3],[3,6],[6,0],[6,3],[6,6]];
    let blockOffset = offsets[blockNumber];
    let rowBound = 3+blockOffset[0];
    let columnBound = 3+blockOffset[1];

    for(let row=blockOffset[0];row<rowBound;row++)
    {
      for(let column=blockOffset[1];column<columnBound;column++)
      {
        solutionMatrix[row][column] = 0;
      }
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
    //console.log("Block: "+positionBlock);

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

  InsertRandomNumberAt(row,column)
  {
    let randomNumber = (Math.floor((Math.random() * 100)%9)+1);
    let solutionArray = this.solution;
    let validArray = this.GetValidNumbersForPosition(column,row);

    let validLength = validArray.length;
    randomNumber = validArray[randomNumber%validLength];
    if(randomNumber == undefined)
    {
      randomNumber = 0;
    }
    solutionArray[row][column] = randomNumber;
    return (randomNumber!=0);
  }

  InsertNumberAt(row,column,value)
  {
    let solutionArray = this.solution;
    solutionArray[row][column] = value;
    return (value!=0);
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
        outputString += ("\n ----------------------------------");
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
