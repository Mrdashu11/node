const express = require("express");
var cookieParser = require('cookie-parser')
const port = 5000;
const app = express();
app.use(cookieParser())

app.use(express.urlencoded());
app.set("view engine","ejs");


const db =require("./config/db");
const admin = require("./model/admin");
const routes = require("./routes")
const path = require("path")
app.use("/",routes)

const multer = require("multer")        




app.use(express.static(path.join(__dirname , "Public")))





app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`server started on ${port}`);
    
});