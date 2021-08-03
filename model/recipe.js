const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:{
        type:String,
        default:"3e8d3de0dc6c235bf24143fb80cfcc04"
    }
})

const Recipe = new mongoose.model('Recipe',RecipeSchema)

module.exports = Recipe;