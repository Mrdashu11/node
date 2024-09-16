const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


let task = [
];

app.set("view engine", "ejs");

const middleware = async (req, res, next) => {
  if (req.query.age >= 18) {
    next();
  } else {
    res.redirect("/");
  }
};

app.get("/", (req, res) => {
  res.render("index", {
   
  });
});



app.get("/home", middleware, (req, res) => {
  res.render("Home");
});

app.get("/admin",middleware, (req, res) => {
  res.render("index");
});

app.get("/register", middleware,(req, res) => {
  res.render("register");
});

app.get("/login", middleware,(req, res) => {
  res.render("login");
});


app.use(middleware);

app.listen(4545, () => {
  console.log("server listening on port 4545");
});