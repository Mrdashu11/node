import jwt, { decode } from 'jsonwebtoken'
import Admin from '../model/Admin.model.js';
import Manager from '../model/Manager.model.js';
import Employee from '../model/Employee.model.js';

export const AdminAuth = async(req,res,next) =>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mes: "Access Denied: No Token Provided" });
    }      

    const token = authHeader.split(' ')[1]; 

    try {        
        const decoded = jwt.verify(token, 'pratik'); 
        let admin = await Admin.findById(decode.id)
        if(!admin){
            return res.status(403).json({meg:"Your Are Not Admin"})
        }
        req.user = decoded;         
        next();       
    } catch (err) {
        return res.status(403).json({ mes: "Invalid Token" });
    }
}

export const ManagerAuth = async(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mes: "Access Denied: No Token Provided" });
    }      

    const token = authHeader.split(' ')[1];   

    try{
        const decode = jwt.verify(token,"pratik")
        let manager = await Manager.findById(decode.id)
        if(!manager){
            return res.status(403).json({msg:"Your Are Not Manager"})
        }
        req.user = decode
        next()
    }catch(err){
        return res.status(403).json({ mes: "Invalid Token" });
    }
}

export const EmployeeAuth = async(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ meg: "Access Denied: No Token Provided" });
    }      

    const token = authHeader.split(' ')[1];
    
    try{
        const decode = jwt.verify(token,"pratik")
        let employee = await Employee.findById(decode.id)
        if(!employee){
            return res.status(403).json({msg:"Your Are Not Employee"})
        }
        req.user = decode
        next()
    }catch(err){
        return res.status(403).json({msg:"Access Denied: No Token Provided"})
    }
}