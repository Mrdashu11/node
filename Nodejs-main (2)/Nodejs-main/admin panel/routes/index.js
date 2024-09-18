const express = require("express");
const routes = express.Router();

const adminctl = require("../controllers/adminctl");

routes.get("/", adminctl.index)
routes.post("/userlogin",adminctl.userlogin)
routes.get("/logout",adminctl.logout)
routes.get("/dashboard",adminctl.dashboard)
routes.get("/addform",adminctl.addform)
routes.get("/viewform",adminctl.viewform)
routes.post("/insert",adminctl.insert)
routes.get("/deletedata",adminctl.deletedata)
routes.get("/editdata",adminctl.editdata)
routes.post("/updatedata",adminctl.updatedata)

module.exports = routes; 