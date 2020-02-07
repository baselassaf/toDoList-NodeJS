//jshint esversion: 6



//for express framwork
const express = require ("express");
//bodyParser to talking with forn
const bodyParser = require("body-parser");
// to make http requests
const request = require("request");


const date = require(__dirname + "/date.js");


const app = express();

var items= ["Buy food","Cook Food","Eat Food"];
let workItems = [];

//tells app to use ejs with express must be beloew express line
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

//connect express with css file that exsist in public dir
//without
app.use(express.static("public"));

app.get("/" , function(req,res){

let day= date.getDate();

res.render("list" , { listTitle: day , newListItems: items });
});


app.post("/" , function(req,res){
console.log(req.body.list);
  let item = req.body.newItem;

  if(req.body.list === "Work")
  {
    workItems.push(item);
    res.redirect("/work");
  }else {
      items.push(item);
      res.redirect("/");
    }

});


app.get("/work" , function(req,res){
  res.render("list" , {listTitle: "Work List", newListItems:workItems } );

});

app.get("/about" , function(req,res){
  res.render("about");
});

app.listen(3000 , function(){
  console.log("server is running in port 3000");
});
