const express = require("express");
const routes = express.Router();

const web = require("../controllers/web");

routes.get("/",web.index)
routes.get("/home",web.home)
routes.get("/about",web.about)



module.exports = routes;    