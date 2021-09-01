import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../App.css';

const Dashboard = () => {
    const [user , setUser] = useState([]);
    useEffect(()=>{
        var { data } =  axios.get('https://jsonplaceholder.typicode.com/users')
        console.log(data);
        setUser(data);
            // console.log(user);
    },[])
    return (
        <div>
            {user.map((val)=>(
                    <div className="Name">
                        <h3>Name is {val.name}</h3>
                        <p>UserName is {val.username}</p>
                    </div>
                )
            )}
            <h1>THEUIE</h1>
        </div>
    );
};

export default Dashboard;
