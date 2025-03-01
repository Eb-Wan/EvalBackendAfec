const Exeption = require("../classes/exeption");
const userModel = require("../models/userModel");
const skillModel = require("../models/skillModel");
const settingsModel = require("../models/settingsModel");
const mongoose = require("mongoose");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("express");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" });

exports.listUsers = async (req, res, next) => {
    try {
        const users = await userModel.find().select("-_id name");
        res.status(200).json({ success: true, users });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { name, password, captchaToken } = req.body;

        const captcha = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`);

        if (!captcha.data.success) throw new Exeption("reCaptcha test failed", 403, true, captcha.data);

        const missingFields = (!name ? "name, " : "")+(!password ? "password, " : "");
        if (missingFields) throw new Exeption(`Missing fields ${missingFields}got undefined`, 400, true);

        const user = await userModel.findOne({$or: [{ email: name }, { name: name }]});
        const passMatch = user ? await bcrypt.compare(password, user.password):false;
        
        if (!passMatch) throw new Exeption("Wrong username/email or password", 400, true);

        const isProd = process.env.PROD_ENV === "true";

        const token = generateToken(user.id);
        res.cookie("token", token, { httpOnly: true, maxAge: 12*60*60*1000, secure: isProd, sameSite: isProd ? "none" : "lax" });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);        
    }
};

exports.getRole = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, role: req.user.role });
    } catch (error) {
        next(error);        
    }
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, captchaToken } = req.body;
        
        const captcha = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`);

        if (!captcha.data.success) throw new Exeption("reCaptcha test failed", 403, true, captcha.data);

        const missingFields = (!name ? "name, " : "")+(!email ? "email, " : "")+(!password ? "password, " : "");
        if (missingFields) throw new Exeption(`Missing fields ${missingFields}got undefined`, 400, true);
        
        const salt = await bcrypt.genSalt(8);
        const hashedPass = await bcrypt.hash(password, salt);
        const user = await userModel.create({ name, email, password: hashedPass });
        await settingsModel.create({ userid: user.id });

        const token = generateToken(user.id);

        res.cookie("token", token, { sameSite: "strict", maxAge: 12*60*60*1000 });
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("This user already exists", 400, true)
        next(error);
    }
};
exports.update = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = req.user;
        
        if (!user) throw new Exeption("Invalid authentification", 400, true);
        
        await userModel.findByIdAndUpdate(user.id, { name, email });
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("This user already exists", 400, true)
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) throw new Exeption("Invalid authentification", 400, true);

        await skillModel.deleteMany({ userid: user.id });
        await settingsModel.findOneAndDelete({ userid: user.id });
        await userModel.findByIdAndDelete(user.id);
        
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.updateAdmin = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const { id } = req.param;
        await userModel.findByIdAndUpdate(id, { name, email });
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("This user already exists", 400, true)
        next(error);
    }
};

exports.removeAdmin = async (req, res, next) => {
    try {
        const { id } = req.param;

        if (await userModel.findById(id)) throw new Exeption("User not found", 404, true);

        await skillModel.deleteMany({ userid: id });
        await settingsModel.findOneAndDelete({ userid: id });
        await userModel.findByIdAndUpdate(id);
        
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.getUsersAdmin = async (req, res, next) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ success: true, users })
    } catch (error) {
        next(error);
    }
};