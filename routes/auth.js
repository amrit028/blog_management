var express=require("express");
var passport= require("passport");
var bodyParser = require("body-parser");
var User=require("../models/user");
var route=express.Router();

route.use(bodyParser.urlencoded({extended:false}));

route.get("/",(req,res)=>{
    res.render("auth/log");
});

route.get("/register",(req,res)=>{
    res.render("auth/register");
});

route.post("/register",(req,res)=>{
    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>
    {
        if(err)
        {
            console.log(err);
            req.flash("error",err.message);
            res.redirect("back");
        }
        else
        {
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/camp");
            });
        }
    });
});

route.get("/login",(req,res)=>{
    res.render("auth/login");
});

route.post("/login",passport.authenticate("local",{
    successRedirect:"/camp",
<<<<<<< HEAD
    successFlash:"Welcome!",
=======
    successFlash:"Welcome!!!",
>>>>>>> 2c09b8a5ccd4f0c5a12d4d370cd32c9db189c130
    failureRedirect:"/login",
    failureFlash:true
    }),(req,res)=>{
});

route.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","Successfully logged out!!!");
    res.redirect("/");
});

<<<<<<< HEAD
module.exports=route;
=======
module.exports=route;
>>>>>>> 2c09b8a5ccd4f0c5a12d4d370cd32c9db189c130
