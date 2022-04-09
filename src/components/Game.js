import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/GameComp.css";
import Question from "./Question";
import Answers from "./Answers";
import Timer from "./Timer";
import GameOverModal from "./GameOverModal";
import * as Constants from "../constants";

export default function Game(props) {
  const [newGameQuestions, setNewGameQuestions] = useState(null);
  const [questionCounter, setQuestionCounter] = useState(
    Constants.INITIAL_QUESTION_COUNTER
  );
  const [currentQuestion, setCurrentQuestion] = useState();
  const [incorrectAnswers, setIncorrectAnswers] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [difficulty, setDifficulty] = useState();
  const [score, setScore] = useState(Constants.INITIAL_SCORE);
  const [gameFinished, setGameFinished] = useState(false);
  const [lives, setLives] = useState(Constants.INITIAL_AMOUNT_OF_LIVES);
  const [heartEmoji, setHeartEmoji] = useState();
  const [reset, setReset] = useState(0);

  const resetTimerRef = useRef(null);
  const toggleTimerOffRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let fetchData = (
          await axios.get(`https://opentdb.com/api.php?amount=100`)
        ).data.results;
        setNewGameQuestions(fetchData);
        console.log(fetchData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [reset]);

  useEffect(() => {
    if (lives === Constants.OUT_OF_LIVES) {
      toggleTimerOffRef.current();
      setGameFinished(true);
    }
  }, [lives]);

  useEffect(() => {
    let numberOfHearts = "";
    for (let i = 0; i < lives; i++) {
      numberOfHearts += "❤️";
    }
    setHeartEmoji(numberOfHearts);
  }, [lives]);

  const nextQuestionCallback = () => {
    if (questionCounter < Constants.QUESTION_AMOUNT) {
      setCurrentQuestion(newGameQuestions[questionCounter + 1].question);
      setIncorrectAnswers(
        newGameQuestions[questionCounter + 1].incorrect_answers
      );
      setCorrectAnswer(newGameQuestions[questionCounter + 1].correct_answer);
      setDifficulty(newGameQuestions[questionCounter + 1].difficulty);
      setQuestionCounter(questionCounter + 1);
      resetTimerRef.current(score);
    } else {
      setGameFinished(true);
    }
  };

  const checkAnswerHandleCallback = (answer, correctAnswer, multiplier) => {
    if (answer === correctAnswer) {
      setScore(score + multiplier);
    } else {
      setLives(lives - 1);
    }
    nextQuestionCallback();
  };

  const resetGameCallback = () => {
    resetGame();
  };

  const timeIsUpCallback = () => {
    setLives(lives - 1);
    nextQuestionCallback();
  };

  const resetGame = () => {
    setReset(reset + 1); //trigger useEffect to fetch new questions
    setQuestionCounter(Constants.INITIAL_QUESTION_COUNTER);
    setCurrentQuestion();
    setScore(Constants.INITIAL_SCORE);
    setGameFinished(false);
    setLives(Constants.INITIAL_AMOUNT_OF_LIVES);
    toggleTimerOffRef.current();
  };

  let question, answers;
  if (!newGameQuestions) {
    question = "🤔🤔🤔";
  }
  if (
    newGameQuestions &&
    questionCounter === Constants.INITIAL_QUESTION_COUNTER
  ) {
    question = (
      <button onClick={() => nextQuestionCallback()}>
        <span role="img" aria-label="Rocket">
          Start 🚀
        </span>
      </button>
    );
  }
  if (
    newGameQuestions &&
    questionCounter > Constants.INITIAL_QUESTION_COUNTER
  ) {
    question = <Question question={currentQuestion} />;
    answers = (
      <Answers
        incorrectAnswers={incorrectAnswers}
        correctAnswer={correctAnswer}
        checkAnswerCallback={checkAnswerHandleCallback}
        difficulty={difficulty}
      />
    );
  }

  const timeCountDown = (
    <Timer
      resetTimerRef={resetTimerRef}
      toggleTimerOffRef={toggleTimerOffRef}
      timeIsUpCallback={timeIsUpCallback}
    />
  );

  let gameOverModal;
  if (gameFinished) {
    gameOverModal = (
      <GameOverModal
        resetGameCallback={() => resetGameCallback()}
        changePlayerCallback={() => props.changePlayerCallback()}
      />
    );
  }

  return (
    <div>
      {question}
      {answers}
      {score}
      <br />
      {props.playerName}
      {timeCountDown}
      {heartEmoji}
      {gameOverModal}
      <div className="overModals">
        <button onClick={() => resetGame()}><span role="img" aria-label="Zipper-Mouth">Reset Game 🤐</span></button>
        <button onClick={() => props.changePlayerCallback()}>
        <span role="img" aria-label="Switch">Change Player 🔁</span>
        </button>
      </div>
      {/* 
      <div>minigame</div>
      <div>help</div>
      <div>leaderboard</div> */}
    </div>
  );
}
