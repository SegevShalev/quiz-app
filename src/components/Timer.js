import React, { useState, useEffect } from "react";
import * as Constants from "../constants";
import "../styles/TimerComp.css";

const Timer = (props) => {
  const [seconds, setSeconds] = useState(Constants.ONE_MINUTE);
  const [isActive, setIsActive] = useState(false);

  props.resetTimerRef.current = reset;
  props.toggleTimerOffRef.current = toggle;

  const timeIsUp = () => {
    props.timeIsUpCallback();
  };

  function toggle() {
    setIsActive(false);
  }

  function reset(score) {
    let penalty = 0;
    penalty = Math.floor(score / 1000) * 3;
    setSeconds(60 - penalty);
    setIsActive(true);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    if (seconds === 0) {
      clearInterval(interval);
      timeIsUp();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]); //eslint-disable-line react-hooks/exhaustive-deps

  return <div className="timer-style">{`${seconds}s left!`}</div>;
};

export default Timer;
