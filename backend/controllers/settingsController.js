const Exeption = require("../classes/exeption");
const settingsModel = require("../models/settingsModel");

exports.getSettings = async (req, res, next) => {
    try {
        const id = req.user.id;
        const settings = await settingsModel.findOne({ userid: id });

        if (!settings) throw new Exeption("No settings found", 404, true);
        res.status(200).json({ success: true, settings });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
		const { acceptsCookies } = req.body;
		const userid = req.user.id;

		await settingsModel.findOneAndUpdate({ userid },{ acceptsCookies });
        
		res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
		const userid = req.user.id;

		await settingsModel.findOneAndDelete({ userid });
        
		res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
