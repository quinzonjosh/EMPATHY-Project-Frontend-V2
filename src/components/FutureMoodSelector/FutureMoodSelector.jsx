import React from "react";
import "./futureMoodSelector.css";

const FutureMoodSelector = ({track_id, correctMood, setFutureMood}) => {

  return (
    <div className="fms-container">
      <div className="fms-label">How do you want to feel today?</div>
      <div className="fms-btns-container">
        <button className="fms-btn" onClick={() => setFutureMood(0)} disabled={!track_id || correctMood == null}>
          feel happier
        </button>
        <button className="fms-btn" onClick={() => setFutureMood(1)} disabled={!track_id || correctMood == null}>
          feel my feelings
        </button>
        <button className="fms-btn" onClick={() => setFutureMood(2)} disabled={!track_id || correctMood == null}>
          feel
          <br />
          blue
        </button>
      </div>
    </div>
  );
};

export default FutureMoodSelector;
