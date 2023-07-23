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
  const [playerScore, changePlayerScore] = useState(0)
  const [oppenentScore, changeOpponentScore] = useState(0)
  const [lastAdded, newAdd] = useState([0, 0]);

  const isFilled  =  () => {
    const indexOfZero = playerBoardValues.indexOf(0)
    if ( indexOfZero === -1){
      console.log('filled');
    }else if( indexOfZero === 0){
    }
    
  }
  isFilled()
  return (
    <div className="Game">
      <fieldset
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
            changePlayerScore={(playerScore) => changePlayerScore(playerScore)}
            playerScore ={playerScore}
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
            changePlayerScore={(playerScore) => changePlayerScore(playerScore)}
            opponentArr={opponentBoardValues}
            playerTurn={isPlayerTurn}
            diceRolled={isDiceRolled}
            isPlayer={false}
          />
        </div>
      </fieldset>
      <fieldset
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
