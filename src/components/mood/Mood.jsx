import React from "react";
import "./mood.css";

const Mood = () => {

    const mood = "HAPPY :)"

  return (
    <div className="mood-label">
      <div className="m-label">Based on this, we predict that your mood is...</div>
      <div className="emotion-container">
        <div className="track-info-container">
          <div className="emotion-value">{mood}</div>
        </div>
      </div>
    </div>
  );
};
export default Mood;
