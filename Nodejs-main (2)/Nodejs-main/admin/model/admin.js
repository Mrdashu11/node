const mongoose = require("mongoose");

const crud = mongoose.Schema(
    {
        fname : {
            type : String,
            required : true
        },
      lname : {
            type : String,
            required : true   
        },
        password:{
            type : String,
            required :true

        }
        ,
        email:{
            type : String,
            required : true
        },
        number : {
            type : String,
            required : true
        },
        mess : {
            type : String,
            required : true
        }
    }
);

const crudtable = mongoose.model("crud",crud)

module.exports = crudtable