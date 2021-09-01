// import axios from "axios";
// // import exports from "enhanced-resolve";
// import React from 'react';

export const isLogin = ()=>{
    if(localStorage.getItem('user')){
        return true;
    }else{
        return false;
    }
}

// exports.LoginUser = ()=>{
    
// }