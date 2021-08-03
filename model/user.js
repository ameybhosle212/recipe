const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    password:{
        type:String
    },
    recipe:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Recipe'
        }
    ],
    image:{
        type:String,
        default:"ba1017030abe10decbe2dd30ad1b66ee"
    }
})

const User = new mongoose.model('User',UserSchema)

module.exports = User;