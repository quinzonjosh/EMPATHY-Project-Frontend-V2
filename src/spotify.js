import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "0934c0d84d4046fc94680d21ba8f0f5c"; // replace with your client ID from settings of your created app in spotify for developers
const redirectUri = "http://localhost:5173/";
const scopes = [
  "user-read-recently-played",
  "user-library-read",
  "playlist-read-private",
  "user-read-currently-playing",
];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
