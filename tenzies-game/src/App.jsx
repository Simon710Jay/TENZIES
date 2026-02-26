import { useState } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice())
   
    const gameWon = dice.every(die => die.isHeld) &&
            dice.every(die => die.value === dice[0].value)

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }

    function hold(id) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    function rollDice() {
            setDice(prevDice => prevDice.map(die => die.isHeld ? die :
                 {...die, value: Math.ceil(Math.random() * 6) }
            ))
        
    }

    const diceElements = dice.map(dieObj =>
        <Die
            key={dieObj.id}
            id={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={hold}
        />)

    return (
        <main>
            {gameWon && <Confetti />}
            <h1 className="tittle">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze
            it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>

            <button onClick={rollDice} className="dice">{gameWon ? "New Game" : "Roll Dice"}</button>
        </main>
    )
}