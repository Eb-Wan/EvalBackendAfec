const Exeption = require("../classes/exeption");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" });

exports.login = async (req, res, next) => {
    try {
        const { name, password } = req.body;

        const missingFields = (!name ? "name, " : "")+(!password ? "password, " : "");
        if (missingFields) throw new Exeption(`Missing fields ${missingFields}got undefined`, 400, true);

        const user = await userModel.findOne({$or: [{ email: name }, { name: name }]});
        const passMatch = user ? await bcrypt.compare(password, user.password):false;
        
        if (!passMatch) throw new Exeption("Wrong username/email or password", 400, true);

        const token = generateToken(user.id);
        res.cookie("token", token, { httpOnly: true, maxAge: 12*60*60*1000 });
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

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        const missingFields = (!name ? "name, " : "")+(!email ? "email, " : "")+(!password ? "password, " : "");
        if (missingFields) throw new Exeption(`Missing fields ${missingFields}got undefined`, 400, true);
        
        const salt = await bcrypt.genSalt(8);
        const hashedPass = await bcrypt.hash(password, salt);
        const user = await userModel.create({ name, email, password: hashedPass });

        const token = generateToken(user.id);
        res.cookie("token", token, { httpOnly: true, maxAge: 12*60*60*1000 });
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
        await user.delete();
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};