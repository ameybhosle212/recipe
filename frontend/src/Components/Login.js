import axios from "axios";
import React, { useState } from "react";
import Navs from "./Nav";

const Login =  ()=>{
    const [email , setEmail] = useState("")
    const [pass , setPass] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(email);
        var {data} = await axios.post("http://localhost:1001/login",{name :email , password:pass});
        console.log(data);
        if(data){
            if(data.msg === "Wrong Password"){
                alert("WRONG PASSWORD");
            }
            if(data.msg === "Wrong Uname"){
                alert("Wrong Uname")
            }
            else{
                localStorage.setItem('user',data.token);
                window.location = "/";
            }
        }else{
            alert("WRONG CREDENTIALS")
        }
    }
    return (
        <div>
            <Navs />
            <form onSubmit={handleSubmit}>
                <input name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input name="pass" value={pass} onChange={e => setPass(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Login;