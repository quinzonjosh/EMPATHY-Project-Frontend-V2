import React, { useState, useEffect } from "react";
import "./home.css";
import apiClient from "../../spotify";
import ListeningTo from "../../components/listeningTo/ListeningTo";
import Mood from "../../components/mood/Mood";
import Track from "../../components/track/Track";

const Home = () => {
  const [name, setName] = useState("");
  const [playlists, setPlaylists] = useState(null);


  useEffect(() => {
    apiClient
      .get("me/player/recently-played")
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching recently played:", error);
      });
  }, []);

  useEffect(() => {
    apiClient
      .get("me")
      .then((response) => {
        setName(response.data.display_name.split(" ")[0]);
        // console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching user name:", error);
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
          <ListeningTo />
        </div>
        <div className="mood-container">
          <Mood />
        </div>
      </div>
      <div className="home-right-body">
        <Track />
      </div>
    </div>
  );
};

export default Home;
