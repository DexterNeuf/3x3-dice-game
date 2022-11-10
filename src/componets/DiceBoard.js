import React, { useState } from 'react';

function DiceBoard(props) {
  const newAdd = (rowNum) => {
    props.newAdd(rowNum);
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
    console.log('e');
    let currentRow = e.target.parentElement.id;
    //sends the current row that has been selected up to game logic
    newAdd(currentRow[3]);
  };
  return (
    <div>
      <div className="player-board">
        <div className={`player-row`}>
          <container id="row1" className={`player-row`} onClick={addDice}>
            <div className={`dice${props.diceBoard[0]}`}></div>
            <div></div>
            <div></div>
          </container>
        </div>
        <div className={`player-row`}>
          <container id="row2" className={`player-row`} onClick={addDice}>
            <div></div>
            <div></div>
            <div></div>
          </container>
        </div>
        <div className={`player-row`} onClick={addDice}>
          <container id="row3" className={`player-row`}>
            <div></div>
            <div></div>
            <div></div>
          </container>
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
