const jwt = require("jsonwebtoken");
const Exeption = require("../classes/exeption");
const userModel = require("../models/userModel");

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Exeption("No provided token", 401, true);
    
        const { id } = jwt.decode(token)
        if (!id) throw new Exeption("Invalid token", 401, true);
    
        const user = await userModel.findById(id).select("-password -email");
        if (!user) throw new Exeption("Invalid token payload", 401, true);
    
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
   
};

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") throw new Exeption("Forbidden", 403, true);
        next();
    } catch (error) {
        next(error);
    }
   
};
