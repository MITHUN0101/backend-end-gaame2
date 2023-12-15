var express = require('express');
var router = express.Router();

const userModel = require("./users");
// const passport = require("passport");

// const localStrategy = require("passport-local");
// passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get("/failed",function(req,res){
  req.flash("age",25);
  req.flash("name","Mithun");
  req.flash("school","andrews high school");
  res.send("bangaya");
});


router.get("/checkKaro",function(req,res){
  console.log(req.flash("age"),req.flash("name"),req.flash("school"));
  res.send("Check console");
})

router.get("/create",async function(req,res){
  let userdata = await userModel.create({
    username:"harsh",
    nickname:"asyncJavascripter",
    description:"i am a guy of 25 and I love everything about js,node and react",
    categories:["js","node","react","gsap","modern animation"],
  });
  res.send(userdata);
})

router.get("/find",async function(req,res){
  //1) How can i perform a case-insensitive search in mongoose?
  //let regx = new RegExp("Harsh","i"); // it will show all all the data like harsh,harshita,harshiii
  // let regx = new RegExp("^HaRsH$","i"); // ^ it means search shuruat kaisa ho.  $ it means search ant kaisa ho. it will help in making exact search. 

  //2) How do i find documents where an array filed contains all of a set of values?
  // let user = await userModel.find({username:regx});
  //let user = await userModel.find({categories:{$all:["fashion"]}}); //[harshita,harshii]
  //let user = await userModel.find({categories:{$all:["fashion","science"]}}); //harshii
  //3) How do i find documents with a specific date range in Mongoose?

  // var date1 = new Date("2023-12-14");
  // var date2 = new Date("2023-12-15");
  // let user = await userModel.find({datecreated: {$gte:date1,$lte:date2}});

  //4) How do i filter documents based on a existance of a field in mongoose?
  // let user = await userModel.find({categories:{$exists:true}})

  //5) How can i filter documents based on a specific field's length in mongoose?
  let user = await userModel.find({
      $expr:{
        $and:[
          {$gte:[{$strLenCP: "nickname"},0]},
          {$lte:[{$strLenCP: "nickname"},10]}
        ]
      }
  })
  res.send(user);
})

module.exports = router;
