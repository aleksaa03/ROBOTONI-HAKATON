import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../Firebase";
import EndGame from "../components/EndGame";
import GameHeader from "../components/GameHeader";
import BodyText from "../media/body-text.png";
import "../styles/MemoryGame.css";

function MemoryGame() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const [memoryGameState, setMemoryGameState] = useState(1);
  const [counter, setCounter] = useState(5);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState({});

  const [wordsArray, setWordsArray] = useState([]);
  const [seconds, setSeconds] = useState(20);
  let words = ["Dog", "Cat", "Horse", "Cow", "Bird"];
  let wordsRandomArray = [];

  const speech = new SpeechSynthesisUtterance();
  const speechOptions = window.speechSynthesis;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setIsSignUp(true);
    });
  }, []);

  useEffect(() => {
    if (memoryGameState === 2) {
      for (let i = 0; i < counter; i++) {
        wordsRandomArray.push(words[Math.floor(Math.random() * words.length)]);
      }
      setWordsArray(wordsRandomArray);
    }
  }, [memoryGameState]);

  useEffect(() => {
    if (memoryGameState === 2) {
      let seconds = 20;
      let interval = setInterval(() => {
        if (seconds === 0) {
          clearInterval(interval);
          setMemoryGameState(memoryGameState + 1);
        } else {
          seconds--;
        }
        setSeconds(seconds);
      }, 1000);
    }
  }, [memoryGameState]);

  const Submit = () => {
    let values = [];
    let bool = [];
    let score = 0;
    const inputs = document.querySelectorAll(".input");

    inputs.forEach((input) => {
      values.push(input.value);
    });

    for (let i = 0; i < values.length; i++) {
      if (wordsArray[i].toLowerCase() === values[i].toLowerCase()) {
        bool.push(true);
        score++;
      } else {
        bool.push(false);
      }
    }

    setScore(score);

    setResult({
      words: wordsArray,
      values: values,
      bool: bool,
    });

    auth.onAuthStateChanged((user) => {
      let prevScore = 0;
      database.ref(`users/${user.uid}`).on("value", (snap) => {
        prevScore = snap.val().score;
      });
      database.ref(`users/${user.uid}`).update({
        score: parseInt(score) + parseInt(prevScore),
      });
    });

    setMemoryGameState(memoryGameState + 1);

    //navigate("/account/" + auth.currentUser.uid)
  };

  const MemoryGameOne = () => {
    return (
      <div className="memory-game-1">
        <div className="memory-main">
          <div className="text">
            <h1>Memory Game</h1>
            <p id="text">
              The desired number of words to be memorized in 2 minutes is loaded
              on the screen (time is not specified, but it is desirable to be
              less than 5 minutes). After that time, the words disappear from
              the screen and a textbox appears in which they need to type out
              the words, but in good order. Each misspelled word is counted and
              eventually printed as a result. On the screen, when entering
              words, there is also a counter for incorrectly entered words and a
              timer.
              <i
                className="fa-solid fa-volume-high"
                style={{
                  margin: "0 10px",
                  cursor:"pointer"
                }}
                onClick={(e) => {
                  speech.text = document.getElementById("text").innerText;
                  speech.voice = speechOptions.getVoices()[0];
                  if (!speechOptions.speaking) {
                    speechOptions.speak(speech);
                  } else {
                    speechOptions.cancel();
                  }
                }}
              ></i>
            </p>
          </div>
          <div className="image">
            <img src={BodyText} alt="" />
          </div>
        </div>
        <div className="settings">
          <h3>Number of words</h3>
          <div className="custom-button">
            <button onClick={() => setCounter(counter < 1 ? 20 : counter - 1)}>
              -
            </button>
            <h1>{counter}</h1>
            <button onClick={() => setCounter(counter >= 20 ? 0 : counter + 1)}>
              +
            </button>
          </div>
          <button
            id="start"
            onClick={() => setMemoryGameState(memoryGameState + 1)}
          >
            Start
          </button>
        </div>
      </div>
    );
  };

  const MemoryGameTwo = () => {
    return (
      <div className="memory-game-2">
        <div className="memory-main">
          <h1>Memory Game</h1>
          <div className="timer">
            <h1>{seconds}</h1>
          </div>
        </div>
        <div className="words">
          {wordsArray.map((word, index) => (
            <h1 key={index}>{word}</h1>
          ))}
        </div>
      </div>
    );
  };

  const MemoryGameThree = () => {
    return (
      <div className="memory-game-3">
        <div className="memory-main">
          <h1>Memory Game</h1>
        </div>
        <div className="inputs">
          {wordsArray.map((word, index) => (
            <input
              type="text"
              name=""
              className="input"
              id={word}
              placeholder="Word..."
              key={index}
            />
          ))}
        </div>
        <div className="submit">
          <button onClick={Submit}>Submit</button>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {isSignUp ? (
        <React.Fragment>
          <GameHeader />
          {memoryGameState === 1 ? <MemoryGameOne /> : ""}
          {memoryGameState === 2 ? <MemoryGameTwo /> : ""}
          {memoryGameState === 3 ? <MemoryGameThree /> : ""}
          {memoryGameState === 4 ? (
            <EndGame Score={score} Result={result} />
          ) : (
            ""
          )}
        </React.Fragment>
      ) : (
        navigate("/signin")
      )}
    </React.Fragment>
  );
}

export default MemoryGame;
