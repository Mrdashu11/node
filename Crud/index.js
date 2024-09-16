const express = require("express");
const port = 4545;
const db =require("./config/db");
const crudschema = require("./model/crudschema");
const app = express();
const multer = require("multer")
const path = require("path")
const fs = require("fs");


const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename :(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now())
    }
})

const uploadpic = multer({
    storage : Storage
}).single("image")

app.use("/uploads",express.static(path.join(__dirname , "uploads")))
app.use(express.urlencoded());
app.set("view engine","ejs");

app.get("/", async(req,res)=>{
   let data = await crudschema.find({});
   data ? res.render("index",{data}) : console.log("Data is not found");
    

});

app.post("/insert",uploadpic, async(req,res)=>{
   req.body.image = req.file.path
   let data = await crudschema.create(req.body);
   data ? res.redirect("back") : console.log("Data not submitted");
   
});

app.get("/deleteData",async(req,res)=>{
    let singledata =  await crudschema.findById(req.query.id);
    fs.unlinkSync(singledata.image)
    let deletedata = await crudschema.findByIdAndDelete(req.query.id);
    deletedata? res.redirect("back") : console.log("Data not Deleted");
    
});
app.get("/editData",async(req,res)=>{
    let editschema = await crudschema.findById(req.query.id);
    editschema ? res.render("edit",{editschema}):console.log("Data not found");
});

app.post("/updateData",uploadpic,async(req,res)=>{
    let img = ""
    let singledata = await crudschema.findById(req.query.id);
    req.file ? img = req.file.path : img = singledata.image
    if(req.file){
        fs.unlinkSync(singledata.image)
    }
    req.body.image = img;
    let updatedata = await crudschema.findByIdAndUpdate(req.query.id,req.body);
    updatedata ? res.redirect("/") : console.log("Data Not update");
});
app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`server started on ${port}`);
    
});