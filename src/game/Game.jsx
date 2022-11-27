import { useEffect, useState, useMemo } from "react"
import {
  formatTimeElapsed,
  triggerWin,
  generateDice,
  toggleDie,
  updateDiceSpacebar,
  updateDice,
  resetGame,
  quitToMenu
} from "./gameFunctions"
import Die from "./Die"
import Confetti from "react-confetti"
import { ImExit } from "react-icons/im"
import { useNavigate } from "react-router-dom"

export default function Game() {
  // settings
  const confettiParticlesAmount = localStorage.getItem("confettiParticlesAmount")
  ? localStorage.getItem("confettiParticlesAmount")
  : 500
  const diceAmount = localStorage.getItem("diceAmount")
  ? localStorage.getItem("diceAmount")
  : 64

  // all other state
  const [dice, setDice] = useState(generateDice(diceAmount));
  const [won, setWon] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({width: window.innerWidth, height: window.innerHeight});
  const [milliseconds, setMilliseconds] = useState(0);
  const [formattedTime, setFormattedTime] = useState(null);
  const [target, setTarget] = useState(Math.ceil(Math.random() * 6));
  const bestTime = formatTimeElapsed(localStorage.getItem("bestTime"))
  const navigate = useNavigate();

  // check if game is won
  useEffect(() => {
    const hasWon = dice.every(item => (
      item.value === target
      && item.isFrozen
    ))

    if(hasWon) triggerWin(setWon, milliseconds);
  })

  // stopwatch
  useEffect(() => {
    const intervalID = setInterval(() => {
      setMilliseconds(prev => prev + 10);
    }, 10);

    if(won) clearInterval(intervalID);

    return () => clearInterval(intervalID);
  }, [won])

  // format time
  useEffect(() => {
    setFormattedTime(() => {
      return formatTimeElapsed(milliseconds);
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
      if (ev.key === " ") {
        ev.preventDefault();
        updateDiceSpacebar(setDice);
      } 
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
            numberOfPieces={won ? confettiParticlesAmount : 0}
        />
        <div className="container">
            <div className="game-topbar">
                 <div className=" game-topbar-item game-best-time">
                			<div className="game-topbar-item-title">
													Best time                    
                  		</div>
                  		<div className="game-topbar-item-value">
													{bestTime}                    
                  		</div>
                 </div>

                 <div className="game-topbar-divider"></div>

                 <div className="game-topbar-item game-target">
											<div className="game-topbar-item-title">
													Target           
                  		</div>
                  		<div className="game-topbar-item-value">
													{target}                    
                  		</div>
                 </div>

                 <div className="game-topbar-divider"></div>

                 <div className="game-topbar-item game-stopwatch">
                			<div className="game-topbar-item-title">
													Current time                    
                  		</div>
                  		<div className="game-topbar-item-value">
													{formattedTime}                    
                  		</div>
                 </div>
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
                        onClick={() => resetGame(setWon, setDice, setMilliseconds, setTarget)}
                    >
                        Play Again
                    </button>
                    <button
                        className="button"
                        onClick={() => quitToMenu(navigate)}
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
