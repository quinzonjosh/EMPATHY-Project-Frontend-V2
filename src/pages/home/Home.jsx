import React, { useState, useEffect } from "react";
import "./home.css";
import apiClient from "../../spotify";
import ListeningTo from "../../components/listeningTo/ListeningTo";
import Mood from "../../components/mood/Mood";
import Track from "../../components/track/Track";
import Feedback from "../../components/feedback/feedback";

const Home = () => {
  const [name, setName] = useState("");
  const [recentlyPlayed, setRecentlyPlayed] = useState({});
  const [artists, setArtists] = useState([]);
  const [albumImageURL, setAlbumImageURL] = useState("public/images/Spotify_logo_without_text.svg.png");

  useEffect(() => {
    // get user's name
    apiClient
      .get("me")
      .then((response) => {
        setName(response.data.display_name.split(" ")[0]);
      })
      .catch((error) => {
        console.error("Error fetching user name:", error);
      });

    // get the latest music listened by the user
    apiClient
      .get("me/player/recently-played")
      .then((response) => {
        const track = response.data.items[0].track;
        setRecentlyPlayed(track);
        const artistNames = track.artists.map(
          (artist) => artist.name
        );
        setArtists(artistNames);
        setAlbumImageURL(track.album.images[0].url)
    })
      .catch((error) => {
        console.error("Error fetching recently played:", error);
      });
  }, []);

  return (
    <div className="home-body">
      <div className="home-left-body">
        <div className="welcome-container">
          <div className="wb-label">WELCOME BACK</div>
          <div className="username">{name}</div>
        </div>
        <div className="listening-to-container">
          <ListeningTo url={albumImageURL} title={recentlyPlayed.name} artists={artists} />
        </div>
        <div className="mood-container">
          <Mood />
        </div>
      </div>
      <div className="home-right-body">
        <Feedback />
        <Track />
      </div>
    </div>
  );
};

export default Home;
