var express=require("express");
var passport= require("passport");
var bodyParser = require("body-parser");
var Camp=require("../models/camp");
var middleware = require("../middleware/middlewareCollections");
var route=express.Router();

route.use(bodyParser.urlencoded({extended:false}));

route.get("/camp",(req,res)=>{
    Camp.find({},(err,camp)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("camp/home",{camp,camp});
        }
    });
});

route.get("/camp/new",(req,res)=>{
    res.render("camp/new");
});

route.post("/camp/new",(req,res)=>{
    var author={id:req.user._id,username:req.user.username};
    var newuser={name:req.body.name,image:req.body.image,description:req.body.description,author:author};
    Camp.create(newuser,(err,camp)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(camp);
            res.redirect("/camp");
        }
    });
});

route.get("/camp/show/:id",(req,res)=>{
    Camp.findById(req.params.id).populate("comments").exec((err,camp)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("camp/show",{camp,camp});
        }
    });
});

route.get("/camp/edit/:id",middleware.check_camp_ownership,(req,res)=>{
    Camp.findById(req.params.id,(err,camp)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("camp/edit",{camp:camp});
        }
    });
});

route.put("/camp/edit/:id",middleware.check_camp_ownership,(req,res)=>{
    Camp.findByIdAndUpdate(req.params.id,req.body.all,{useFindAndModify:false},function(err,val){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(val);
            
            res.redirect("/camp/show/"+req.params.id);
        }
    });
});

route.delete("/camp/delete/:id",middleware.check_camp_ownership,(req,res)=>{
    Camp.findByIdAndRemove(req.params.id,{useFindAndModify:false},function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/camp");
        }
    });
});

module.exports=route;