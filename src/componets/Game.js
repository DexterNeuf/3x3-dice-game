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
