const mongoose = require("mongoose");

const book = mongoose.Schema({
    title : {
        type : String ,
        require : true
    },
   author : {
        type : String ,
        require : true
    },
    year : {
        type : Number ,
        require : true
    },
price : {
        type :Number ,
        require : true
    },
   copy : {
        type :Number ,
        require : true
    }
})


const booktabel = mongoose.model("book",book);

module.exports = booktabel;