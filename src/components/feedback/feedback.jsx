// import React from "react";
import "./feedback.css";
import * as React from "react";

const Feedback = () => {
  const handleClick = (e) => {
    // this will get us the words "Happy", "Sad", and "Angry"
    // temporarily, it will only show an alert for button interaction
    console.log(e.target.innerHTML);
    alert("Thank you! Your response has been recorded.");
  };

  return (
    <div className="feedback-label">
      <div className="f-label">Did we guess right? How are you today?</div>
      <div className="feedback-container">
        <div className="feedback-info-container">
          <div>I want to...</div>
          <div className="buttons-container">
            <button
              className="styled_button"
              id="happy_button"
              onClick={handleClick}
            >
                feel happier
            </button>
            <button
              className="styled_button"
              id="sad_button"
              onClick={handleClick}
            >
                {/* keep feeling my mood */}
                feel my feelings
            </button>
            <button
              className="styled_button"
              id="angry_button"
              onClick={handleClick}
            >
                feel <br/>blue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
