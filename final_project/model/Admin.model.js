import { Schema , model } from "mongoose";

const AdminSchema = new Schema({
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
    }
},{timestamps : true})

const Admin = model("admin",AdminSchema)

export default Admin