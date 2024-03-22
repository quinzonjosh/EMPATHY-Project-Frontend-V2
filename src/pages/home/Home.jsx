import React, { useState, useEffect } from "react";
import "./home.css";
import apiClient from "../../spotify";
import ListeningTo from "../../components/listeningTo/ListeningTo";
import Mood from "../../components/mood/Mood";
import Track from "../../components/track/Track";
import Feedback from "../../components/feedback/feedback";
import FutureMoodSelector from "../../components/FutureMoodSelector/FutureMoodSelector";

const Home = () => {
  const [name, setName] = useState("");
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState({});
  const [artists, setArtists] = useState([]);
  const [albumImageURL, setAlbumImageURL] = useState(
    "public/images/Spotify_logo_without_text.svg.png"
  );
  const [trackID, setTrackID] = useState("");
  const [song, setSong] = useState("");
  const [currentTrackFeatures, setCurrentTrackFeatures] = useState([]);

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

    fetchData()
  }, []);

  async function fetchData() {
    apiClient
      .get("me/player/currently-playing")
      .then((response) => {
        const track = response.data.item;
        const artistNames = track.artists.map((artist) => artist.name);
        setCurrentlyPlayingTrack(track);
        setArtists(artistNames);
        setAlbumImageURL(track.album.images[0].url);

        setTrackID(track.id);
      })
      .catch((error) => {
        console.error("Error fetching currently playing:", error);
      })

      // Get Audio Features
      apiClient
      .get(`/audio-features/${trackID}`)
      .then((response) => {
        const features = response.data;
        setCurrentTrackFeatures(features);
      })
      .catch((error) => {
        console.error("Error fetching current track features:", error);
      });
  }

  return (
    <div className="home-body">
      <div className="home-left-body">
        <div className="welcome-container">
          <div className="wb-label">WELCOME BACK</div>
          <div className="username">{name}</div>
        </div>
        <div className="listening-to-container">
          <ListeningTo
            url={albumImageURL}
            title={currentlyPlayingTrack.name}
            artists={artists}
            fetchData={fetchData}
          />
        </div>
        <div className="mood-container">
          <Mood track_id={trackID} />
        </div>
      </div>
      <div className="home-right-body">
        <Feedback />
        <FutureMoodSelector/>
        <Track track_id={trackID} />
      </div>
    </div>
  );
};

export default Home;
