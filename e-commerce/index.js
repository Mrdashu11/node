const express = require("express");
const port = 1008;
const path = require("path");

const app = express();
const db = require("./config/database");

const passport = require("passport");
const session = require("express-session");
const localSt = require("./config/passport");

// Set up view engine
app.set("view engine", "ejs");
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/products", express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(session({
    name: "demoSession",
    secret: 'myBatch',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Route imports
app.use("/", require("./routes")); // General routes
app.use("/products", require("./routes/product")); // Product routes

// Start server
app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server started on port " + port);
});
