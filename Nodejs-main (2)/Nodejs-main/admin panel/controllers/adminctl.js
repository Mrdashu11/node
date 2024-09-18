const admin = require("../model/admin");

module.exports.index = (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log("Error rendering index page: ", error);
    }
};


module.exports.userlogin=async(req,res)=>{
    console.log(req.body)
    let user = await admin.findOne({email : req.body.email})
    console.log(user);
    
    if(user){
        if(user.password == req.body.password){
            res.cookie("adminData",user)
           return res.redirect("/dashboard")
        }
        else{
            console.log("user not found");
             res.redirect("/")
        }
    }
    else{
        console.log("user not found");
        return res.redirect("/")
    }
}

module.exports.logout=async(req,res)=>{
    res.clearCookie("adminData");

    res.redirect("/")
}
module.exports.table = (req, res) => {
    try {
        res.render("table");
    } catch (error) {
        console.log("Error rendering table page: ", error);
    }
};

module.exports.dashboard = async (req, res) => {
    // console.log(req.cookies.adminData);
    
    try {
        if(req.cookies.adminData == undefined){
            return res.redirect("/")
        }
        else{
            let admindata =  await admin.findById(req.cookies.adminData._id)
            if(admindata){
                res.render("dashboard")
            }else{
                res.redirect("/")
            }
            
        }
   
    } catch (error) {
        console.log("Error rendering dashboard: ", error);
    }
};

module.exports.addform = async (req, res) => {

    
    try {
        if(req.cookies.adminData == undefined){
            return res.redirect("/")
        }
        else{
            let admindata =  await admin.findById(req.cookies.adminData._id)
            if(admindata){
                res.render("addform")
            }else{
                res.redirect("/")
            }
            
        }
    } catch (error) {
        console.log("Error rendering dashboard: ", error);
    }
};
module.exports.viewform = async (req, res) => {
    
    try {
        if(req.cookies.adminData == undefined){
            return res.redirect("/")
        }
        else{
            let admindata =  await admin.findById(req.cookies.adminData._id)
            if(admindata){
                let data = await admin.find({});
        if (data) {
            res.render("viewform", { data });
        } else {
            console.log("Data not found");
        } 
            }else{
                res.redirect("/")
            }
            
        }
        
    } catch (error) {
        console.log("Error rendering dashboard: ", error);
    }
};

module.exports.insert = async (req, res) => {
    try {

        let data = await admin.create(req.body);
        if (data) {
            res.redirect("viewform");
        } else {
            console.log("Data not submitted");
        }   
    } catch (error) {
        console.log("Error rendering addform: ", error);
    }
};

module.exports.deletedata = async (req, res, next) => {
    try {
        const id = req.query.id;
        let deletedData = await admin.findByIdAndDelete(id);
        if (deletedData) {
            res.redirect("back");
        } else {
            console.log("Data not deleted");
        }
    } catch (err) {
        console.log("Error deleting data: ", err);
        next(err); 
    }
};

module.exports.editdata = async (req, res) => {
    try {
       
        if(req.cookies.adminData == undefined){
            return res.redirect("/")
        }
        else{
            let admindata =  await admin.findById(req.cookies.adminData._id)
            if(admindata){
                let editdata = await admin.findById(req.query.id);
                if (editdata) {
                    res.render("edit", { editdata });
                } else {
                    console.log("Data not found");
                }            }else{
                res.redirect("/")
            }
            
        }
   
    } catch (error) {
        console.log("Error retrieving data: ", error);
    }
};

module.exports.updatedata = async (req, res) => {
    try {

        let updateData = await admin.findByIdAndUpdate(req.query.id, req.body);
                if (updateData) {
                    res.redirect("viewform");
                } else {
                    console.log("Data not updated");
                }   
    } catch (error) {
        console.log("Error rendering addform: ", error);
    }
};
