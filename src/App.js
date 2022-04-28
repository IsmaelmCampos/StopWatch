import logo from "./logo.svg";
import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [bValue, setbValue] = useState(5);
  const [sValue, setsValue] = useState(1);

  const [breakValue, setBreakValue] = useState(5);
  const [session, setSessionValue] = useState(1);

  const timeout = useRef();
  const timeoutBreak = useRef();
  const started = useRef(false);
  const startedBreak = useRef(false);
  const display = useRef();

  const increaseBreakValue = () => {
    const increasing = () => {
      setbValue(bValue + 1);
      setBreakValue(bValue + 1);
    };
    started.current === true
      ? console.log("you cant click this while timer is running")
      : increasing();
  };

  const decreaseBreakValue = () => {
    const decreasing = () => {
      setbValue(bValue - 1);
      setBreakValue(bValue - 1);
    };
    bValue <= 1
      ? console.log("what do you think you are doing, you shouldnt go below 1")
      : started.current === true
      ? console.log("you cant click this while timer is running")
      : decreasing();
  };
  const increaseSessionValue = () => {
    const increasing = () => {
      setsValue(sValue + 1);
      setSessionValue(sValue + 1);
    };

    started.current === true
      ? console.log("you cant click this while timer is running")
      : increasing();
  };

  const decreaseSessionValue = () => {
    const decreasing = () => {
      setsValue(sValue - 1);
      setSessionValue(sValue - 1);
    };
    sValue <= 1
      ? console.log("what do you think you are doing, you shouldnt go below 1")
      : started.current === true
      ? console.log("you cant click this while timer is running")
      : decreasing();
  };
  // main session timer

  let displaySeconds = session;

  const decreaseSessionEachSecond = () => {
    started.current = true;
    timeout.current = setTimeout(() => {
      displaySeconds = displaySeconds - 1;
      setSessionValue(displaySeconds);
      decreaseSessionEachSecond();
    }, 1000);
  };

  const startBreakTimer = () => {
    startedBreak.current = true;
    started.current = true;
    timeoutBreak.current = setTimeout(() => {
      setBreakValue(breakValue - 1);
      startBreakTimer();
    }, 1000);
    breakValue === 0 ? sessionRestart() : console.log("Break Timer is running");
  };

  const sessionRestart = () => {
    const hid = document.getElementsByClassName("hiddenP");
    hid[0].style.visibility = "hidden";

    const hidStop = document.getElementsByClassName("hiddenCantStop");
    hidStop[0].style.visibility = "hidden";

    stopTimerBreak();
    displaySeconds = sValue;
    setSessionValue(sValue);
    setBreakValue(bValue);
    decreaseSessionEachSecond();
  };
  const resetTimer = () => {
    started.current = false;
    setBreakValue(bValue);
    const hid = document.getElementsByClassName("hiddenP");
    hid[0].style.visibility = "hidden";

    const hidStop = document.getElementsByClassName("hiddenCantStop");
    hidStop[0].style.visibility = "hidden";

    clearTimeout(timeout.current);
    clearInterval(timeoutBreak.current);
    setSessionValue(sValue);
  };

  const stopTimer = () => {
    started.current = false;
    clearTimeout(timeout.current);
    clearTimeout(timeoutBreak.current);
  };
  const stopTimerBreak = () => {
    startedBreak.current = false;
    clearTimeout(timeoutBreak.current);
  };

  const handleOnClick = () => {
    startedBreak.current === true
      ? revealLazy()
      : started.current === false
      ? decreaseSessionEachSecond()
      : stopTimer();
  };

  const revealLazy = () => {
    const hid = document.getElementsByClassName("hiddenCantStop");
    hid[0].style.visibility = "visible";
  };

  const reveal = () => {
    const hid = document.getElementsByClassName("hiddenP");
    hid[0].style.visibility = "visible";

    startBreakTimer();
    console.log(breakValue);
  };

  session === 0
    ? stopTimer()
    : console.log("Timer is running because session != 0");

  session === 0
    ? reveal()
    : console.log(
        "Not revealing break section!!              --               hi there, reader, have a nice day"
      );
  //format session
  let seconds = session % 60;
  let minutes = (session % 3600) / 60;
  let hours = minutes / 60;

  const finalMinutes =
    Math.floor(minutes).toString().length === 1
      ? "0" + Math.floor(minutes).toString()
      : Math.floor(minutes);
  const finalSeconds =
    seconds.toString().length === 1 ? "0" + seconds.toString() : seconds;

  // format sessionLength
  let secondsS = sValue % 60;
  let minutesS = (sValue % 3600) / 60;
  let hoursS = minutesS / 60;

  const finalMinutesS =
    Math.floor(minutesS).toString().length === 1
      ? "0" + Math.floor(minutesS).toString()
      : Math.floor(minutesS);
  const finalSecondsS =
    secondsS.toString().length === 1 ? "0" + secondsS.toString() : secondsS;

  //format Break

  let secondsB = bValue % 60;
  let minutesB = (bValue % 3600) / 60;
  let hoursB = minutesB / 60;

  const finalMinutesB =
    Math.floor(minutesB).toString().length === 1
      ? "0" + Math.floor(minutesB).toString()
      : Math.floor(minutesB);
  const finalSecondsB =
    secondsB.toString().length === 1 ? "0" + secondsB.toString() : secondsB;

  const increaseFiveMinutesBreak = () => {
    const increasing = () => {
      setbValue(bValue + 300);
      setBreakValue(bValue + 300);
    };
    started.current === true
      ? console.log("you cant click this while timer is running")
      : increasing();
  };

  const decreaseFiveMinutesBreak = () => {
    started.current === false
      ? sValue - 300 < 1
        ? setsValue(0)
        : setsValue(sValue - 300)
      : console.log("you cant change it while running");
  };

  const increaseFiveMinutesSession = () => {
    started.current === false
      ? setsValue(sValue + 300)
      : console.log("you cant change it while running");
  };
  const decreaseFiveMinutesSession = () => {
    started.current === false
      ? sValue - 300 < 1
        ? setsValue(0)
        : setsValue(sValue - 300)
      : console.log("you cant change it while running");
  };
  return (
    <>
      <div className="App">
        <div className="break">
          <p>Break Length</p>
          <p>
            <a onClick={decreaseFiveMinutesBreak}>⏪</a>
            <a key="decrease" onClick={decreaseBreakValue}>
              🔽
            </a>
            {Math.floor(hoursB)}:{finalMinutesB}:{finalSecondsB}
            <a key="increase" onClick={increaseBreakValue}>
              🔼
            </a>
            <a onClick={increaseFiveMinutesBreak}>⏩</a>
          </p>
        </div>
        <div className="session">
          <p>Session Length</p>
          <p>
            <a onClick={decreaseFiveMinutesSession}>⏪</a>
            <a onClick={decreaseSessionValue}>🔽</a>
            {Math.floor(hoursS)}:{finalMinutesS}:{finalSecondsS}
            <a onClick={increaseSessionValue}>🔼</a>
            <a onClick={increaseFiveMinutesSession}>⏩</a>
          </p>
        </div>
        <div className="timer-label">
          <p>Session</p>
          <div id="timeleft"></div>
          <p>
            <a onClick={handleOnClick} id="start-stop">
              ⏯
            </a>
            {Math.floor(hours)}:{finalMinutes}:{finalSeconds}
            <a onClick={resetTimer} id="reset">
              🔄
            </a>
          </p>
        </div>
      </div>
      <div className="hidden">
        <p className="hiddenP">
          TAKE A BREAK. This {breakValue} is the remaining time to continue the
          next session
        </p>
      </div>
      <div className="hiddenCantStop">
        {" "}
        ⚠️⚠️You cant stop break timer, you lazy boy!⚠️⚠️
      </div>
    </>
  );
};

export default App;
