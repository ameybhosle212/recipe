const Recipe = require('../model/recipe');
const multer = require('multer');
const { uploadFile } = require('../Auth/s3UploadAndDiwn');
const { isSignedIn, isAuth } = require('../Auth/auth');
const User = require('../model/user');
const route = require('express').Router()
var upload = multer({ dest: 'uploads/' })

// CRUD recipe opeartions

// All 

route.get("/all", isSignedIn , isAuth , async (req,res)=>{
    try {
        const values2 = await Recipe.find();
        var len = Math.ceil((values2.length)/10);
        let {page } = req.query;
        if(!page){
            page = 1
        }
        var size = 10;
        const skip = (page - 1) * size;
        const data = await Recipe.find({}).populate('user').sort([['Date',-1]]).limit(size).skip(skip)
        // console.log(data);
        const data2 = [];
        data.map((val)=>{
            data2.push({
                'id':val._id,
                'title':val.title,
                'Date':val.Date,
                'image':val.image
            })
        })
        console.log(data2);
        res.render("Dashboard",{'Data':data2,'page':page,'len':len});
    } catch (error) {
        return res.json({"DATA":"SOMETHING WENT WRONG"})
    }
})

// View 

route.get("/view/:id", isSignedIn , isAuth , async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    await Recipe.findById(id).populate('user').then(data =>{
        console.log(data);
        if(data){
            return res.json({"data":{
                "title":data.title,
                "description":data.Description,
                "Date":data.Date,
                'user':data.user.name,
                'image':data.image
            }})
        }else{
            res.json({"DATA":"SOMETHING WENT WRONG"})
        }
    })
})

// Add Recipe 

route.get("/add",isSignedIn , isAuth ,(req,res)=>{
    res.render("AddRecipe")
})

route.post("/add", upload.single('avatar') , async (req,res)=>{
    const { title , Description} = req.body;
    var data = Recipe({
        title:title,
        Description:Description
    })
    const user = await User.findById(req.session.Userid);
    user.recipe.push(data._id);
    user.save();
    data.user = req.session.Userid;
    data.save();
    if(req.file){
        console.log(req.file);
        const result = await uploadFile(req.file);
        console.log(result);
        data.image = result.Key;
        data.save();
    }
    return res.redirect("/profile");
})

// Delete Recipe

route.get("/delete/:id", isSignedIn , isAuth , async (req,res)=>{
    const id = req.params.id;
    await Recipe.findById(id).then(async data =>{
        if(data){
            await Recipe.findOneAndDelete({_id:data._id},function(err,doc){
                if(err) res.json({"DATA":err})
                res.json({"DATA":doc})
            })
        }else{
            res.json({"DATA":"SOMETHING WENT WRONG"})
        }
    })
})

module.exports = route;