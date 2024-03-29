import React, {
  useState,
} from 'react';

function DiceBoard(props) {
  const [isActive, setActive] = useState('true');

  const handleMouseOver = (e) => {
    let selectedRow = e.target.parentElement.id;
    if (selectedRow) {
      if (selectedRow === 'row1') {
        //find the first block thats isnt filled
        let obj = row1.find((o) => o.isFilled === true);
        let i = row1.indexOf(obj);
        // first block isnt filled
        if (!obj) {
          changeDiceValue(
            row1.map((x) => {
              if (x.position === `1.0`) {
                x.value = props.diceNumber;
                x.isHovered = true;
              }
              return { ...x };
            })
          );
        } else {
          // if it isnt the first find the index of the last filled obj
          changeDiceValue(
            row1.map((x) => {
              if (x.position === `1.${i}`) {
                x.value = props.diceNumber;
                x.isHovered = true;
              }
              return { ...x };
            })
          );
        }
      }
    }
  };
  const IsPlayerDiv = (props) => {
    return (
      <div
        style={{
          backgroundColor: 'red',
          backgroundColor:
            props.playerTurn && props.diceRolled ? 'green' : 'red',
          width: '50px',
          height: '50px',
        }}
      ></div>
    );
  };
  const IsNotPlayerDiv = (props) => {
    return (
      <div
        style={{
          backgroundColor:
            !props.playerTurn && props.diceRolled ? 'green' : 'red',
          width: '50px',
          height: '50px',
        }}
      ></div>
    );
  };


  const [row1, changeDiceValue] = useState([
    { value: 0, isFilled: false, isHovered: false, position: '1.0' },
    { value: 0, isFilled: false, isHovered: false, position: '1.1' },
    { value: 0, isFilled: false, isHovered: false, position: '1.2' },
  ]);
  const [row2, changeDiceValue2] = useState([
    { value: 0, isFilled: false, isHovered: false, position: '2.0' },
    { value: 0, isFilled: false, isHovered: false, position: '2.1' },
    { value: 0, isFilled: false, isHovered: false, position: '2.2' },
  ]);
  const [row3, changeDiceValue3] = useState([
    { value: 0, isFilled: false, position: '3.0' },
    { value: 0, isFilled: false, position: '3.1' },
    { value: 0, isFilled: false, position: '3.2' },
  ]);

  const addDice1 = (e) => {
    let currentRow = e.target.parentElement.id;
    if (currentRow === 'row1') {
      if (row1[0].isFilled === false) {
        addDiceToRow('1.0');
      } else if (row1[1].isFilled === false) {
        addDiceToRow('1.1');
      } else if (row1[2].isFilled === false) {
        addDiceToRow('1.2');
      } else {
        return;
      }
    }
  };
  const addDice2 = (e) => {
    let currentRow = e.target.parentElement.id;
    if (currentRow === 'row2') {
      if (row2[0].isFilled === false) {
        addDiceToRow2('2.0');
      } else if (row2[1].isFilled === false) {
        addDiceToRow2('2.1');
      } else if (row2[2].isFilled === false) {
        addDiceToRow2('2.2');
      } else {
        return;
      }
    }
  };
  const addDice3 = (e) => {
    let currentRow = e.target.parentElement.id;
    if (currentRow === 'row3') {
      if (row3[0].isFilled === false) {
        addDiceToRow3('3.0');
      } else if (row3[1].isFilled === false) {
        addDiceToRow3('3.1');
      } else if (row3[2].isFilled === false) {
        addDiceToRow3('3.2');
      } else {
        return;
      }
    }
  };
  const addDiceToRow = (rowNum) => {
    changeDiceValue(
      row1.map((x) => {
        if (x.position === rowNum) {
          x.value = props.diceNumber;
          x.isFilled = true;
        }
        return { ...x };
      })
    );
    if (props.isPlayer) {
      let lastFilled = props.playerArr.findIndex((element) => element === 0);
      let newArr = props.playerArr;
      newArr.splice(lastFilled, 1, props.diceNumber);
      props.changePBV(newArr);
      props.newAdd([1, lastFilled]);
    } else {
      let lastFilled = props.opponentArr.findIndex((element) => element === 0);
      let newArr = props.opponentArr;
      newArr.splice(lastFilled, 1, props.diceNumber);
      props.changeOBV(newArr);
      props.newAdd([1, lastFilled]);
    }
    let changedTurn = !props.playerTurn;
    props.changeTurn(changedTurn);
  };

  const addDiceToRow2 = (rowNum) => {
    changeDiceValue2(
      row2.map((x) => {
        if (x.position === rowNum) {
          x.value = props.diceNumber;
          x.isFilled = true;
        }
        return { ...x };
      })
    );
    // finds the first 0 value in the player board value array 3 in too
    //represnt second column
    if (props.isPlayer) {
      let index;
      let i = 2;
      do {
        if (props.playerArr[i] === 0) {
          index = i;
        }
        i++;
      } while (!index);
      let newArr = props.playerArr;
      newArr.splice(index, 1, props.diceNumber);
      props.changePBV(newArr);
      props.newAdd([2, index]);
    } else {
      let index;
      let i = 2;
      do {
        if (props.opponentArr[i] === 0) {
          index = i;
        }
        i++;
      } while (!index);
      let newArr = props.opponentArr;
      newArr.splice(index, 1, props.diceNumber);
      props.changeOBV(newArr);
      props.newAdd([2, index]);
    }
    let changedTurn = !props.playerTurn;
    props.changeTurn(changedTurn);
  };

  const addDiceToRow3 = (rowNum) => {
    changeDiceValue3(
      row3.map((x) => {
        if (x.position === rowNum) {
          x.value = props.diceNumber;
          x.isFilled = true;
        }
        return { ...x };
      })
    );
    if (props.isPlayer) {
      let index;
      let i = 6;
      do {
        if (props.playerArr[i] === 0) {
          index = i;
        }
        i++;
      } while (!index);
      let newArr = props.playerArr;
      newArr.splice(index, 1, props.diceNumber);
      props.changePBV(newArr);
      props.newAdd([3, index]);
    } else {
      let index;
      let i = 6;
      do {
        if (props.opponentArr[i] === 0) {
          index = i;
        }
        i++;
      } while (!index);
      let newArr = props.opponentArr;
      newArr.splice(index, 1, props.diceNumber);
      props.changeOBV(newArr);
      props.newAdd([3, index]);
    }
    let changedTurn = !props.playerTurn;
    props.changeTurn(changedTurn);
  };

//Checks too see if there are any duplicate numbers in a row and if
//there are it multiples them by 2 for pairs and 3 for triples
 const AddTogether = (props) => {
  //check what row its from
   let row ;
   if (props.rowNum === 1){
     row=row1
    }else if (props.rowNum === 2){
      row=row2
    }else{
      row=row3
    }

  // gets value of the dice in row and adds it too new array
    const extractValuesFromRow = () =>{
      const valuesArray = [];
       for (const obj of row) {
           if (obj.hasOwnProperty('value')) {
           valuesArray.push(obj['value']);
         }
       }
       return valuesArray;
     }

    //checks to see if there are duplicates and does math 
    const findDups = () => {
       let rowValue = extractValuesFromRow()
      if(rowValue[0] === rowValue[1] && rowValue[0] === rowValue[2]){
        rowValue = [rowValue[0]*3, rowValue[1]*3, rowValue[2]*3,]
      }else if(rowValue[0] === rowValue[1]) {
        rowValue = [rowValue[0]*2, rowValue[1]*2, rowValue[2],]
      }else if(rowValue[1] === rowValue[2]) {
        rowValue = [rowValue[0], rowValue[1]*2, rowValue[2]*2,] 
      }
      return(
        rowValue
      )
    }
      const calculatedRow = findDups()
      return(
        <p>{calculatedRow[0] + calculatedRow[1] + calculatedRow[2]}</p> 
      )
 }

  return (
    <div>
      <div className="player-board">
        <h1></h1>
        <div className={`player-row`}>
          <container
            id="row1"
            className={`player-row ${isActive ? 'hoverable' : ''}`}
            onClick={addDice1}
            // onMouseEnter={handleMouseOver}
            // onMouseOut={handleMouseOut}
          >
            {row1[2].isFilled === true || row1[2].isHovered === true ? (
              <div className={`dice${row1[2].value}`}></div>
            ) : (
              <div>{row1[2].value}</div>
            )}
            {row1[1].isFilled === true || row1[1].isHovered === true ? (
              <div className={`dice${row1[1].value}`}></div>
            ) : (
              <div>{row1[1].value}</div>
            )}

            {row1[0].isFilled === true || row1[0].isHovered === true ? (
              <div className={`dice${row1[0].value}`}></div>
            ) : (
              <div>{row1[0].value}</div>
            )}
          </container>
          <AddTogether
            rowNum={1}          
          />
        </div>
        <div className={`player-row`}>
          <container
            id="row2"
            className={`player-row ${isActive ? 'hoverable' : ''}`}
            onClick={addDice2}
            // onMouseEnter={handleMouseOver}
            // onMouseOut={handleMouseOut}
          >
            {row2[2].isFilled === true || row2[2].isHovered === true ? (
              <div className={`dice${row2[2].value}`}></div>
            ) : (
              <div>{row2[2].value}</div>
            )}
            {row2[1].isFilled === true || row2[1].isHovered === true ? (
              <div className={`dice${row2[1].value}`}></div>
            ) : (
              <div>{row2[1].value}</div>
            )}
            {row2[0].isFilled === true || row2[0].isHovered === true ? (
              <div className={`dice${row2[0].value}`}></div>
            ) : (
              <div>{row2[0].value}</div>
            )}
          </container>
          <AddTogether
            rowNum={2}          
          />
        </div>
        <div className={`player-row`}>
          <container
            id="row3"
            className={`player-row ${isActive ? 'hoverable' : ''}`}
            onClick={addDice3}
            onMouseOver={handleMouseOver}
          >
            {row3[2].isFilled === true || row3[2].isHovered === true ? (
              <div className={`dice${row3[2].value}`}></div>
            ) : (
              <div>{row3[2].value}</div>
            )}
            {row3[1].isFilled === true || row3[1].isHovered === true ? (
              <div className={`dice${row3[1].value}`}></div>
            ) : (
              <div>{row3[1].value}</div>
            )}
            {row3[0].isFilled === true || row3[0].isHovered === true ? (
              <div className={`dice${row3[0].value}`}></div>
            ) : (
              <div>{row3[0].value}</div>
            )}
          </container>
          <AddTogether
            rowNum={3}          
          />
        </div>
      </div>
      {props.isPlayer ? (
        <IsPlayerDiv
          playerTurn={props.playerTurn}
          diceRolled={props.diceRolled}
        />
      ) : (
        <IsNotPlayerDiv
          playerTurn={props.playerTurn}
          diceRolled={props.diceRolled}
        />
      )}
    </div>
  );
}

export default DiceBoard;
