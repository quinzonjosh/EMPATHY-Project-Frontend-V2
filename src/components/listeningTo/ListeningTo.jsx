import React from "react";
import "./listeningTo.css";

const ListeningTo = (props) => {
  return (
  <div className="listening-to-label">
    <div className="lt-label">We see that you're currently listening to...</div>
    <div className="track-container">
      <div className="pic-info-container">
        <img className="track-image" src={props.url} />
        <div className="track-info-container">
          <div className="song-title">{props.title}</div>
          <div className="artist-label">{props.artists.join(" | ")}</div>
        </div>
      </div>
      <button className="refresh_button" onClick={() => props.fetchData()}>
      Refresh
      </button>
    </div>
  </div>
  );
};

export default ListeningTo;
