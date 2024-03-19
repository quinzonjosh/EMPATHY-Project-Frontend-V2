import React from 'react'
import { loginEndpoint } from '../../spotify';
import "./login.css";

const Login = () => {
    return (
        <div className="login-page">
          <img
            src="public/images/Spotify_logo_without_text.svg.png"
            className="spotify-logo"
          />
          <a href={loginEndpoint}>
            <div className="login-btn">LOG IN</div>
          </a>
        </div>
      );
}

export default Login