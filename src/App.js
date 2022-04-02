import { useEffect, useRef, useState } from 'react';
import './App.css';

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function App() {

  const TOTAL_GUESSES = 6
  const options = ["sauce", "break", "cramp", "slant", "piece", "taunt"]
  const [cur, setCur] = useState(options[Math.floor(Math.random() * options.length)])
  const globalRef = useRef(null)
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')

  useEffect(() => {
    globalRef.current.focus()
  }, [])

  const getRemainingRows = () => {
    let rows = []
    let emptyTiles = []
    for (let i = 0; i < 5; i++) {
      emptyTiles.push(
        <div className="tile" key={i}>
        </div>
      )
    }
    for (let i = TOTAL_GUESSES; i > guesses.length + 1; i--) {
      rows.push(
        <div className="input-row" key={i}>
          {emptyTiles}
        </div>
      )
    }
    return rows
  }
  
  const onKeyDown = ({key}) => {

    if (key.length === 1 && key.match(/[a-z]/i)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + key)
      }
    }
    else if (key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1))
    }
    else if (key === "Enter") {
      submitGuess()
    }
  }

  const getTileColor = (index) => {
    let char = currentGuess[index]
    if (char === cur[index]) return 'green'
    if (cur.indexOf(char) !== -1 && currentGuess[cur.indexOf(char)] !== cur[cur.indexOf(char)]) return 'yellow'
    return ''
  }

  const submitGuess = event => {
    event?.preventDefault()
    let newGuess = (
      <div className="input-row" key={guesses.length}>
        {currentGuess.split('').map((char, index) => (
          <div className={`tile ${getTileColor(index)}`} key={index}>
            {char}
          </div>
        ))}
      </div>
    )
    setGuesses([...guesses, newGuess])
    setCurrentGuess('')
    globalRef.current.focus()
  }

  return (
    <div className="App" onKeyDown={onKeyDown} tabIndex="-1" ref={globalRef}>
      <form onSubmit={submitGuess}>
        <div>
          Wordle
        </div>
        <div className="container">
          {/* List Previous Guess */}
          {guesses}
          {/* Show Current Guess */}
          <div className="input-row">
            {[0,1,2,3,4].map(index => (
                <div className="tile" key={index}>
                  {currentGuess[index] || ''}
                </div>
            ))}
          </div>
          {/* Show Remaining Rows For Guessing */}
          {getRemainingRows()}
        </div>
        <button type="submit" disabled={currentGuess.length < 5}>
          Check
        </button>
      </form>
    </div>
  );
}

export default App;
