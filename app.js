var express = require('express');
var app = express();
var bodyParser = require("body-parser");



app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var todoList = [
    "Wash the car change oil",
    "Clean Room"
]

//==========Express Routes===========//


//Default Route
app.get("/",function(req,res){
    res.render("index.ejs",{todoList:todoList});
});

//Submit Button Route
app.post("/newtodo",function(req,res){
    console.log("item submitted !");
    var item = req.body.item;
    todoList.push(item);
    res.redirect("/");
});


// Catch all other routes
app.get("*",function(req,res){
    res.send("<h1>Invalid Page</h1>")
})





//Server Listenin On Port 3000
app.listen(3000,function(){
    console.log("Server Started on port 3000")
});