import React, { useState, useEffect } from "react";
import "./home.css";
import apiClient from "../../spotify";
import ListeningTo from "../../components/listeningTo/ListeningTo";
import Mood from "../../components/mood/Mood";
import Track from "../../components/track/Track";
import Feedback from "../../components/feedback/feedback";

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

    // get the latest music listened by the user
    // apiClient
    //   .get("me/player/recently-played")
    //   .then((response) => {
    //     const track = response.data.items[0].track;
    //     setRecentlyPlayed(track);
    //     const artistNames = track.artists.map((artist) => artist.name);
    //     setArtists(artistNames);
    //     setAlbumImageURL(track.album.images[0].url);

    //     setTrackID(track.id);
    //     // console.log(recentlyPlayed);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching recently played:", error);
    //   });

    // get the user's current track listening to
    apiClient
      .get("me/player/currently-playing")
      .then((response) => {
        const track = response.data.item;
        const artistNames = track.artists.map((artist) => artist.name);
        setCurrentlyPlayingTrack(track);
        setArtists(artistNames);
        setAlbumImageURL(track.album.images[0].url);

        setTrackID(track.id);
        // console.log(track);
      })
      .catch((error) => {
        console.error("Error fetching currently playing:", error);
      });
  }, []);

  useEffect(() => {
    // get audio features of the current track
    apiClient
      .get(`/audio-features/${trackID}`)
      .then((response) => {
        const features = response.data;
        setCurrentTrackFeatures(features);
      })
      .catch((error) => {
        console.error("Error fetching current track features:", error);
      });
  }, [trackID]);

  useEffect(() => {
    console.log("Current Track's audio features:", currentTrackFeatures);
  }, [currentTrackFeatures]);

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
          />
        </div>
        <div className="mood-container">
          <Mood track_id={trackID} />
        </div>
      </div>
      <div className="home-right-body">
        <Feedback />
        <Track track_id={trackID} />
      </div>
    </div>
  );
};

export default Home;

async function getRecentlyPlayed() {
  return apiClient.get("/me/player/recently-played");
}

async function getCurrentTrack() {
  return apiClient.get("/me/player/currently-playing");
}
