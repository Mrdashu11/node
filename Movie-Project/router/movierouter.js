import express from 'express'
import { getdata , add , adddata , deletedata , getedit, postedit } from '../controller/moviecontroller.js'
import uploadpic from '../middleware/multer.js'

const router=express.Router()

router.get("/",getdata)
router.get("/add",add)
router.post("/add",uploadpic,adddata)
router.get("/delete/:id",deletedata)
router.get("/edit/:id",getedit)
router.post("/edit/:id",uploadpic,postedit)

export default router