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


// LOGIN CREDENTIALS

route.get("/login",(req,res)=>{
    res.render("login")
})

route.post("/login", async (req,res)=>{
    const {name , password} = req.body;
    await User.findOne({name:name}).then(user =>{
        if(user){
            const token = jwt.sign({user},'secret');
            console.log(user._id);
            req.session.Userid = user._id;
            req.session.signed = true;
            res.cookie('user',token);
            return res.json({"Data":user})
        }else{
            return res.json({"DATA":"NOT VALID"})
        }
    })
})

// Profile 

route.get("/profile", isSignedIn , isAuth , async (req,res)=>{
    const data = await User.findById(req.session.Userid);
    console.log(data);
    if(data){
        var data2 = [];
        const {_id , image , name } = data;
        const recipes = await User.findById(req.session.Userid).populate('recipe');
        console.log(recipes);
        recipes.recipe.map((data)=>{
            data2.push({
                'id':data._id,
                'date':data.Date,
                'title':data.title,
                'description':data.Description
            });
            console.log(data2);
        })
        res.render("profile",{'id':_id,'name':name,'image':image,'recipe':data2})
    }else{
        res.json({"DATA":"Something Went Wrong Please Reload the screen"})
    }
})

route.post("/profile", upload.single('avatar') , async (req,res)=>{
    const user = await User.findById(req.session.Userid);
    if(req.file){
        const result = await uploadFile(req.file);
        user.image = result.Key;
        user.save();
    }res.redirect("/profile")
})

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

route.get("/logout", isSignedIn , isAuth,(req,res)=>{
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