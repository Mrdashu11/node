import multer from "multer";

const Storage=multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+ "-" +Date.now())
    }
})

const uploadpic = multer({storage : Storage}).single("poster")

export default uploadpic;