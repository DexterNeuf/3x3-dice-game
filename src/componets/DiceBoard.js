import React, { useState } from 'react';

function DiceBoard(props) {
  const [postionTracker, changePostion] = useState(0);

  const newAdd = (index) => {
    props.newAdd(index);
    props.bar(!props.foo);
  };

  const IsPlayerDiv = (props) => {
    return (
      <div
        style={{
          backgroundColor: 'red',
          backgroundColor: props.playerTurn ? 'green' : 'red',
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
          backgroundColor: !props.playerTurn ? 'green' : 'red',
          width: '50px',
          height: '50px',
        }}
      ></div>
    );
  };
  const addDice = (e) => {
    let currentRow = e.target.parentElement.id[3];
    if (currentRow == 1) {
      findDicePostion(0);
    } else if (currentRow == 2) {
      findDicePostion(3);
    } else if (currentRow == 3) {
      findDicePostion(6);
    }
  };

  const findDicePostion = (rowNum) => {
    //find the first zero of a row
    for (let i = 0; i < 3; i++) {
      if (props.diceBoard[i + rowNum] === 0) {
        newAdd(i + rowNum);
        break;
      }
    }
  };
  return (
    <div>
      <div className="player-board">
        <div className={`player-row`}>
          <section
            id="row1"
            className={`player-row ${
              props.isPlayer && postionTracker === 0 ? 'selected' : ''
            }`}
            onClick={addDice}
          >
            <div className={`dice dice${props.diceBoard[2]}`}></div>
            <div className={`dice dice${props.diceBoard[1]}`}></div>
            <div className={`dice dice${props.diceBoard[0]}`}></div>
          </section>
        </div>
        <div className={`player-row`}>
          <section id="row2" className={`player-row`} onClick={addDice}>
            <div className={`dice dice${props.diceBoard[5]}`}></div>
            <div className={`dice dice${props.diceBoard[4]}`}></div>
            <div className={`dice dice${props.diceBoard[3]}`}></div>
          </section>
        </div>
        <div className={`player-row`} onClick={addDice}>
          <section id="row3" className={`player-row`}>
            <div className={`dice dice${props.diceBoard[8]}`}></div>
            <div className={`dice dice${props.diceBoard[7]}`}></div>
            <div className={`dice dice${props.diceBoard[6]}`}></div>
          </section>
        </div>
      </div>
      {props.isPlayer ? (
        <IsPlayerDiv playerTurn={props.playerTurn} />
      ) : (
        <IsNotPlayerDiv playerTurn={props.playerTurn} />
      )}
    </div>
  );
}

export default DiceBoard;
