import React from "react";
import "./track.css";

const Track = () => {
  return (
    <div className="track-outer-container">
      <div className="recommend-label">
        Based on your mood, we recommend you listen to...
      </div>
      <div className="track-inner-container">
        <img
          className="track-album"
          src="public/images/Spotify_logo_without_text.svg.png"
        />
        <div className="song-info-container">
          <div className="song-title">Song Title</div>
          <div className="artist-label">Artist</div>
        </div>
      </div>
    </div>
  );
};

export default Track;
