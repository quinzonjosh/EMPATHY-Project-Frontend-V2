import React from 'react'
import "./sidebar.css"
import { FaSignOutAlt } from "react-icons/fa";
import SidebarButton from './SidebarButton';
import { useEffect, useState } from 'react';
import apiClient from '../../spotify';


const SideBar = () => {

    const [image, setImage] = useState("public/images/Spotify_logo_without_text.svg.png");
    useEffect(()=>{
        apiClient.get("me")
        .then(response => {
            setImage(response.data.images[0]?.url);
            // console.log(response);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    },[]);

    return (
        <div className='sidebar-container'>
            <img className="profile-img" src={image}/>
            <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />}/>
        </div>
    
      )
}

export default SideBar