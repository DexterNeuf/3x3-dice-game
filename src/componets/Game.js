import DiceRolling from './DiceRolling';
import DiceBoard from './DiceBoard';
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
    console.log(lastAdded);
    // let x = playerBoardValues;
    // changePBV(x.splice(lastAdded, 0, diceNumber));
    changeTurn(!isPlayerTurn);
  };
  const changeOpponentBoardValues = () => {
    console.log(lastAdded);
    changeTurn(!isPlayerTurn);
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
