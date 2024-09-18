const mongoose = require("mongoose")

const pcrud= mongoose.Schema(
    {
        image :{
            type : String,
            required :true

        },
        name : {
            type : String ,
            required : true
        },
        movietype : {
            type : String , 
            require : true
        },
        rating : {
            type : Number,
            require : true
        }

        
    }
)

const crudtab = mongoose.model("PRC",pcrud);

module.exports = crudtab;