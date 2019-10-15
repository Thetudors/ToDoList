var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

//mongoose.Promise = global.Promise;

/////Mongoose Connetion
mongoose.connect("mongodb://localhost/todo",{
    
}).then(function(){
    console.log("Database Conneted");
})



app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var todoSchema = mongoose.Schema({
    name: String
});

var Todo = mongoose.model("Todo",todoSchema);

//var todoList = [
//    "Wash the car change oil",
//    "Clean Room"
//]

//==========Express Routes===========//


//Default Route
app.get("/",function(req,res){
    Todo.find({},function(err,todoList){
        if(err) console.log(err);
        else{
            res.render("index.ejs",{todoList:todoList});
        }
    })
   
});

//Submit Button Route
app.post("/newtodo",function(req,res){
    console.log("item submitted !");
    var newItem = new Todo({
        name : req.body.item
    });
    Todo.create(newItem,function(err,Todo){
        if(err) console.log(err);
        else{
            console.log("Inserted Item : "+newItem);
        }
    });
    //todoList.push(item);
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