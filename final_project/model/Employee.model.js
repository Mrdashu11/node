import { Schema , model } from "mongoose";

const EmployeeSchema = new Schema({
    user :{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    ManagerID : {
        type : Schema.Types.ObjectId,
        ref : "Manager"
    }
},{timestamps : true})

const Employee = model("employee",EmployeeSchema)

export default Employee