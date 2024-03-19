import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/home/Home.jsx";
import "./App.css"
import Sidebar from "../src/components/sidebar/SideBar.jsx"
import { useState, useEffect } from "react";
import { setClientToken } from "./spotify";
import Login from "../src/pages/login/Login.jsx";

function App() {

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";    

    if(!token && hash){
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
      // console.log(window.localStorage.getItem("token"))
    } else{
      setToken(token);
      setClientToken(token);
    }

  }, []);

  return !token ? (<Login />) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
