        const express = require("express");
        const port = 1080;
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
        app.use("/products/size/:size", express.static(path.join(__dirname, "public")));
        app.use("/products/single/:id", express.static(path.join(__dirname, "public")));
        app.use("/products/category", express.static(path.join(__dirname, "public")));
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

        app.use(passport.initialize());
        app.use(passport.session());
        app.use(passport.setAuthenticatedUser);

        // Use routes
        app.use("/", require("./routes")); // Main routes
        app.use("/products", require("./routes/product")); 
        app.use('/products/size/:size', require("./routes/product")); // Adjust as needed

        app.listen(port, (err) => {
            err ? console.log(err) : console.log("Server started on port " + port);
        });
