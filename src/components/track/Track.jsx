import React, { useEffect, useState } from "react";
import "./track.css";
import apiClient from "../../spotify";
import { data } from "@tensorflow/tfjs";

const Track = (props) => {
  const [trackID, setTrackID] = useState("");
  const [seedArtist, setSeedArtist] = useState("");
  const [seedGenre, setSeedGenre] = useState("");
  const [seed_tracks, setSeedTracks] = useState("");

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [albumImg, setAlbumImg] = useState("");

  useEffect(() => {
    if(props.track_id){
      setTrackID(props.track_id)
    }
  }, [props.track_id])

  async function getTrack(){
    apiClient.get("/tracks/" + trackID).then((response) => {
      var data = response.data
      setSeedArtist(data.artists[0].id)
      setSeedGenre(data.artists[0].genres ? data.artists[0].genres[0] : "pop")

      getRecommendation()
    })
  }
  
  async function getRecommendation(){
    apiClient.get(
      "recommendations" +
      "?limit=1" + 
      "&seed_artists=" + seedArtist + 
      "&seed_genres=" + seedGenre + 
      "&seed_tracks=" + trackID
    )
    .then((response) => {
      var data = response.data
      setName(data.tracks[0].name)
      setArtist(data.tracks[0].artists[0].name)
      setAlbumImg(data.tracks[0].album.images[0].url)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="track-outer-container">
      <div className="recommend-label">
        Based on your mood, we recommend you listen to...
      </div>
      <div className="track-inner-container">
        <img
          className="track-album"
          src={albumImg ? albumImg : "public/images/Spotify_logo_without_text.svg.png"}
        />
        <div className="song-info-container">
          <div className="song-title">{name ? name : "Song Title"}</div>
          <div className="artist-label">{artist ? artist : "Artist"}</div>
        </div>
        <button className="button_recommendation" onClick={() => {
          getTrack()
        }}>
          Get Recommendation
        </button>
      </div>
    </div>
  );
};

export default Track;
