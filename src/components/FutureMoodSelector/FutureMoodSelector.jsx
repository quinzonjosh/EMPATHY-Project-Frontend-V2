import React from "react";
import "./futureMoodSelector.css"

const FutureMoodSelector = () => {
  return (
    <div className="fms-container">
      <div className="fms-label">How do you want to feel today?</div>
      <div className="fms-btns-container">
        <button className="fms-btn">feel happier</button>
        <button className="fms-btn">feel my feelings</button>
        <button className="fms-btn">feel blue</button>
      </div>
    </div>
  );
};

export default FutureMoodSelector;
