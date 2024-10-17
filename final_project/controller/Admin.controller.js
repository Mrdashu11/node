import Admin from "../model/Admin.model.js";
import Manager from "../model/Manager.model.js";
import Employee from "../model/Employee.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendotp from "../middleware/Mail.js";

export const view_admin = async(req,res) =>{
    const  data = await Admin.findById(req.user.id)
    res.status(200).json(data)
}

export const Add_admin = async(req,res)=>{
    const {user, email } = req.body;
    let password = await bcrypt.hash(req.body.password,10)
    await Admin.create({user,email,password})
    res.status(201).json({msg : "Admin Added"})
}

export const login = async(req,res)=>{
    try{

        let user = await Admin.findOne({email:req.body.email})
        if(!user){
            res.status(404).json({mes:"Admin Not Found"})
        }        

        let ismatch =await bcrypt.compare(req.body.password,user.password)

        if(!ismatch){
            res.status(200).json({mes:"Incorrect Password"})
        }

        const token = jwt.sign({ id: user._id, email: user.email }, "pratik", { expiresIn: "1h" });

        res.status(200).json({mes:"Logging Successfully",token})

    }catch(err){
        res.status(400).json({mes:"Uothorizred User"})
    }
}

export const Change = async(req,res)=>{
    try{
        let data = await Admin.findOne({email : req.body.email})

        if(!data){
            res.status(200).json({msg:"Admin Not Found"})
        }

        if(req.body.password == req.body.confrompassword){
            const password = await bcrypt.hash(req.body.password,10)
            await Admin.findByIdAndUpdate(data.id,{password})
            res.status(201).json({msg:"Password Changed"}) 
        }

        res.status(200).json({mes:"Password Not Match"})
        
    }catch(err){
        res.status(400).json({msg : "Error"})
    }
} 

export const Add_manager = async(req,res)=>{
    try{
         req.body.AdminId = req.user.id
         req.body.password = await bcrypt.hash(req.body.password,10)
        await Manager.create(req.body)
        res.status(201).json({meg : "Manger Created"})
    }catch(err){
        res.status(400).json({msg:"Manager Not Add"})
    }
}

export const View_manager = async(req,res)=>{
    try{
        let data = await Manager.find()
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({msg:"Manager Not Viewed"})
    }
} 

export const Manager_delete = async(req,res)=>{
    try{
        await Manager.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:"Manager Deleted"})
    }catch(err){
        res.status(400).json({msg:"Manager Not Deleted"})
    }
}

export const View_employee = async(req,res)=>{
    try{
        let data = await Employee.find()
        res.status(200).json(data) 
    }catch(err){
        res.status(400).json({msg:"Employee Not Viewed"})
    }
}

export const Employee_delete = async(req,res)=>{
    try{
        await Employee.findByIdAndDelete(req.params.id)
        res.status(201).json({msg:"Employee Deleted"})
    }catch(err){
        res.status(400).json({msg:"Employee Not Deleted "})
    }
}

export const otpsend = async(req,res)=>{
    try{
        const otp=Math.floor(10000+Math.random()*900000)
        const {email} = req.body
        const user = await Admin.findOne({email})
        sendotp(email,otp)
        const data = { id: user._id, otp };
        res.cookie('otp', data, {
            httpOnly: true,
            maxAge: 3600000, 
        });
        res.status(200).json({msg:"Otp Send"})
    }catch(err){
        res.status(400).json({msg:"Mail Not send"})
    }
}

export const forget = async(req,res)=>{
    try{
        const {otp,newPassword,confirmPassword} = req.body
        const otpCookie = req.cookies.otp;
        if(otpCookie == otp){
            if(newPassword == confirmPassword){
                let password = await jwt.sign(newPassword,10)
                await Admin.findByIdAndUpdate(otpCookie.id,{password})
                res.status(201).json({msg:"Password Changed"})
            }else{
                res.status(400).json({msg:"Password Not Match"})
            }            
        }else{
            res.status(400).json({msg:"Otp Not Right"})
        }
    }catch(err){
        res.status(400).json({msg:"Not Forget"})
    }
}