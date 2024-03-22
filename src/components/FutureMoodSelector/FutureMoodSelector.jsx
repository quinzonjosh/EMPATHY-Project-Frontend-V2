import React from "react";
import "./futureMoodSelector.css";

const FutureMoodSelector = ({
  track_id,
  correctMood,
  setFutureMood,
  fetchStats,
}) => {
  function handleClick(number) {
    if (number == 0) {
      setFutureMood("Happy");
      fetchStats("Happy");
    } else if (number == 1) {
      setFutureMood("Sad");
      fetchStats("Sad");
    } else {
      setFutureMood("Angry");
      fetchStats("Angry");
    }
  }
  return (
    <div className="fms-container">
      <div className="fms-label">How do you want to feel today?</div>
      <div className="fms-btns-container">
        <button
          className="fms-btn"
          onClick={() => handleClick(0)}
          disabled={!track_id || correctMood == null}
        >
          Feel Happy
        </button>
        <button
          className="fms-btn"
          onClick={() => handleClick(1)}
          disabled={!track_id || correctMood == null}
        >
          Feel Sad
        </button>
        <button
          className="fms-btn"
          onClick={() => handleClick(2)}
          disabled={!track_id || correctMood == null}
        >
          Feel
          <br />
          Angry
        </button>
      </div>
    </div>
  );
};

export default FutureMoodSelector;
