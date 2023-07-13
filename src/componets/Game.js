import DiceRolling from './DiceRolling';
import DiceBoard from './DiceBoard';
import React, { useState, useEffect, useRef } from 'react';

function Game() {
  const [diceNumber, passDice] = useState(1);
  const [isPlayerTurn, changeTurn] = useState(true);
  const [isDiceRolled, diceRolled] = useState(false);
  const [playerBoardValues, changePBV] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [opponentBoardValues, changeOBV] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [lastAdded, newAdd] = useState([0, 0]);
  const [test, setTest] = useState([0, 0, '']);

  useEffect(() => {
    if (lastAdded[0] === 1) {
      checkDuplicateValues(0);
    } else if (lastAdded[0] === 2) {
      checkDuplicateValues(3);
    } else if (lastAdded[0] === 3) {
      checkDuplicateValues(6);
    }
  }, [isPlayerTurn]);

  const checkDuplicateValues = (rowNum) => {
    //player went last
    if (!isPlayerTurn) {
      for (let i = 0; i < 3; i++) {
        //checks to see if dice value just played matches up with any dice of the same
        //value in the oppents row
        if (
          opponentBoardValues[i + rowNum] === playerBoardValues[lastAdded[1]]
        ) {
          setTest([lastAdded[0], playerBoardValues[lastAdded[1]], 'opp']);
        }
      }
    }
    //opp went last
    else {
      for (let i = 0; i < 3; i++) {
        //checks to see if dice value just played matches up with any dice of the same
        //value in the player row
        if (
          playerBoardValues[i + rowNum] === opponentBoardValues[lastAdded[1]]
        ) {
          setTest([lastAdded[0], opponentBoardValues[lastAdded[1]], 'player']);
        }
      }
    }
  };

  const deleteDuplicateValues = (rowNum) => {
    console.log('first');
  };
  return (
    <div className="Game">
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
          isPlayer={true}
          isActive={isPlayerTurn}
          passDice={(diceNumber) => passDice(diceNumber)}
          diceRolled={(isDiceRolled) => diceRolled(isDiceRolled)}
          isRolled={isDiceRolled}
        />
      </fieldset>
      <fieldset className={`dice-board`}>
        <div className="dice-board">
          <DiceBoard
            diceNumber={diceNumber}
            changeTurn={(isPlayerTurn) => changeTurn(isPlayerTurn)}
            newAdd={(lastAdded) => newAdd(lastAdded)}
            changePBV={(playerBoardValues) => changePBV(playerBoardValues)}
            playerArr={playerBoardValues}
            playerTurn={isPlayerTurn}
            diceRolled={isDiceRolled}
            isPlayer={true}
            test={test}
          />
          <DiceBoard
            diceNumber={diceNumber}
            changeTurn={(isPlayerTurn) => changeTurn(isPlayerTurn)}
            newAdd={(lastAdded) => newAdd(lastAdded)}
            changeOBV={(opponentBoardValues) => changeOBV(opponentBoardValues)}
            opponentArr={opponentBoardValues}
            playerTurn={isPlayerTurn}
            diceRolled={isDiceRolled}
            isPlayer={false}
            test={test}
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
          isPlayer={false}
          isActive={isPlayerTurn}
          passDice={(diceNumber) => passDice(diceNumber)}
          diceRolled={(isDiceRolled) => diceRolled(isDiceRolled)}
          isRolled={isDiceRolled}
        />
      </fieldset>
    </div>
  );
}

export default Game;
