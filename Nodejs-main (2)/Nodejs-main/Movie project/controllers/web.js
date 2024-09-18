const crudtab = require("../model/dbschema");
const fs = require("fs");
const path = require("path");

module.exports.index = async (req, res) => { 
    try {
        const data = await crudtab.find({});
        if (data) { 
            res.render("index", { data });
        } else {
            console.log("Data not found");
        }
    } catch (err) {
        console.error(err);
    
    }
};

module.exports.form=async(req,res)=>{
    await res.render("form")
}

module.exports.insert = async (req, res) => {
    try {
        req.body.image = req.file.path;
        let data = await crudtab.create(req.body);
        if (data) {
            res.redirect("/");
        } else {
            console.log("Data not submitted");
        }
    } catch (err) {
        console.error(err);
        
    }
};

module.exports.deletemovie = async (req, res) => {
    try {
        let singledata = await crudtab.findById(req.query.id);
        if (singledata) {
            fs.unlinkSync(singledata.image);
            let deletedata = await crudtab.findByIdAndDelete(req.query.id);
            if (deletedata) {
                res.redirect("back");
            } else {
                console.log("Data not deleted");
            }
        } else {
            console.log("Movie not found");
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports.editdmovie = async (req, res) => {
    try {
        let editschema = await crudtab.findById(req.query.id);
        if (editschema) {
            res.render("edit", { editschema });
        } else {
            console.log("Data not found");
        }
    } catch (err) {
        console.error(err);
        
    }
};

module.exports.updatemovie = async (req, res) => {
    try {
        let img = "";
        let singledata = await crudtab.findById(req.query.id);
        if (singledata) {
            img = req.file ? req.file.path : singledata.image;
            if (req.file) {
                fs.unlinkSync(singledata.image);
            }
            req.body.image = img;
            let updatedata = await crudtab.findByIdAndUpdate(req.query.id, req.body);
            if (updatedata) {
                res.redirect("/");
            } else {
                console.log("Data Not updated");
            }
        } else {
            console.log("Movie not found");
        }
    } catch (err) {
        console.error(err);
    }
};
