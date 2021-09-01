import axios from 'axios';
import React, { useState } from 'react';

const Login = async () => {
    const [name , setName] = useState('');
    const [password , setPassword] = useState('');
    const submit = async (event)=>{
        event.preventDefault()
        var data = await axios.post('http://localhost:1001/login',{
            name:name,
            password:password
        });
        if(data.data.token){
            localStorage.setItem('user',data.data.token);
            window.location = '/';
        }
    }
    return (
        <div>
            <form onSubmit={submit}>
                <input name="name" value={setName} onChange={e => setName(e.target.value)}  />
                <input name="password" value={setPassword} onChange={e => setPassword(e.target.value)}  />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Login;
