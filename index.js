const express = require('express')
const app = express();
const mongoose = require('mongoose')
const passport = require('passport')
const ExpressSession = require('express-session')
const cors = require('cors')
const Mongo = require('connect-mongo')
const cookieParser = require('cookie-parser')
require('dotenv').config()

// DATABASE

mongoose.connect('mongodb+srv://amey:amey@cluster0.rkdnt.mongodb.net/myAttend?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("DB");
})

// MiddleWare
app.use(express.static(__dirname + '/public'));
app.use(cors())
app.use(ExpressSession({ 
    secret: "secret",
    resave:false,
    saveUninitialized:false,
    store:Mongo.create({
        mongoUrl:'mongodb+srv://amey:amey@cluster0.rkdnt.mongodb.net/myAttend?retryWrites=true&w=majority'
    })
}));
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session());
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// Routes

app.use("/",require('./route/routes'))
app.use("/recipe",require('./route/recipeRoute'))

// Server
const port = process.env.port || 1001
app.listen(1001,()=>{
    console.log("SERVER AT 1001");
})