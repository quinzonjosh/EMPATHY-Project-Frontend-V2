import "./feedback.css";
import * as React from "react";

const Feedback = ({track_id, mood, setCorrectMood, printData, features}) => {

  const handleClick = (num) => {
    // this will get us the words "Happy", "Sad", and "Angry"
    // temporarily, it will only show an alert for button interaction
    setCorrectMood(num)
    alert("Thank you! Your response has been recorded.");
    printData(features)
  };

  return (
    <div className="feedback-label">
      <div className="f-label">Did we guess right? How are you today?</div>
      <div className="feedback-container">
        <div className="feedback-info-container">
          <button
            className="styled_button"
            id="happy_button"
            onClick={(e) => handleClick(0)}
            disabled={!track_id || !mood} 
          >
            happy
          </button>
          <button
            className="styled_button"
            id="sad_button"
            onClick={(e) => handleClick(1)}
            disabled={!track_id || !mood} 
          >
            sad
          </button>
          <button
            className="styled_button"
            id="angry_button"
            onClick={(e) => handleClick(2)}
            disabled={!track_id || !mood} 
          >
            angry
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
