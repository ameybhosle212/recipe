const express = require('express')
const app = express();
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs')

// DATABASE

mongoose.connect('mongodb+srv://amey:22334@cluster0.phmdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("DB");
})

function add() {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("22334amey", salt);
    var dtaa = new User({
        name:"amey",
        password:hash
    })
    dtaa.save()
}

add()