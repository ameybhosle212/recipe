import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = ()=>{
    const [userData , setUserData] = useState({})
    useEffect(()=>{
        async function Canv(){
            var {data} = await axios.post('http://localhost:1001/profile', {'token':localStorage.getItem('user')});
            console.log(data.Data);
            setUserData(data.Data);
            console.log(`The data is ${userData}`);
        }
        Canv()
    },[])
    return (
        <div>
            <h1>BELOW IS THE DATA FOR YOUR PROFILE</h1>
            <h3>{userData.name}</h3>
            <p>{userData.password}</p>
        </div>
    );
}

export default Profile;