import { Router } from "express";
import { Employee_login , view_employee , Change } from "../controller/Employee.controller.js";
import { EmployeeAuth } from "../middleware/Adminauth.js";

const employeeRouter = Router()

employeeRouter.post("/change_password",EmployeeAuth,Change)
employeeRouter.post("/login",Employee_login)
employeeRouter.get("/:id",EmployeeAuth,view_employee)

export default employeeRouter