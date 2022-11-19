import { useState } from 'react'

export default function App() {
    return (
      <div className='app'>
        <div className='game'>
            <div className='title-rules'>
              <h1>Tenzies</h1> 
              <p>
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
              </p>
            </div>
            <div className="dice">

            </div>
            <div className="roll-button">
              <button>Roll</button>
            </div>
        </div>
      </div>
    )
}