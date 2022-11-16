import DiceRolling from './DiceRolling';
import DiceBoard from './DiceBoard';
import GameFinishModal from './GameFinishModal';
import React, { useState, useEffect } from 'react';

function Game() {
  const [diceNumber, passDice] = useState(0);
  const [isPlayerTurn, changeTurn] = useState(true);
  const [isDiceRolled, diceRolled] = useState(false);
  const [playerBoardValues, changePBV] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [opponentBoardValues, changeOBV] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [lastAdded, newAdd] = useState(0);
  const [foo, bar] = useState(false);
  const [isBoardFull, changeBoardFull] = useState(false);

  useEffect(() => {
    if (diceNumber !== 0) {
      if (isPlayerTurn) {
        changePlayerBoardValues();
      } else {
        changeOpponentBoardValues();
      }
    }
  }, [foo]);

  const changePlayerBoardValues = () => {
    let newArray = playerBoardValues;
    newArray.splice(lastAdded, 1, diceNumber);
    changePBV(newArray);
    checkBoardFull();
    checkDupValues();
  };
  const changeOpponentBoardValues = () => {
    let newArray = opponentBoardValues;
    newArray.splice(lastAdded, 1, diceNumber);
    changeOBV(newArray);
    checkDupValues();
  };

  const checkBoardFull = () => {
    let isFull = true;
    let currentBoard = '';
    isPlayerTurn
      ? (currentBoard = playerBoardValues)
      : (currentBoard = opponentBoardValues);
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === 0) isFull = false;
    }
    if (isFull === true) changeBoardFull(!isBoardFull);
  };

  //funciton to check if the dice added matches to any of the dice on the opposite player board
  const checkDupValues = () => {
    let rowStart;
    if (lastAdded < 3) {
      rowStart = 0;
    } else if (lastAdded < 9 && lastAdded > 5) {
      rowStart = 6;
    } else {
      rowStart = 3;
    }
    let oppositeBoard;
    // determine what board to chose depending on the player turn
    isPlayerTurn
      ? (oppositeBoard = opponentBoardValues)
      : (oppositeBoard = playerBoardValues);
    for (let i = 0; i < 3; i++) {
      if (oppositeBoard[i + rowStart] === diceNumber) {
        //calls function to delete dup values if found
        deleteDupValues(oppositeBoard, rowStart);
        break;
      }
    }
    checkBoardFull();
    changeTurn(!isPlayerTurn);
  };
  const deleteDupValues = (oppositeBoard, rowStart) => {
    // goes thru all the values of the dice in a row and deletes all copies of the dup values
    for (let i = 0; i < 3; i++) {
      if (oppositeBoard[i + rowStart] === diceNumber) {
        oppositeBoard[i + rowStart] = 0;
      }
    }
    isPlayerTurn ? changeOBV(oppositeBoard) : changePBV(oppositeBoard);
    checkBoardFull();
    changeTurn(!isPlayerTurn);
  };

  const testBoardFull = () => {
    changeBoardFull(!isBoardFull);
  };
  return (
    <div className="Game">
      <GameFinishModal isBoardFull={isBoardFull}></GameFinishModal>
      <fieldset
        disabled={!isPlayerTurn}
        className={`player-space`}
        style={{
          filter:
            isPlayerTurn === false
              ? 'grayscale(50%) blur(5px)'
              : 'grayscale(0%)',
          disabled: isPlayerTurn === false ? 'none' : 'disabled',
        }}
      >
        <DiceRolling
          passDice={(diceNumber) => passDice(diceNumber)}
          diceRolled={(isDiceRolled) => diceRolled(isDiceRolled)}
          isRolled={isDiceRolled}
        />
      </fieldset>
      <fieldset className={`dice-board`}>
        <div className="dice-board">
          <DiceBoard
            isPlayer={true}
            foo={foo}
            bar={(foo) => bar(foo)}
            playerTurn={isPlayerTurn}
            diceBoard={playerBoardValues}
            newAdd={(lastAdded) => newAdd(lastAdded)}
          />
          <DiceBoard
            isPlayer={false}
            foo={foo}
            bar={(foo) => bar(foo)}
            playerTurn={isPlayerTurn}
            diceBoard={opponentBoardValues}
            newAdd={(lastAdded) => newAdd(lastAdded)}
          />
        </div>
      </fieldset>
      <fieldset
        disabled={isPlayerTurn}
        className="oppenent-space"
        style={{
          filter:
            isPlayerTurn === true
              ? 'grayscale(50%) blur(5px)'
              : 'grayscale(0%)',
        }}
      >
        <DiceRolling
          passDice={(diceNumber) => passDice(diceNumber)}
          diceRolled={(isDiceRolled) => diceRolled(isDiceRolled)}
        />
      </fieldset>
    </div>
  );
}

export default Game;
