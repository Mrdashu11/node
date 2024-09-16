const mongoose = require("mongoose");

const crud = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        subject : {
            type : String,
            required : true   
        },
        image :{
            type : String,
            required :true

        }
    }
);

const crudtable = mongoose.model("crud",crud)

module.exports = crudtable