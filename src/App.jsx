import { useEffect, useState } from "react"
import {nanoid} from "nanoid"
import Die from "./Die"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = useState(generateDice());
  const [won, setWon] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({width: window.innerWidth, height: window.innerHeight});

  useEffect(() => {
    if(dice.every(item => (item.value === dice[0].value) && item.isFrozen)) {
      setWon(true);
    }
  })

  // toggled by an invisible button
  function triggerWin() {
    setWon(true);
  }

  useEffect(() => {
    function setDimensions() {
      console.log("setDimensions");
      const app = document.querySelector(".app");
      setWindowDimensions({width: app.offsetWidth, height: app.offsetHeight});
    }

    // listen for spacebar press
    function spacebarPressed(ev) {
      ev.key === " " && updateDice();
    }

    window.addEventListener("resize", setDimensions);
    window.addEventListener("scroll", setDimensions);
    window.addEventListener("keypress", ev => spacebarPressed(ev))

    return () => {
      window.removeEventListener("resize", setDimensions);
      window.removeEventListener("scroll", setDimensions);
      window.removeEventListener("keypress", spacebarPressed);
    }
  }, []);
  
  function generateDice() {
    let newDice = [];
    for (let i = 0; i < 32; i++) {
      newDice.push({
        id: nanoid(),
        isFrozen: false,
        value: Math.ceil(Math.random() * 6)
      })
    }
    return newDice;
  }

  function generateNum(n) {
    const newN = Math.ceil(Math.random() * 6);
    if(newN === n) return generateNum(n);
    return newN;
  }

  function toggleDie(id) {
    setDice(prevState => prevState.map(item => (
      item.id === id ? {...item, isFrozen: !item.isFrozen} : {...item}
    )))
  }

  function updateDice() {
    setDice(prevState => (
      prevState.map(item => {
        if(!item.isFrozen) {
          const newValue = generateNum(item.value);
          return {...item, value: newValue};
        };
        return {...item};
      })
    ))
  } 

  function resetGame() {
    setWon(false);
    setDice(generateDice());
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
      <button className="instant-win-button" onClick={triggerWin}></button>
      <Confetti 
        width={windowDimensions.width}
        height={windowDimensions.height}
        numberOfPieces={won ? 100000 : 0}
        initialVelocity={50}
      />
      <div className="game">
        <h1>Tenzies</h1>
        <p className="rules">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
        <p className="hint">
          Hint: use spacebar to roll the dice.
        </p>
        <div className="dice">
          {diceNodes}
        </div>
        {
          won
          ? 
            <button className="roll-button" onClick={resetGame}>
              Play again
            </button>
          :
            <button className="roll-button" onClick={updateDice}>
            Roll
            </button>
        }
        
      </div>
    </div>
  )
}
