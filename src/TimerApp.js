// TimerApp.js

import React, { useState, useEffect } from 'react';

const buttonStyle = {
  margin: '0 5px', // Added margin around buttons
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

function TimerApp() {
  const [countdown, setCountdown] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timerInterval;
    if (running && seconds > 0) {
      timerInterval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setCountdown(0); // Update the countdown to 0 when timer reaches 0
      setRunning(false);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [running, seconds]);

  const handleStart = () => {
    if (countdown > 0 && !running) {
      setSeconds(countdown);
      setRunning(true);
    }
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setSeconds(countdown);
    setRunning(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Timer App</h2>
      <div>
        <input
          type="number"
          value={countdown}
          onChange={(e) => setCountdown(parseInt(e.target.value))}
          disabled={running}
          style={inputStyle}
        />
        <br />
        <button onClick={handleStart} disabled={running} style={buttonStyle}>
          Start
        </button>
        <button onClick={handleStop} disabled={!running} style={buttonStyle}>
          Stop
        </button>
        <button onClick={handleReset} disabled={running} style={buttonStyle}>
          Reset
        </button>
      </div>
      <p style={{ fontSize: '24px' }}>
        {running ? `Time Remaining: ${seconds} seconds` : 'Timer Stopped'}
      </p>
    </div>
  );
}

export default TimerApp;
