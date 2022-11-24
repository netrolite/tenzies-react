import React from "react";
import { useNavigate } from "react-router-dom";

export default function TitleScreen() {
    const navigate = useNavigate();

    return (
            <div className="container title-screen">
                <h1 className="game-title">Tenzies</h1>
                    <p className="rules">
                    Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                    </p>
                    <p className="hint">
                        Hint: use spacebar to roll the dice.
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