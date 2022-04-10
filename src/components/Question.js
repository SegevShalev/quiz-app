import React, { useState,useEffect } from "react";

import escapeHtml from '../utils'
import "../styles/QuestionComp.css"
export default function Question(props) {
  const [difficultyStyle,setDifficultyStyle] = useState ();

  useEffect(() => {
    if (props.difficulty==="easy"){
      setDifficultyStyle("easy")
    }
    if (props.difficulty==="medium"){
      setDifficultyStyle("medium")
    }
    if (props.difficulty==="hard"){
      setDifficultyStyle("hard")
    }
    
  }, [props.difficulty]);

  let unescapedText = escapeHtml(props.question)


  return (
    <div className="question-position">
      <h2 className={`difficulty ${difficultyStyle}`}>{props.difficulty}:</h2>
      <h1 className="question-headline">{`${unescapedText}`}</h1>
    </div>
  )
}
