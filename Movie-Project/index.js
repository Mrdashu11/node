import express from 'express'
import db from './db.js'; //database connected
import router from './router/movierouter.js';
import { fileURLToPath } from 'url'
import path from 'path';

const port=9090;

const app=express()

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

app.set("view engine",'ejs')
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use("/uploads",express.static(path.join(__dirname,'uploads')))

app.use("/",router)

app.listen(port,()=> console.log(`Server Is Port NO. ${port} Run`));