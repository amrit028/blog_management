var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Comment=require("./comment");

var campSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    author:{
        id:String,
        username:String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports=mongoose.model("Camp",campSchema);