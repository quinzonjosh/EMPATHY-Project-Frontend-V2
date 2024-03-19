import React from "react";
import "./listeningTo.css";

const ListeningTo = (props) => {

  return (
    <div className="listening-to-label">
      <div className="lt-label">We see you've been listening to.</div>
      <div className="track-container">
        <img
          className="track-image"
          src={props.url}
        />
        <div className="track-info-container">
          <div className="song-title">{props.title}</div>
          <div className="artist-label">{props.artists.join(" | ")}</div>
        </div>
      </div>
    </div>
  );
};

export default ListeningTo;
