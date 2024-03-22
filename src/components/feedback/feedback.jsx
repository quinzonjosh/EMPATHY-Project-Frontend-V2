import "./feedback.css";
import * as React from "react";

const Feedback = (props) => {
  const track_id = props.track_id;

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
          <button
            className="styled_button"
            id="happy_button"
            onClick={handleClick}
            disabled={!track_id} 
          >
            happy
          </button>
          <button
            className="styled_button"
            id="sad_button"
            onClick={handleClick}
            disabled={!track_id} 
          >
            sad
          </button>
          <button
            className="styled_button"
            id="angry_button"
            onClick={handleClick}
            disabled={!track_id} 
          >
            angry
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
