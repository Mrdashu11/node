const express = require("express");
const db = require("./db.js")
const port = 4545;
const app = express();
app.set("view engine","ejs");
const path = require("path")

app.use(express.urlencoded());

app.use("/uploads",express.static(path.join(__dirname , "uploads")))

const routes = require("./routes")



app.use("/",require("./routes"))




app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`server started on ${port}`);
})