import React, { useEffect, useState } from "react";
import "./track.css";
import apiClient from "../../spotify";
import { data } from "@tensorflow/tfjs";

const Track = ({ track_id, futureMood, minStats, maxStats }) => {
  const [trackID, setTrackID] = useState("");
  const [seedArtist, setSeedArtist] = useState("");
  const [seedGenre, setSeedGenre] = useState("");
  const [seed_tracks, setSeedTracks] = useState("");

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [albumImg, setAlbumImg] = useState("");

  console.log(minStats);
  console.log(maxStats);
  useEffect(() => {
    if (track_id) {
      setTrackID(track_id);
    }
  }, [track_id]);

  async function getTrack() {
    // TODO: get track based on emotion from DB

    apiClient.get("/tracks/" + trackID).then((response) => {
      var data = response.data;
      console.log(data);
      setSeedArtist(data.artists[0].id);
      setSeedGenre(data.artists[0].genres ? data.artists[0].genres[0] : "");
      getRecommendation();
    });
  }

  async function getRecommendation() {
    apiClient
      .get(
        "recommendations" +
          "?limit=1" +
          "&seed_artists=" +
          seedArtist +
          (seedGenre ? "&seed_genres=" + seedGenre : "") +
          "&seed_tracks=" +
          trackID +
          "&min_acousticness=" +
          minStats.Acoustic / 100 +
          "&max_acousticness=" +
          maxStats.Acoustic / 100 +
          "&min_danceability=" +
          minStats.Dance / 100 +
          "&max_danceability=" +
          maxStats.Dance / 100 +
          "&min_energy=" +
          minStats.Energy / 100 +
          "&max_energy=" +
          maxStats.Energy / 100 +
          "&min_instrumentalness=" +
          minStats.Instrumental / 100 +
          "&max_instrumentalness=" +
          maxStats.Instrumental / 100 +
          "&min_liveness=" +
          minStats.Live / 100 +
          "&max_liveness=" +
          maxStats.Live / 100 +
          "&min_loudness=" +
          minStats.Loud +
          "&max_loudness=" +
          maxStats.Loud +
          "&min_speechiness=" +
          minStats.Speech / 100 +
          "&max_speechiness=" +
          maxStats.Speech / 100 +
          "&min_tempo=" +
          minStats.BPM +
          "&max_tempo=" +
          maxStats.BPM +
          "&min_valence=" +
          minStats.Happy / 100 +
          "&max_valence=" +
          maxStats.Happy / 100
      )
      .then((response) => {
        var data = response.data;
        setName(data.tracks[0].name);
        setArtist(data.tracks[0].artists[0].name);
        setAlbumImg(data.tracks[0].album.images[0].url);
      })
      .catch((error) => {
        alert("Please try again!");
        console.log(error);
      });
  }

  return (
    <div className="track-outer-container">
      <div className="recommend-label">
        Based on what you want, we recommend:
      </div>
      <div className="track-inner-container">
        <img
          className="track-album"
          src={
            albumImg
              ? albumImg
              : "public/images/Spotify_logo_without_text.svg.png"
          }
        />
        <div className="song-info-container">
          <div className="song-title">{name ? name : "Song Title"}</div>
          <div className="artist-label">{artist ? artist : "Artist"}</div>
        </div>
        <button
          className="button_recommendation"
          disabled={!track_id || futureMood == null}
          onClick={() => {
            getTrack();
          }}
        >
          Get Recommendation
        </button>
      </div>
    </div>
  );
};

export default Track;
