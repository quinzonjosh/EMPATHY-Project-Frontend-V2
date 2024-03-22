import React, { useState, useEffect } from "react";
import "./home.css";
import apiClient from "../../spotify";
import ListeningTo from "../../components/listeningTo/ListeningTo";
import Mood from "../../components/mood/Mood";
import Track from "../../components/track/Track";
import Feedback from "../../components/feedback/feedback";
import FutureMoodSelector from "../../components/FutureMoodSelector/FutureMoodSelector";

const Home = () => {
  const modelPaths = [
    "models/Aaron/model.json",
    "models/Arabella/model.json",
    "models/Janella/model.json",
    "models/Ron/model.json",
    "models/Sean/model.json",
    "models/Tiff/model.json",
  ]
  const [name, setName] = useState("");
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState({});
  const [artists, setArtists] = useState([]);
  const [albumImageURL, setAlbumImageURL] = useState("public/images/Spotify_logo_without_text.svg.png");
  const [trackID, setTrackID] = useState("");
  const [currentTrackFeatures, setCurrentTrackFeatures] = useState([]);
  const [mood, setMood] = useState(null);
  const [correctMood, setCorrectMood] = useState(null);
  const [futureMood, setFutureMood] = useState(null);

  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    // Get User Name
    apiClient.get("me")
    .then((response) => {
      setName(response.data.display_name.split(" ")[0]);

      // Get Currently Playing Track
      apiClient.get("me/player/currently-playing")
      .then((response) => {
        var data = response.data
        const track = data.item;
        const artistNames = track.artists.map((artist) => artist.name);
        setCurrentlyPlayingTrack(track);
        setArtists(artistNames);
        setAlbumImageURL(track.album.images[0].url);
        setTrackID(track.id);

        // Get Audio Features
        apiClient.get(`audio-features/${track.id}`)
        .then((response) => {
          var data = response.data;

          if (data.id != null)
            setCurrentTrackFeatures([
              data.tempo,
              data.danceability * 100,
              data.energy * 100,
              data.acousticness * 100,
              data.instrumentalness * 100,
              data.valence * 100,
              data.speechiness * 100,
              data.liveness * 100,
              data.loudness,
            ]);
        })
        .catch((error) => {
          console.error("Error fetching current track features:", error);
        });
      })
      .catch((error) => {
        console.error("Error fetching currently playing:", error);
      })
    })
    .catch((error) => {
      console.error("Error fetching user name:", error);
    });
  }

  function printData(currentTrackFeatures){
    var features = currentTrackFeatures
    console.log("BPM: " + features[0],)
    console.log("Dance: " + features[1])
    console.log("Energy: " + features[2])
    console.log("Acoustic: " + features[3])
    console.log("Instrumental: " + features[4])
    console.log("Happy: " + features[5])
    console.log("Speech: " + features[6])
    console.log("Live: " + features[7])
    console.log("Loud: " + features[8])
    console.log(
      currentlyPlayingTrack.name + "," +
      currentlyPlayingTrack.artists[0].name + "," +
      features[0] + "," + // BPM  
      "-" + "," + "-" + // Parent and Child Genre
      features[1] + "," + // Danceability
      features[2] + "," + // Energy
      features[3] + "," + // Acousticness
      features[4] + "," + // Instrumentalness
      features[5] + "," + // Valence / Happiness
      features[6] + "," + // Speechiness
      features[7] + "," + // Liveness
      features[8] + "," + // Loudness
      mood
    )
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
          <Mood 
            paths={modelPaths}
            initialPath={modelPaths[0]}
            track_id={trackID} 
            mood={mood} 
            setMood={setMood} 
            track_features={currentTrackFeatures}
          />
        </div>
      </div>
      <div className="home-right-body">
        <Feedback 
          track_id={trackID} 
          mood={mood} 
          setCorrectMood={setCorrectMood} 
          printData={printData} 
          features={currentTrackFeatures} 
        />

        <FutureMoodSelector 
          track_id={trackID} 
          correctMood={correctMood} 
          setFutureMood={setFutureMood}
        />

        <Track 
          track_id={trackID} 
          futureMood={futureMood} 
        />
      </div>
    </div>
  );
};

export default Home;
