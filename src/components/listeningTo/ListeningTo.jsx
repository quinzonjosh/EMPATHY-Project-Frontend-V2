import React from "react";
import "./listeningTo.css";

const ListeningTo = () => {
  return (
    <div className="listening-to-label">
      <div className="lt-label">We see you've been listening to.</div>
      <div className="track-container">
        <img
          className="track-image"
          src="public/images/Spotify_logo_without_text.svg.png"
        />
        <div className="track-info-container">
          <div className="song-title">Song Title</div>
          <div className="artist-label">Artist</div>
        </div>
      </div>
    </div>
  );
};

export default ListeningTo;
