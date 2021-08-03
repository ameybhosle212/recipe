const User = require('../model/user')
const jwt = require('jsonwebtoken')

module.exports = {
    isAuth:(req,res,next)=>{
        const token = req.cookies.user;
        console.log(token);
        if(token){
            jwt.verify(token,'secret',function(err,data){
                if(err){
                    res.sendStatus(403).json({"DATA":"INVALID"})
                }else{
                    next();
                }
            })
        }else{
            res.json({"DATA":"INVALID USER"})
        }
    },
    isSignedIn:(req,res,next)=>{
        console.log(req.session.signed);
        if(req.session && req.session.signed){
            next();
        }else{
            return res.json({"DATA":"INVALID DATA"})
        }
    },
    isNotSignedIn:()=>{

    }
}