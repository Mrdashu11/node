import Manager from '../model/Manager.model.js'
import Employee from '../model/Employee.model.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const manager_login = async(req,res)=>{
    try{    
        let data = await Manager.findOne({email:req.body.email})
        if(!data){
            res.status(200).json({msg:"Manager Not Found"})
        }
        
        let ismatch = await bcrypt.compare(req.body.password,data.password)
        const token = jwt.sign({ id: data._id, email: data.email }, "pratik", { expiresIn: "1h" });
        if(!ismatch){
            res.status(400).json({mag:"Password Incorret"})
        }
        res.status(200).json({msg:"Login Successfully",token})
    }catch(err){
        res.status(400).json({msg:"Unothorized Manager"})
    }
}

export const view_manager = async(req,res)=>{
    try{
     let data = await Manager.findById(req.user.id)
     res.status(200).json(data) 
    }catch(err){
        res.status(400).json({msg:"Manager Not Found"})
    }
}

export const Change = async(req,res)=>{
    try{
        let data = await Manager.findOne({email:req.body.email})
        if(!data){
            res.status(400).json({msg:"Data Not Found"})
        }

        if(req.body.password == req.body.confrompassword){
            const password = await bcrypt.hash(req.body.password,10)
            await Manager.findByIdAndUpdate(data.id,{password})
            res.status(201).json({msg:"Password Changed"}) 
        }

        res.status(200).json({mes:"Password Not Match"})

    }catch(err){
        res.status(400).json({msg:"Password Not Changed"})
    }
}

export const add_employee = async(req,res)=>{
    try{    
        req.body.ManagerID = req.user.id
        req.body.password = await bcrypt.hash(req.body.password,10)
        await Employee.create(req.body)
        res.status(201).json({msg:"Employee Created"})
    }catch(err){
        res.status(400).json({msg:"Employee Not Added"})
    }
}

export const view_employee = async(req,res)=>{
    try{
        let data = await Employee.find({})
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({msg:"Employee Not Found"})
    }
}