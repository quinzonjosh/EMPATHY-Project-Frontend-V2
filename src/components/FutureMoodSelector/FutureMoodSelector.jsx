import React from "react";
import "./futureMoodSelector.css";

const FutureMoodSelector = (props) => {
  const track_id = props.track_id;

  const handleClick = () => {
    console.log();
  };

  return (
    <div className="fms-container">
      <div className="fms-label">How do you want to feel today?</div>
      <div className="fms-btns-container">
        <button className="fms-btn" onClick={handleClick} disabled={!track_id}>
          feel happier
        </button>
        <button className="fms-btn" onClick={handleClick} disabled={!track_id}>
          feel my feelings
        </button>
        <button className="fms-btn" onClick={handleClick} disabled={!track_id}>
          feel
          <br />
          blue
        </button>
      </div>
    </div>
  );
};

export default FutureMoodSelector;
