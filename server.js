const express = require('express')
const app = express();
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const Recipe = require('./model/recipe');

// DATABASE

mongoose.connect('mongodb+srv://amey:22334@cluster0.phmdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("DB");
})
// ADDS USER
// function add() {
//     var salt = bcrypt.genSaltSync(10);
//     var hash = bcrypt.hashSync("22334", salt);
//     var dtaa = new User({
//         name:"ASDFA",
//         password:hash
//     })
//     dtaa.save()
// }

// add()

// ADD RECIPE

async function ADDRecipe(){
    var newRecipe = new Recipe({
        title:"Rice",
        Description:"Add RIce and Mix Well amd Cook in Cooker for about 2 0mins",
        user:'616a821be2fbb707285f2b67'
    })
    var users = await User.findById('616a821be2fbb707285f2b67')
    console.log(users);
    users.recipe.push(newRecipe._id);
    users.save();
    newRecipe.save()
}

ADDRecipe()