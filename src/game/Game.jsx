import { useEffect, useRef, useState } from "react"
import {
  triggerWin,
  generateDice,
  toggleDie,
  updateDice,
  resetGame
} from "./gameFunctions"
import Die from "./Die"
import Confetti from "react-confetti"
import { useNavigate } from "react-router-dom"

export default function Game() {
  const [dice, setDice] = useState(generateDice());
  const [won, setWon] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({width: window.innerWidth, height: window.innerHeight});
  const [millisecElapsed, setMilliseconds] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00:00");
  const navigate = useNavigate();

  // check if game is won
  useEffect(() => {
    if(dice.every(item => (item.value === dice[0].value) && item.isFrozen)) {
      setWon(true);
    }
  })

  // stopwatch
  useEffect(() => {
    const intervalID = setInterval(() => {
      setMilliseconds(prevState => prevState + 10);
    }, 10000000000000);

    if(won) clearInterval(intervalID);

    return () => clearInterval(intervalID);
  }, [won])

  // format time
  useEffect(() => {
    setFormattedTime(() => {
        const hr = Math.floor(millisecElapsed / 3600000);
        const min = Math.floor((millisecElapsed - hr * 3600000) / 60000);
        const sec = Math.floor((millisecElapsed - hr * 3600000 - min * 60000) / 1000);
        const ms = millisecElapsed - hr * 3600000 - min * 60000 - sec * 1000;

        const time = {hr: hr, min: min, sec: sec, ms: ms};

        for (let timeUnit of Object.keys(time)) {
            if (time[timeUnit].toString().length < 2) {
                const newVal = "0" + time[timeUnit].toString();
                time[timeUnit] = newVal;
            }
            else if (timeUnit === "ms" && time[timeUnit].toString().length > 2) {
                let newVal = time[timeUnit].toString().split("");
                newVal.pop();
                time[timeUnit] = newVal.join("");
            }
        }

        return `${time.hr}:${time.min}:${time.sec}:${time.ms}`
    })
  }, [millisecElapsed])

  useEffect(() => {
    // update windowDimensions for confetti
    function setDimensions() {
      const app = document.querySelector(".app");
      setWindowDimensions({width: app.offsetWidth, height: app.offsetHeight});
    }

    // update dice on spacebar press
    function spacebarUpdateDice(ev) {
      if (ev.key === " ") updateDice(setDice);
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
        <button className="instant-win-button" onClick={() => triggerWin(setWon)}></button>
        <Confetti 
            width={windowDimensions.width}
            height={windowDimensions.height}
            numberOfPieces={won ? 500 : 0}
        />
        <div className="container">
            <div className="timer">
                {formattedTime}
            </div>
            <div className="dice">
                {diceNodes}
            </div>
            {/* if won, display "Play Again" and "Back to title" buttons. Otherwise, display "Roll" button */}
            {
              won
              ? 
                <div className="buttons">
                    <button 
                        className="button"
                        onClick={() => resetGame(setWon, setDice)}
                    >
                        Play Again
                    </button>
                    <button
                        className="button"
                        onClick={() => navigate("/")}
                    >
                        Back To Title
                    </button>
                </div>
              :
                <div className="buttons">
                    <button className="button" onClick={() => updateDice(setDice)}>
                        Roll
                    </button>
                </div>
            }
        </div>
    </>
  )
}
