const Exeption = require("../classes/exeption");
const settingsModel = require("../models/settingsModel");

exports.getSettings = async (req, res, next) => {
    try {
        const id = req.user.id;
        const settings = await settingsModel.find({ userid: id });

        if (!settings) throw new Exeption("No settings found", 404, true);
        res.status(200).json({ success: true, settings });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
       
    } catch (error) {
        next(error);
    }
};
