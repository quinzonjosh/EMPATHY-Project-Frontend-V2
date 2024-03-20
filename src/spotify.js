import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "d08e2206b27b47a1aef16ca63e2e921f";
const redirectUri = "http://localhost:5173";
const scopes = ["user-read-recently-played", "user-library-read", "playlist-read-private", "user-read-currently-playing"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;


const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1"
});

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function(config){
        config.headers.Authorization = "Bearer " + token;
        return config;
    })
}

export default apiClient;