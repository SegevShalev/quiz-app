import React from "react";
import escapeHtml from "../utils";
import "../styles/Answers.css";

export default function Answers(props) {
  let arrangedAnswers = [...props.incorrectAnswers];
  let randInx = Math.floor(Math.random() * (arrangedAnswers.length + 1));
  arrangedAnswers.splice(randInx, 0, props.correctAnswer);

  let questionDifficulty = 100;
  if (props.difficulty === "medium") {
    questionDifficulty = questionDifficulty * 2;
  }
  if (props.difficulty === "hard") {
    questionDifficulty = questionDifficulty * 3;
  }

  let displayAnswer = arrangedAnswers.map((item) => {
    return (
      <button className="answer-btn"
        key={item}
        onClick={() =>
          props.checkAnswerCallback(
            item,
            props.correctAnswer,
            questionDifficulty
          )
        }
      >
        {escapeHtml(item)}
      </button>
    );
  });

  return (
    <div className="answers-container">
      <div className="grid-answers">{displayAnswer}</div>
    </div>
  );
}
