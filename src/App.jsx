import { useEffect } from 'react';
import { useState } from 'react'
import { nanoid } from "nanoid"
import Die from './Die';

export default function App() {
    const [dice, setDice] = useState(initialDice());
    
    function initialDice() {
      let newDice = [];
      for (let i = 0; i < 10; i++) {
        newDice.push(
          {
            id: nanoid(),
            number: Math.floor(Math.random() * 6) + 1,
            isFrozen: false
          }
        )
      }
      return newDice;
    }

    function updateDice() {
      setDice(prevState => {
        return prevState.map(item => {
          if(!item.isFrozen) item.number = Math.floor(Math.random() * 6) + 1;
          return item;
        })
      });
    }

    function toggleFreeze(id) {
      
    }

    const diceNodes = dice.map((die, i) => {
      return <Die
        key={i}
        id={die.id}
        number={die.number}
        isFrozen={die.isFrozen}
        toggleFreeze={toggleFreeze}
      />
    })

    return (
      <div className='app'>
        <div className='game'>
            <div className='title-rules'>
              <h1>Tenzies</h1>
              <p>
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
              </p>
            </div>
            <div className="dice">
              {diceNodes}
            </div>
            <div className="roll-button">
              <button onClick={updateDice}>Roll</button>
            </div>
        </div>
      </div>
    )
}