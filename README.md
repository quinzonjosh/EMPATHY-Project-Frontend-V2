# Emotion-Responsive Music Player

This project is an emotion-responsive music player built using React.js, the Spotify API, and TensorFlow with Python for the backend. It analyzes user emotions by acquiring the music you are currently listening to on Spotify recommends a song using a machine learning model and Spotify's vast music database.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Common issues](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features
- **Emotion Analysis**: Utilizes TensorFlow for emotion detection from user inputs.
- **Spotify Integration**: Connects with the Spotify API to fetch and get music based on a song currently listening to and detected emotions.
- **Responsive Design**: Built with React.js for a seamless user experience across devices.  

## Installation

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running:
- npm i
- npm i react-router-dom
- npm axios
- npm i @tensorflow/tfjs
- npm react-icons


## Usage
1. Go to https://developer.spotify.com/ and create an account
2. create an app and fill in the app name, description, and set the redirect uri to the port where the react app is running (example: http://localhost:5173)
3. Under API's used, select Web API and confirm app creation
4. in your created app in Spotify, go to dashboard -> settings -> edit
5. In your spotify developer account's homepage go to dashboard -> settings
6. copy the clientID of your spotify app
7. Go to the react app and open the file in src/spotify.js
8. replace the clientID with your clientID from spotify
9. Run the react app via terminal: npm run dev and open the link to the terminal
10. You will be asked to login to your spotify account
11. For the main featueres of the app to work, you must be currently listening to a spotify song
12. when the song that you are listening to is loaded, there must be an order of clicking certain buttons for the app to give you song recommendations
13. Below the info of your currently listening to track, press the predict mood
14. click a button among 'happy', 'sad', or 'angry' that corresponds to your current emotion
15. answer the question "how do you want to feel today" by clicking the buttons provided
16. Click get recommendation, and the app will provide you a song according to the interaction and information you have provided.
17. Use the refresh button on the track info to update the currently listening to song if you have changed the music. 

## Common Issues
Sometimes the apap might have errors in acquiring the song you're currently listening to due to expiration of client tokens. By default, spotify client tokens only last for an hour so after that, you will need to sign out and sign in again on the react app. 

## Technologies used
- React vite
- Tensorflow
- PyTorch
