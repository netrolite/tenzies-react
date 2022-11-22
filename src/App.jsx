import React from "react"
import Game from "./game/Game"
import TitleScreen from "./TitleScreen"
import {
  Routes,
  Route
} from "react-router-dom"

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  )
}
