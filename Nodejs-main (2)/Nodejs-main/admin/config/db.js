const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/firstcrud");

const db = mongoose.connection;

db.once("open",(err)=>{
    err?console.log(err) : console.log("Database connected")
});

module.exports = db;