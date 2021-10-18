import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = ()=>{
    const [userData , setUserData] = useState({})
    useEffect(()=>{
        async function Canv(){
            var {data} = await axios.post('http://localhost:1001/profile', {'token':localStorage.getItem('user')});
            // console.log(data.Data);
            // setUserData(data.Data);
            // console.log(`The data is ${userData}`);
        }
        Canv()
    },[])
    return (
        <div>
            <h1>BELOW IS THE DATA FOR YOUR PROFILE</h1>
            <h3>Name is {userData.name}</h3>
            {/* <p>{userData.password}</p> */}
            {/* <p>{userData.recipe[0].title}</p> */}
            {userData.recipe.map(data =>(
                <div key={data._id}>
                    <p>Title is {data.title}</p>
                    <p>Description is {data.Description}</p>
                </div>
            ))}
        </div>
    );
}

export default Profile;