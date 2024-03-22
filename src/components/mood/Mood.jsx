import React, { useEffect, useState } from "react";
import "./mood.css";
import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import apiClient from "../../spotify";

const Mood = ({modelPath, track_id, mood, setMood, track_features}) => {
  const moods = ["Happy", "Sad", "Angry"];
  const [entry, setEntry] = useState("");
  const [input, setInput] = useState([]);
  const [model, setModel] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const predictMood = () => {
    var prediction = model.predict(input.expandDims(0)).dataSync();
    var predictionIndex = tf.argMax(prediction).dataSync();
    setMood(moods[predictionIndex]);
  };

  useEffect(() => {
    if (track_id != null && track_features.length > 0) {

      const copy = [...track_features]

      load_model().then((model) => {
        setButtonDisabled(false);
        setModel(model);
        var tensor = tf.tensor(copy);
        setInput(tensor.expandDims(-1));
      });
    }
  }, [track_features, track_id]);

  async function load_model() {
    const model = await tf.loadLayersModel(modelPath);
    return model;
  }

  return (
    <div className="mood-label">
      <div className="m-label">Based on this, we think that you feel...</div>
      <div className="emotion-container">
        <div className="track-info-container">
          <div className="emotion-value">
            {mood ? mood.toUpperCase() : ""}
            {mood === "Happy"
              ? " :)"
              : mood === "Sad"
              ? " :("
              : mood === "Angry"
              ? " >:("
              : ""}
          </div>
          <button
            className={`predict_button ${buttonDisabled ? "" : "enabled"}`}
            onClick={predictMood}
            disabled={buttonDisabled}
          >
            Predict Mood
          </button>
        </div>
      </div>
    </div>
  );
};
export default Mood;
