var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var flash=require("connect-flash");
var authroute=require("./routes/auth");
var camproute=require("./routes/camp");
var commentroute=require("./routes/comment");
var User=require("./models/user");
var Camp=require("./models/camp");
var Comment=require("./models/comment");
var middleware = require("./middleware/middlewareCollections");

var PORT=process.env.PORT || 3000;

var app=express();

var dburl=process.env.DATABASEURL || "mongodb://127.0.0.1:27017/";
mongoose.connect(dburl);

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret:"Life is to live it up to its fullest...",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    console.log(req.flash("error"));
    next();
});

app.use(authroute);

app.use(middleware.isLoggedIn);

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    console.log(req.user);
    next();
});

app.use(camproute);
app.use(commentroute);

app.listen(PORT,(err)=>{
    console.log("SERVER IS RUNNING.....");
});
