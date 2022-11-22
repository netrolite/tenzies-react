import { useEffect, useState } from "react"
import {nanoid} from "nanoid"
import Die from "./Die"
import Confetti from "react-confetti"
import TitleScreen from "./TitleScreen"
import Game from "./Game"
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
