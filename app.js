const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/user");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//set views
app.set("views", "views");
app.set("view engine", "ejs");

//get request
app.get("/", (req, res,next) => {
    res.render("form", {
        pageTitle: "user"
    })
})

//add data
app.post("/add", (req,res,next)=> {
    console.log(req.body);
    const user = new User({
       name: req.body.name,
       address: req.body.address,
    })
    user.save().then(result => {
        console.log("added");
        res.status(200).send("added")
        
        
    }).catch(err => {
        console.log(err);
    })
  
    })
        
var port = process.env.PORT || 3000;
//connect database
mongoose.connect("mongodb+srv://Sana:api123@cluster0.bal0c.mongodb.net/<dbname>?retryWrites=true", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//listen server
app.listen(port, () => {
    console.log("server started");
})