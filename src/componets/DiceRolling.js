import React, { useState, useEffect, useRef} from 'react';

function DiceRolling(props) {

  const [dice, diceRoll] = useState(1);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const ping = async () => {
    for (let i = 0; i < 10; i++) {
      let randomNumber = getRandomInt(6) + 1;
      diceRoll(randomNumber);
      await sleep(70);
      if (i === 9) {
        props.passDice(randomNumber);
        let x = !props.isRolled;
        props.diceRolled(x);
      }
    }
   }
   const prevPropValueRef = useRef(props.isActive);
   
  useEffect(() => {
    // Compare the current prop value with the previous prop value
    if (props.isActive !== prevPropValueRef.current) {
      ping() 
      // Perform actions or logic based on the prop change
    }

    // Update the previous prop value with the current prop value
    prevPropValueRef.current = props.isActive;
  }, [props.isActive]);

 

   // run on first render 
    useEffect(() => {
     if(!props.isActive){
      ping()
     }
    }, []);
  ;

  return (
    <div className="dice-containter">
      <h1>{props.isActive}</h1>
      <div className="dice-rolling-container">
        <div className={`dice${dice} dice-roll-box`}></div>
      </div>
      <button onClick={ping}>click</button>
    </div>
  );
}

export default DiceRolling;
