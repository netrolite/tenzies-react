import { useEffect, useState } from "react"
import {
  formatTimeElapsed,
  triggerWin,
  generateDice,
  toggleDie,
  updateDiceSpacebar,
  updateDice,
  resetGame
} from "./gameFunctions"
import Die from "./Die"
import Confetti from "react-confetti"
import { ImExit } from "react-icons/im"
import { useNavigate } from "react-router-dom"

export default function Game() {
  const [dice, setDice] = useState(generateDice());
  const [won, setWon] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({width: window.innerWidth, height: window.innerHeight});
  const [milliseconds, setMilliseconds] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00:00");
  const navigate = useNavigate();

  // check if game is won
  useEffect(() => {
    if(dice.every(item => (item.value === dice[0].value) && item.isFrozen)) {
      triggerWin(setWon, milliseconds);
    }
  })

  // stopwatch
  useEffect(() => {
    const intervalID = setInterval(() => {
      setMilliseconds(prevState => prevState + 10);
    }, 10);

    if(won) clearInterval(intervalID);

    return () => clearInterval(intervalID);
  }, [won])

  // format time
  useEffect(() => {
    setFormattedTime(() => {
      const time = formatTimeElapsed(milliseconds, true);
      return `${time.min}:${time.sec}:${time.ms}`
    })
  }, [milliseconds])

  useEffect(() => {
    // update windowDimensions for confetti
    function setDimensions() {
      const app = document.querySelector(".app");
      setWindowDimensions({width: app.offsetWidth, height: app.offsetHeight});
    }

    // update dice on spacebar press
    function spacebarUpdateDice(ev) {
      if (ev.key === " ") updateDiceSpacebar(setDice);
    }

    window.addEventListener("resize", setDimensions);
    window.addEventListener("scroll", setDimensions);
    window.addEventListener("keydown", spacebarUpdateDice)

    return () => {
      window.removeEventListener("resize", setDimensions);
      window.removeEventListener("scroll", setDimensions);
      window.removeEventListener("keydown", spacebarUpdateDice);
    }
  }, []);

  const diceNodes = dice.map(item => (
    <Die 
      key={item.id}
      isFrozen={item.isFrozen} 
      value={item.value} 
      toggleDie={() => toggleDie(item.id, setDice)}
    />
  ))

  return (
    <>
        <ImExit 
          className="quit-icon"
          title="Quit Game" 
          onClick={() => navigate("/")}
        />
        <button
          className="instant-win-button"
          onClick={() => triggerWin(setWon, milliseconds)}>
        </button>
        <Confetti 
            width={windowDimensions.width}
            height={windowDimensions.height}
            numberOfPieces={won ? 500 : 0}
        />
        <div className="container">
            <div className="stopwatch">
                {formattedTime}
            </div>
            <div className="dice">
                {diceNodes}
            </div>
            {/* if won, display "Play Again" and "Back to title" buttons. Otherwise, display "Roll" button */}
            {
              won
              ? 
                <div className="buttons-container game-won-buttons-container">
                    <button 
                        className="button"
                        onClick={() => resetGame(setWon, setDice, setMilliseconds)}
                    >
                        Play Again
                    </button>
                    <button
                        className="button"
                        onClick={() => navigate("/")}
                    >
                        Quit To Menu
                    </button>
                </div>
              :
                <div className="buttons-container">
                    <button className="button" onClick={() => updateDice(setDice)}>
                        Roll
                    </button>
                </div>
            }
        </div>
    </>
  )
}
