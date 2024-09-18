const express = require("express");

const routes = express.Router();
const multer = require("multer")



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



const web = require("../controllers/web");

routes.get("/", web.index)
routes.get("/form",web.form)
routes.post("/insert",uploadpic,web.insert)
routes.get("/deletemovie",web.deletemovie)
routes.get("/editdmovie",web.editdmovie)
routes.post("/updatemovie",uploadpic,web.updatemovie)


module.exports = routes;    