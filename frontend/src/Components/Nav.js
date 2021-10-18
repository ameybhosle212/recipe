import React from "react";
import { Link } from "react-router-dom";

function isLogin() {
    return localStorage.getItem('user') ? true : false;
}

const Navs = ()=>{
    return(
        <div>
            <ul>
                <Link to="/"><li>Home</li> </Link>
                {/* <Link to="/profile"><li>Profile</li> </Link> */}
                {isLogin() ? <Link to="/profile"><li>Profile</li> </Link> : <div></div> }
                {isLogin() ? <div></div> : <Link to="/login"><li>Login</li> </Link>  }
                {isLogin() ? <Link to="/logout"><li>Logout</li> </Link> : <div></div>  }
            </ul>
        </div>
    );
}
export default Navs