import axios from "axios";
import React, { useState } from "react";

const Login = ()=>{
    const [email , setEmail] = useState("")
    const [pass , setPass] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault();
        var {data} = axios.post("http://localhost:4000/login",{'email':email , 'pass':pass});
        if(data){
            if(data.msg === "Wrong Password"){
                alert("WRONG PASSWORD");
            }else{
                localStorage.setItem('user',data.token);
                window.location = "/";
            }
        }else{
            alert("WRONG CREDENTIALS")
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input name="pass" value={pass} onChange={e => setPass(e.target.value)} />
            <button>Submit</button>
        </form>
    );
}

export default Login;