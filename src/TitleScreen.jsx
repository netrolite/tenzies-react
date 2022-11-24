import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatTimeElapsed } from "./game/gameFunctions";

export default function TitleScreen() {
    const [showRules, setShowRules] = useState(false);
    const navigate = useNavigate();

    const bestTime = formatTimeElapsed(localStorage.getItem("bestTime"));
    const formattedBestTime = `${bestTime.min}:${bestTime.sec}:${bestTime.ms}`

    return (
        <div className="container title-screen">
            <h1 className="game-title">Tenzies</h1>
            {
                bestTime
                &&
                <h2 className="best-time">
                    Your best time: <span className="best-time-value">{formattedBestTime}</span>
                </h2>
            }

            <div className="buttons-container title-screen-buttons-container">
                <button
                    className="button toggle-rules"
                    onClick={() => setShowRules(prevState => !prevState)}
                >
                    {showRules ? "Hide Rules" : "Show Rules"}
                </button>
                {
                    showRules
                    &&
                    <p className="rules">
                    Roll until all dice are the same. Click each die to freeze it at its current value between rolls. <br />
                        <span className="hint">
                            Hint: use spacebar to roll the dice.
                        </span>
                    </p>
                }
                <button
                    className="button"
                    onClick={() => navigate("/game")}
                >
                    Play Game
                </button>
            </div>
        </div>
    )
}