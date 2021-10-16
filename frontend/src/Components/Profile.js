import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = ()=>{
    const [userData , setUserData] = useState({})
    // useEffect(()=>{
    //     var {data} = axios.post('http://localhost:4000/profile', {'token':localStorage.getItem('user')});
    //     setUserData(data);
    // },[])
    return (
        <div>
            <h1>BELOW IS THE DATA FOR YOUR PROFILE</h1>
            {/* <h3>{data.name}</h3>
            <p>{data.bio}</p> */}
        </div>
    );
}

export default Profile;