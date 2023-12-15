const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testingenggame2");

const userSchema = mongoose.Schema({
  username:String,
  nickname:String,
  description:String,
  categories:{
    type:Array,
    default:[]
  },
  datecreated:{
    type:Date,
    default:Date(),
  }
})

module.exports = mongoose.model("user",userSchema);