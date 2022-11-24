import React from "react";
import { useNavigate } from "react-router-dom";

export default function TitleScreen() {
    const navigate = useNavigate();

    const prevBestTime = localStorage.getItem("bestTime");

    return (
            <div className="container title-screen">
                <h1 className="game-title">Tenzies</h1>
                {prevBestTime && <h2 className="prev-best-time">Your best time: {prevBestTime}</h2>}
                    <p className="rules">
                    Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                        <p className="hint">
                            Hint: use spacebar to roll the dice.
                        </p>
                    </p>
                    

                <div className="buttons-container">
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