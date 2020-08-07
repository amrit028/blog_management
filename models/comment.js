var mongoose = require("mongoose");

var commentSchema=new mongoose.Schema({
    desc:String,
    author:{
        id:String,
        username:String
    }
});

module.exports=mongoose.model("Comment",commentSchema);