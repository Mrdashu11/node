import Employee from "../model/Employee.model.js";
import bcrypt from 'bcryptjs'

export const Employee_login = async(req,res)=>{
    try{
        let data = await Employee.findOne({email:req.body.email})
        if(!data){
            res.status(400).json({meg : "Employee Not Found"})
        }
        let ismatch = await bcrypt.compare(req.body.password,data.password)
        if(!ismatch){
            res.status(400).json({msg:"Password incorrected"})
        }
        res.status(200).json({msg:"Login Successfully"})
    }catch(err){
        res.status(400).json({msg:"Unothoried User"})
    }
}

export const view_employee = async(req,res)=>{
    try{
        let data = await Employee.findById(req.user.id)
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({msg:"Not found"})
    }
}

export const Change = async(req,res)=>{
    try{
        let data= await Employee.findOne({email:req.body.email})
        if(!data){
            res.status(400).json({meg:"User Not Found"})
        } 

        if(req.body.password == req.body.confrompassword){
            let password = await bcrypt.hash(req.body.password,10)
            await Employee.findByIdAndUpdate(data.id,{password})
            res.status(201).json({msg:"Password Channged"})
        }

        res.status(200).json({msg:"Password Not Match"})
        
    }catch(err){
        res.status(400).json({msg:"Unothorized"})
    }
}