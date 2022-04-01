import { useEffect, useRef, useState } from 'react';
import './App.css';

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function App() {

  const options = ["sauce", "break", "cramp", "slant", "piece", "taunt"]
  const [cur, setCur] = useState(options[Math.floor(Math.random() * options.length)])
  const globalRef = useRef(null)
  const [guesses, setGuesses] = useState(['     ', '     ', '     ', '     ', '     ', '     '])

  const [currentGuess, setCurrentGuess] = useState(0)
  const [currentLetter, setCurrentLetter] = useState(0)

  useEffect(() => {
    globalRef.current.focus()
  }, [])

  const onKeyDown = ({key}) => {
    console.log(key)
    if (key.length === 1 && key.match(/[a-z]/i)) {
      if (currentLetter < 5) {
        let newGuess = guesses[currentGuess]
        newGuess = newGuess.replaceAt(currentLetter, key)
        setGuesses([...guesses.slice(0,currentGuess), newGuess, ...guesses.slice(currentGuess+1)])
        setCurrentLetter(currentLetter + 1)
      }
    }
    else if (key === "Backspace" && currentLetter > 0) {
      let newGuess = guesses[currentGuess]
      newGuess = newGuess.replaceAt(currentLetter - 1, ' ')
      setGuesses([...guesses.slice(0,currentGuess), newGuess, ...guesses.slice(currentGuess+1)])
      setCurrentLetter(currentLetter - 1)
    }
    else if (key === "Enter") {
      submitGuess()
    }
  }

  const submitGuess = event => {
    event?.preventDefault()
    setCurrentGuess(currentGuess + 1)
    setCurrentLetter(0)
    globalRef.current.focus()
  }

  console.log(cur)

  return (
    <div className="App" onKeyDown={onKeyDown} tabIndex="-1" ref={globalRef}>
      <form onSubmit={submitGuess}>
        <div>
          Wordle
        </div>
        <div className="container">
          {guesses.map((guess,index) => (
            <div className="input-row" key={index}>
              {guess.split('').map((char, charIndex) => (
                <div className={`tile ${currentGuess > index ? (char === cur[charIndex] ? 'green' : cur.indexOf(char) !== -1 ? 'yellow' : '') : '' }`} key={charIndex}>
                  {char}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button type="submit" disabled={currentLetter < 5}>
          Check
        </button>
      </form>
    </div>
  );
}

export default App;
