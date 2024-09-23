const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobail: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Role can be either 'user' or 'admin'
        required: true
    }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
