import DiceRolling from './DiceRolling';
import DiceBoard from './DiceBoard';
import React, { useState } from 'react';

function Game() {
  const [diceNumber, passDice] = useState(1);
  const [isPlayerTurn, changeTurn] = useState(true);
  const [isDiceRolled, diceRolled] = useState(false);

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
      <div className="dice-board">
        <DiceBoard
          diceNumber={diceNumber}
          changeTurn={(isPlayerTurn) => changeTurn(isPlayerTurn)}
          isActive={isPlayerTurn}
        />
      </div>
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
        <DiceRolling isActive={isPlayerTurn} />
      </fieldset>
    </div>
  );
}

export default Game;
