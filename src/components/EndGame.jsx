import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import GameHeader from "./GameHeader";

const EndGame = (props) => {
  const navigate = useNavigate();

  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);

  useEffect(() => {
    let correctWords = [];
    let incorrectWords = [];
    for (let i = 0; i < props.Result.bool.length; i++) {
      if (props.Result.bool[i]) {
        correctWords.push(props.Result.values[i]);
      } else {
        incorrectWords.push(props.Result.values[i]);
      }
    }

    setCorrectWords(correctWords);
    setIncorrectWords(incorrectWords);
  }, [props.Result.bool, props.Result.values]);

  return (
    <div className="end-game">
      <GameHeader />
      <div className="popup-result">
        <div className="text-aligner">
          <h1 className="game-title-final">Memory Game</h1>
        </div>
        <div className="text-aligner-left">
          <h1 className="score-title">Score: {props.Score}</h1>
        </div>
        <div className="props">
          <h1 className="props-items">
            Words: {props.Result.words.map((word) => word + ", ")}
          </h1>
          <h1 className="props-items">
            Correct Words:{" "}
            {correctWords.length !== 0
              ? correctWords.map((word) => word + ", ")
              : 0}
          </h1>
          <h1 className="props-items">
            Incorrect Words:{" "}
            {incorrectWords.length !== 0
              ? incorrectWords.map((word) => word + ", ")
              : 0}
          </h1>
        </div>
        <div className="end-footer">
          <button className="save" onClick={() => window.location.reload()}>
            NEW GAME
          </button>
          <button className="cancel" onClick={() => navigate("/account/" + auth.currentUser.uid)}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
