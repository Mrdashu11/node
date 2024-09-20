const admin = require("../model/adminSchema")


module.exports.login = (req, res) => {
    res.render("login")
}
module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        err ? console.log(err) : res.redirect("/")
    })
}
module.exports.dashboard = (req, res) => {
    res.render("dashboard")
}
module.exports.viewAdmin = async (req, res) => {
    let data = await admin.find({});
    data ? res.render("Admin/viewAdmin", { data }) : console.log("something went wrong");
}
module.exports.addAdmin = (req, res) => {
    res.render("Admin/addAdmin")
}

module.exports.addData = async (req, res) => {
    try {
        const { fname, lname, email, password, mobail, role } = req.body;
        const newUser = new admin({
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            mobail: mobail,
            role: role
        });
        await newUser.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting user');
    }
};

module.exports.loginInfo = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await admin.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found");
        }
        if (user.password !== password) {
            return res.status(400).send("Invalid password");
        }
        if (user.role === "admin") {
            res.render("Admin/dashboard");
        } else if (user.role === "user") {
            res.render("User/Product");
        } else {
            res.status(403).send("Access denied");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

module.exports.profile = (req, res) => {
    res.render("Admin/profile")
}
module.exports.changePass = (req, res) => {
    res.render("Admin/changePass")
}
module.exports.changePassword = async (req, res) => {
    let oldPass = req.user.password;
    let id = req.user.id;

    if (oldPass == req.body.oldPass) {
        if (req.body.oldPass != req.body.newPass) {
            if (req.body.newPass == req.body.confirmPass) {
                let adminData = await admin.findByIdAndUpdate(id, { password: req.body.newPass })
                adminData ? res.redirect("/logout") : console.log("something went wrong");
            } else {
                console.log("new password and confirm password are different");
            }
        } else {
            console.log("old password and new password must be different");
        }
    } else {
        console.log("old password is wrong");
    }
}

module.exports.forgetPassword = (req, res) => {
    return res.render("Admin/forgetPass")
}
module.exports.lostPass = async (req, res) => {
    let user = await admin.findOne({ email: req.body.email })
    if (!user) {
        return res.redirect("Admin/forgetPass")
    }

    let otp = Math.floor(100000 + Math.random() * 900000);
    nodemailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.adminId = user.id

    res.render("newPass")
    console.log("otp sended");
}

module.exports.checkNewPassword = async (req, res) => {
    let otp = req.session.otp
    let adminId = req.session.adminId

    if (otp == req.body.otp) {
        if (req.body.newPass == req.body.confirmPass) {
            await admin.findByIdAndUpdate(adminId, { password: req.body.newPass })
            res.redirect("/");
        } else {
            res.redirect("Admin/forgetPass");
            console.log("password must be same");
        }
    } else {
        res.redirect("/forgetPass")
        console.log("otp is wrong");
    }
}
