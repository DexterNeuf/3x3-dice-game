import React, { useState } from 'react';

function DiceRolling(props) {
  const [dice, diceRoll] = useState(1);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const ping = async () => {
    props.passDice(1);
    for (let i = 0; i < 10; i++) {
      let randomNumber = getRandomInt(6) + 1;
      diceRoll(randomNumber);
      await sleep(60);
      if (i === 9) {
        props.passDice(randomNumber);
        let x = !props.isRolled;
        props.diceRolled(x);
      }
    }
  };

  return (
    <div className="dice-containter">
      <div className="dice-rolling-container">
        {props.diceNumber ? (
          <div className={`dice dice${dice}`}></div>
        ) : (
          <div className={`dice`}></div>
        )}
      </div>
      <button onClick={ping}>click</button>
    </div>
  );
}

export default DiceRolling;
