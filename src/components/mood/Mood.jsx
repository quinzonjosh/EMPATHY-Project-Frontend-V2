import React, { useEffect, useState } from "react";
import "./mood.css";
import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import apiClient from "../../spotify";

const Mood = ({
  paths,
  initialPath,
  track_id,
  mood,
  setMood,
  track_features,
  setIndex,
}) => {
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
      const copy = [...track_features];

      load_model(initialPath).then((model) => {
        setButtonDisabled(false);
        setModel(model);
        var tensor = tf.tensor(copy);
        setInput(tensor.expandDims(-1));
      });
    }
  }, [track_features, track_id]);

  async function load_model(path) {
    const model = await tf.loadLayersModel(path);
    return model;
  }

  return (
    <div className="mood-label">
      <div className="m-label">
        <p>Select Model</p>
        <select
          onChange={(e) => {
            load_model(paths[e.target.value]).then((model) => {
              setModel(model);
              setIndex(e.target.value);
              console.log("Model Loaded : " + paths[e.target.value]);
            });
          }}
          defaultValue={0}
        >
          <option value={0}>Aaron</option>
          <option value={1}>Arabella</option>
          <option value={2}>Janella</option>
          <option value={3}>Ron</option>
          <option value={4}>Sean</option>
          <option value={5}>Tiff</option>
        </select>
      </div>
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
