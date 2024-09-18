const mongoose = require("mongoose");



const db=mongoose.connect("mongodb://127.0.0.1/routing")
.then(()=> console.log("MongoDb Connected"))
.catch((err)=>  console.log(err))

module.exports = db;
