const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    password: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);