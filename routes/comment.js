var express=require("express");
var passport= require("passport");
var bodyParser = require("body-parser");
var Camp=require("../models/camp");
var Comment=require("../models/comment");
var comment = require("../models/comment");
var middleware = require("../middleware/middlewareCollections");

var route=express.Router();

route.use(bodyParser.urlencoded({extended:false}));

route.get("/camp/:id/comment/new",(req,res)=>{
    Camp.findById(req.params.id,(err,camp)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comment/new",{camp:camp});
        }
    });
});

route.post("/camp/:id/comment/new",(req,res)=>{
    Camp.findById(req.params.id,(err,camp)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            Comment.create(req.body.comment,(err,commentcreated)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    commentcreated.author.id=req.user._id;
                    commentcreated.author.username=req.user.username;
                    commentcreated.save();
                    
                    camp.comments.push(commentcreated);
                    camp.save((err)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            res.redirect("/camp/show/"+camp._id);
                        }
                    });
                }
            });
        }
    });
});
 
route.get("/camp/:id/comment/edit/:commentid",middleware.check_comment_ownership,(req,res)=>{

    var id=req.params.id;

    Comment.findById(req.params.commentid,(err,comment)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comment/edit",{id:id,comment:comment});
        }
    });
});

route.put("/camp/:id/comment/edit/:commentid",middleware.check_comment_ownership,(req,res)=>{

    Comment.findByIdAndUpdate(req.params.commentid,req.body.commentall,{useFindAndModify:false},(err,commentupdated)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/camp/show/"+req.params.id);
        }
    });
});

route.delete("/camp/:id/comment/delete/:commentid",middleware.check_comment_ownership,(req,res)=>{

    Comment.findByIdAndRemove(req.params.commentid,{useFindAndModify:false},(err)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/camp/show/"+req.params.id);
        }
    });
});

module.exports=route;