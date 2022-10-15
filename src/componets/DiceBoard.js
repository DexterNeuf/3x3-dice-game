import React, { useState } from 'react';

function DiceBoard(props) {
  const [isActive, setActive] = useState('true');
  const [lastHovered, setLastHovered] = useState('0');

  // const [diceNumber, setDice] = useState(props.diceNumber);

  const handleMouseOver = (e) => {
    let selectedRow = e.target.parentElement.id;
    if (selectedRow) {
      if (selectedRow === 'row1') {
        //find the first block thats isnt filled
        let obj = row1.find((o) => o.isFilled === true);
        let i = row1.indexOf(obj);
        // first block isnt filled
        if (!obj) {
          changeDiceValue(
            row1.map((x) => {
              if (x.position === `1.0`) {
                x.value = props.diceNumber;
                x.isHovered = true;
              }
              return { ...x };
            })
          );
        } else {
          // if it isnt the first find the index of the last filled obj
          changeDiceValue(
            row1.map((x) => {
              if (x.position === `1.${i}`) {
                x.value = props.diceNumber;
                x.isHovered = true;
              }
              return { ...x };
            })
          );
        }
        setLastHovered('row1');
      }
    }
  };

  const handleMouseOut = (e) => {
    if (lastHovered === 'row1') {
      let obj = row1.find((o) => o.isHovered === true);
      if (obj) {
        let i = row1.indexOf(obj);
        changeDiceValue(
          row1.map((x) => {
            if (x.position === `1.${i}`) {
              x.value = 0;
              x.isHovered = false;
            }
            return { ...x };
          })
        );
      }
    }
  };

  const addDiceToRow = (rowNum) => {
    changeDiceValue(
      row1.map((x) => {
        if (x.position === rowNum) {
          x.value = props.diceNumber;
          x.isFilled = true;
        }
        return { ...x };
      })
    );
    let changedTurn = !props.isActive;
    props.changeTurn(changedTurn);
  };

  const addDiceToRow2 = (rowNum) => {
    changeDiceValue2(
      row2.map((x) => {
        if (x.position === rowNum) {
          x.value = props.diceNumber;
          x.isFilled = true;
        }
        return { ...x };
      })
    );
    let changedTurn = !props.isActive;
    props.changeTurn(changedTurn);
  };

  const addDiceToRow3 = (rowNum) => {
    changeDiceValue3(
      row3.map((x) => {
        if (x.position === rowNum) {
          x.value = props.diceNumber;
          x.isFilled = true;
        }
        return { ...x };
      })
    );
    let changedTurn = !props.isActive;
    props.changeTurn(changedTurn);
  };

  const [row1, changeDiceValue] = useState([
    { value: 0, isFilled: false, isHovered: false, position: '1.0' },
    { value: 0, isFilled: false, isHovered: false, position: '1.1' },
    { value: 0, isFilled: false, isHovered: false, position: '1.2' },
  ]);
  const [row2, changeDiceValue2] = useState([
    { value: 0, isFilled: false, isHovered: false, position: '2.0' },
    { value: 0, isFilled: false, isHovered: false, position: '2.1' },
    { value: 0, isFilled: false, isHovered: false, position: '2.2' },
  ]);
  const [row3, changeDiceValue3] = useState([
    { value: 0, isFilled: false, position: '3.0' },
    { value: 0, isFilled: false, position: '3.1' },
    { value: 0, isFilled: false, position: '3.2' },
  ]);

  const addDice1 = (e) => {
    let currentRow = e.target.parentElement.id;
    if (currentRow === 'row1') {
      if (row1[0].isFilled === false) {
        addDiceToRow('1.0');
      } else if (row1[1].isFilled === false) {
        addDiceToRow('1.1');
      } else if (row1[2].isFilled === false) {
        addDiceToRow('1.2');
      } else {
        return;
      }
    }
  };
  const addDice2 = (e) => {
    let currentRow = e.target.parentElement.id;
    if (currentRow === 'row2') {
      if (row2[0].isFilled === false) {
        addDiceToRow2('2.0');
      } else if (row2[1].isFilled === false) {
        addDiceToRow2('2.1');
      } else if (row2[2].isFilled === false) {
        addDiceToRow2('2.2');
      } else {
        return;
      }
    }
  };
  const addDice3 = (e) => {
    let currentRow = e.target.parentElement.id;
    if (currentRow === 'row3') {
      if (row3[0].isFilled === false) {
        addDiceToRow3('3.0');
      } else if (row3[1].isFilled === false) {
        addDiceToRow3('3.1');
      } else if (row3[2].isFilled === false) {
        addDiceToRow3('3.2');
      } else {
        return;
      }
    }
  };
  return (
    <div className="player-board">
      <div className={`player-row`}>
        <container
          id="row1"
          className={`player-row ${isActive ? 'hoverable' : ''}`}
          onClick={addDice1}
          onMouseEnter={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div>
            <p>{row1[2].value}</p>
          </div>
          <div>
            <p>{row1[1].value}</p>
          </div>

          {row1[0].isFilled === true || row1[0].isHovered === true ? (
            <div className={`dice${props.diceNumber}`}></div>
          ) : (
            <div>{row1[0].value}</div>
          )}
        </container>
      </div>
      <div className={`player-row`}>
        <container
          id="row2"
          className={`player-row ${isActive ? 'hoverable' : ''}`}
          onClick={addDice2}
          // onMouseEnter={handleMouseOver}
          // onMouseOut={handleMouseOut}
        >
          <div>
            <p>{row2[2].value}</p>
          </div>
          <div>
            <p>{row2[1].value}</p>
          </div>

          {row2[0].isFilled === true || row2[0].isHovered === true ? (
            <div className={`dice${props.diceNumber}`}></div>
          ) : (
            <div>{row2[0].value}</div>
          )}
        </container>
      </div>
      <div className={`player-row`}>
        <container
          id="row3"
          className={`player-row ${isActive ? 'hoverable' : ''}`}
          onClick={addDice3}
          onMouseOver={handleMouseOver}
        >
          <div>
            <p>{row3[2].value}</p>
          </div>
          <div>
            <p>{row3[1].value}</p>
          </div>
          <div>
            <p>{row3[0].value}</p>
          </div>
        </container>
      </div>
    </div>
  );
}

export default DiceBoard;
