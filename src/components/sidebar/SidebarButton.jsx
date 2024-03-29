import React from "react";
import "./sidebarButton.css";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const SidebarButton = (props) => {

  const handleSignOut = () =>{
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <Link to={props.to}>
      <div className="btn-body" onClick={handleSignOut}>
        <IconContext.Provider value={{size: "24px", className: "btn-icon"}}> 
            {props.icon}
            <p className="btn-title">{props.title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  );
};

export default SidebarButton;
