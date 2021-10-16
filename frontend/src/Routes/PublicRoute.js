import React from "react";
import { Route , Redirect } from "react-router-dom";

function isLogin() {
    return localStorage.getItem('user')? true :false;
}
const PublicRoute = ({component:Component , ...rest})=>{
    return(
        <Route {...rest} render={props =>(
            isLogin() ? 
            <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
}

export default PublicRoute;