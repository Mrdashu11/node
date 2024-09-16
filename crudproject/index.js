const express = require("express");
const db = require("./config/db");
const bookschema = require("./model/cschema");

const port = 4545;
const app = express();
app.set("view engine","ejs");
app.use(express.urlencoded());

app.get("/",async(req,res)=>{
    let data = await bookschema.find({});
    data ? res.render("index",{data}) : console.log("Data not found");

});

app.post("/insert",async(req,res)=>{
    let data = await bookschema.create(req.body);
    data ? res.redirect("back") : console.log("Data not Submitted")
})

app.get("/deleteData",async(req,res)=>{
    let deletbook = await bookschema.findByIdAndDelete(req.query.id);
  deletbook ? res.redirect("back") : console.log("Dat not Deleted");
});

app.get("/editData",async(req,res)=>{
    let editbook = await bookschema.findById(req.query.id);
    editbook ? res.render("edit",{editbook}):console.log("Data not found");
});

app.post("/updateData",async(req,res)=>{
    let updatebook = await bookschema.findByIdAndUpdate(req.query.id,req.body);
    updatebook ? res.redirect("/") : console.log("Data Not update");
});


app.listen(port , (err)=>{
    err ? console.log(err) : console.log(`server started on ${port}`)
})