import { Router } from "express";

import { manager_login , view_manager , Change , add_employee , view_employee } from "../controller/Manager.controller.js";
import { ManagerAuth } from "../middleware/Adminauth.js";

const managerRouter = Router()

managerRouter.get("/show",ManagerAuth,view_employee)
managerRouter.get("/:id",ManagerAuth,view_manager)
managerRouter.post("/login",manager_login)
managerRouter.post("/password_change",ManagerAuth,Change)
managerRouter.post("/add_employee",ManagerAuth,add_employee)

export default managerRouter