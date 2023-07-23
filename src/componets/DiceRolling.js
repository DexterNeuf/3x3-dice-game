import React, { useState, useEffect, useRef} from 'react';

function DiceRolling(props) {

  const [dice, diceRoll] = useState(1);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const diceAnimation = async () => {
    for (let i = 0; i < 10; i++) {
      let randomNumber = getRandomInt(6) + 1;
      diceRoll(randomNumber);
      await sleep(72);
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
      if (props.isActive && props.isPlayer) {
        diceAnimation() 
      } else if (!props.isActive && !props.isPlayer){
        diceAnimation()
      }
      // Perform actions or logic based on the prop change
    }

    // Update the previous prop value with the current prop value
    prevPropValueRef.current = props.isActive;
  }, [props.isActive]);

 
   //run on first render 
    useEffect(() => {
     if(props.isPlayer){
      diceAnimation()
     }
    }, []);
  ;

  return (
    <div className="dice-containter">
      <div className="dice-rolling-container">
        <div className={`dice${dice} dice-roll-box`}></div>
      </div>
    </div>
  );
}

export default DiceRolling;
