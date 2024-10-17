import { Router } from "express";
import { view_admin , Add_admin, login , Change , Add_manager , View_manager , Manager_delete , View_employee , Employee_delete , otpsend , forget} from "../controller/Admin.controller.js";

import {AdminAuth} from "../middleware/Adminauth.js";

const adminRouter = Router()

adminRouter.get("/",AdminAuth,view_admin)
adminRouter.post("/add",AdminAuth,Add_admin)
adminRouter.post("/login",login)
adminRouter.post("/password_change",AdminAuth,Change)
adminRouter.post("/addmanager",AdminAuth,Add_manager)
adminRouter.get("/manager",AdminAuth,View_manager)
adminRouter.delete("/manager/:id",AdminAuth,Manager_delete)
adminRouter.get("/employee",AdminAuth,View_employee)
adminRouter.delete("/employee/:id",AdminAuth,Employee_delete)
adminRouter.post("/otpsend",otpsend)
adminRouter.post("/forget",forget)

export default adminRouter