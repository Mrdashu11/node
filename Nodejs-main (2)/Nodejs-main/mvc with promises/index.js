const express = require("express");
const port = 4545;
const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded());
app.use("/",require("./routes"))




app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`server started on ${port}`);
})