const route = require('express').Router()
const multer = require('multer')
const { uploadFile , downloadImage } = require('../Auth/s3UploadAndDiwn')
const User = require('../model/user')
var upload = multer({ dest: 'uploads/' })
const passport = require('passport')
const { isSignedIn, isAuth } = require('../Auth/auth')
const jwt = require('jsonwebtoken')
const Recipe = require('../model/recipe')
require('../Auth/googleAuth')
const bcrypt = require('bcryptjs')

route.get("/",(req,res)=>{
    res.render("index")
})

// LOGIN CREDENTIALS

route.get("/login",(req,res)=>{
    res.render("login")
})

route.post("/login", async (req,res)=>{
    const {name , password} = req.body;
    console.log(name);
    console.log(password);
    await User.findOne({name:name}).then(user =>{
        if(user){
            var info = bcrypt.compare(password , user.password);
            if(info){
                const token = jwt.sign({id:user._id},'secret');
                return res.json({'token':token})
            }else{
                return res.json({'msg':"Wrong Password"})
            }
            // console.log(user._id);
            // req.session.Userid = user._id;
            // req.session.signed = true;
            // res.cookie('user',token);
            // return res.json();
        }else{
            return res.json({"msg":"Wrong Uname"})
        }
    })
})

// Profile 

route.post("/profile", async (req,res)=>{
    var t = jwt.verify(req.body.token , 'secret')
    console.log(t);
    const UserIfValid = await User.findById(t.id).populate('recipe');
    console.log(UserIfValid);
    if(UserIfValid){
        return res.json({'Data':UserIfValid})
    }else{
        return res.json({'msg':"Plaese Refresh The Page"})
    }
    // const data = await User.findById(req.session.Userid);
    // console.log(data);
    // if(data){
    //     var data2 = [];
    //     const {_id , image , name } = data;
    //     const recipes = await User.findById(req.session.Userid).populate('recipe');
    //     console.log(recipes);
    //     recipes.recipe.map((data)=>{
    //         data2.push({
    //             'id':data._id,
    //             'date':data.Date,
    //             'title':data.title,
    //             'description':data.Description
    //         });
    //         console.log(data2);
    //     })
    //     return res.json({'id':_id,'name':name,'image':image,'recipe':data2})
    // }else{
    //     res.json({"DATA":"Something Went Wrong Please Reload the screen"})
    // }
})

// route.post("/profile", upload.single('avatar') , async (req,res)=>{
//     const user = await User.findById(req.session.Userid);
//     if(req.file){
//         const result = await uploadFile(req.file);
//         user.image = result.Key;
//         user.save();
//     }res.redirect("/profile")
// })

// Image Upload and Download

route.get("/images/:key",(req,res)=>{
    const key = req.params.key;
    const readStream = downloadImage(key)
    readStream.pipe(res)
})

// Google Authentication

route.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

route.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });


// LogOut 

route.get("/logout", (req,res)=>{
    if(req.session.signed){
        req.session.destroy(function(err){
            res.clearCookie('user');
            return res.json({"DATA":"LOGGED OUT"})
        })
    }else{
        return res.json({"DATA":"YOUA ARE LOGGED OUT ALREADY"})
    }
})

module.exports = route;