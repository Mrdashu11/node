import { Schema , model } from "mongoose";

const ManagerSchema = new Schema({
    user :{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone:{
        type : Number,
        required : true
    },
    AdminId :{
        type : Schema.Types.ObjectId,
        ref : "admin"
        // required : true
    }
},{timestamps : true})

const Manager =model("Manager",ManagerSchema)

export default Manager