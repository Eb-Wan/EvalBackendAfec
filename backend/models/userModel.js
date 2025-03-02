const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, index: true, require: true, unique: true},
    email: {type: String, index: true, require: true, unique: true},
    password: {type: String, require: true},
    role: {type: String, enum: ["unverified", "user", "admin"], require: true, default: "unverified"},
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema);