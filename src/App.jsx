import { useState } from "react"
import {nanoid} from "nanoid"
import Die from "./Die"

export default function App() {
  const [dice, setDice] = useState(generateDice());
  
  function generateDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        isFrozen: false,
        value: Math.floor(Math.random() * 6) + 1
      })
    }
    return newDice;
  }

  function toggleDie(id) {
    setDice(prevState => prevState.map(item => (
      item.id === id ? {...item, isFrozen: !item.isFrozen} : {...item}
    )))
  }

  function updateDice() {
    setDice(prevState => (
      prevState.map(item => (
        item.isFrozen ? {...item} : {...item, value: Math.ceil(Math.random() * 6)}
      ))
    ))
  } 

  const diceNodes = dice.map(item => (
    <Die 
      key={item.id}
      isFrozen={item.isFrozen} 
      value={item.value} 
      toggleDie={() => toggleDie(item.id)}
    />
  ))

  return (
    <div className="app">
      <div className="game">
        <h1>Tenzies</h1>
        <p className="rules">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
        <div className="dice">
          {diceNodes}
        </div>
        <button
          className="roll-button"
          onClick={updateDice}
        >
          Roll
        </button>
      </div>
    </div>
  )
}