import React, { useEffect, useState } from "react";
import "./mood.css";
import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import apiClient from "../../spotify";

const Mood = (props) => {

  const moods = ["HAPPY", "SAD", "ANGRY"]
  const [entry, setEntry] = useState("")
  const [input, setInput] = useState([])
  const [model, setModel] = useState()
  const [mood, setMood] = useState("")
  const track_id = props.track_id;

  useEffect(() => {
    if(track_id != null){
      apiClient.get(`/audio-features/${track_id}`)
      .then((response) => {
        var data = response.data
        if(data.id != null){
          delete data.id
          delete data.key
          delete data.uri
          delete data.track_href
          delete data.type
          delete data.analysis_url
          delete data.mode
          delete data.duration_ms
          delete data.time_signature

          setEntry()

          load_model().then((model) => {
            setModel(model)

            var tensor = tf.tensor([
              data.tempo, 
              data.danceability*100, 
              data.energy*100, 
              data.acousticness*100, 
              data.instrumentalness*100, 
              data.valence*100, 
              data.speechiness*100, 
              data.liveness*100, 
              data.loudness
            ])

            setInput(tensor.expandDims(-1))
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [track_id])

  return (
    <div className="mood-label">
      <div className="m-label">Based on this, we predict that your mood is...</div>
      <div className="emotion-container">
        <div className="track-info-container">
          <div className="emotion-value">{mood}</div>
          <button className="predict_button" onClick={() => {
            var prediction = model.predict(input.expandDims(0)).dataSync();
            console.log(prediction)
            var predictionIndex = tf.argMax(prediction).dataSync();
            setMood(moods[predictionIndex]);
          }}>Predict Mood</button>
        </div>
      </div>
    </div>
  );
};
export default Mood;

async function load_model(){
  const model = await tf.loadLayersModel("/models/tiff_weights/model.json");
  return model;
}

