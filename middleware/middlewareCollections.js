var Camp=require("../models/camp");
var Comment=require("../models/comment");

var middleObj={};

middleObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated())
    {
        next();
    }
    else
    {
        res.redirect("/login");
    }
}

middleObj.check_camp_ownership = function (req,res,next){
    Camp.findById(req.params.id,(err,camp)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(camp.author.id==req.user._id)
            {
                return next();
            }

<<<<<<< HEAD
            req.flash("error","Your are not correct owner for this post!!!");
=======
            req.flash("error","Your are not correct owner for this camp!!!");
>>>>>>> 2c09b8a5ccd4f0c5a12d4d370cd32c9db189c130
            res.redirect("back");
        }
    });
}

middleObj.check_comment_ownership = function (req,res,next){
    Comment.findById(req.params.commentid,(err,comment)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(comment.author.id==req.user._id)
            {
                return next();
            }

            req.flash("error","Your are not correct owner for this comment!!!");
            res.redirect("back");
        }
    });
}

module.exports = middleObj;