import React, { useEffect, useState } from "react";
import { ImExit } from "react-icons/im"
import { useNavigate } from "react-router-dom"

export default function Settings() {
    const [particlesAmount, setParticlesAmount] = useState(
        localStorage.getItem("confettiParticlesAmount")
        ? localStorage.getItem("confettiParticlesAmount")
        : 500
    )
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.setItem("confettiParticlesAmount", particlesAmount)) {
            localStorage.setItem("confettiParticlesAmount", particlesAmount);
        }
    }, [particlesAmount])

    return (
        <div className="container settings">
            <ImExit 
                className="quit-icon"
                title="Quit Game" 
                onClick={() => navigate("/")}
            />
            <h1 className="page-title settings-page-title">Settings</h1>
            <div className="setting">
                <div className="setting-name">
                    Amount of confetti particles
                </div>
                <div className="setting-value">
                    <div className="range">
                        <div className="range-value">{particlesAmount}</div>
                        <div className="range-slider-wrapper">
                            <input 
                                className="range-slider slider-progress"
                                type="range"
                                min="100"
                                max="5000"
                                value={particlesAmount}
                                onInput={ev => setParticlesAmount(ev.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}