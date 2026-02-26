import { useState, useRef, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const buttonRef = useRef(null)

   
    const gameWon = dice.every(die => die.isHeld) &&
            dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

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
        if (!gameWon) {
            setDice(prevDice => prevDice.map(die => die.isHeld ? die :
                 {...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
        }
        
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
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="tittle">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze
            it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>

            <button ref={buttonRef}  className="dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll Dice"}</button>
        </main>
    )
}