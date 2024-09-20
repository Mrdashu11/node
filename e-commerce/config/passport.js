const passport = require("passport");

const localSt = require("passport-local").Strategy

const adminSchema = require("../model/adminSchema");

passport.use("local", new localSt(
    { usernameField: "email" },
    async (email, password, done) => {
        let adminData = await adminSchema.findOne({ email: email });
        if (adminData) {
            if (password == adminData.password) {
                return done(null, adminData)
            } else {
                return done(null, false)
            }
        } else {
            return done(null, false)
        }
    }
))

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    let adminData = await adminSchema.findById(id);
    adminData ? done(null, adminData) : done(null, false)
})

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/")
    }
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;