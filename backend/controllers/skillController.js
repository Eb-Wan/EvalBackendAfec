const Exeption = require("../classes/exeption");
const skillModel = require("../models/skillModel");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.getSkills = async (req, res, next) => {
    try {
        const skills = await skillModel.find();
        if (!skills) throw new Exeption("No skills have been created", 404, true);
        res.status(200).json({ success: true, skills });
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        if (!req.file) throw new Exeption("No files uploaded", 400, true);

        const { title, category, level } = req.body;
        const id = req.user.id;

        const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'evalImages' });
        const imgurl = uploadResult.secure_url;
        const imgid = uploadResult.public_id;

        fs.unlinkSync(req.file.path);

        const missingFields = (!title ? "title, " : "")+(!category ? "category, " : "")+(!level ? "level, " : "")+(!imgurl ? "imgurl, " : "");
        if (missingFields) throw new Exeption(`Missing fields ${missingFields}got undefined`, 400, true);
        
        await skillModel.create({ userid: id, title, category, level, imgurl, imgid });
        res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { title, category, level } = req.body;
        const id = req.param;

        await skillModel.findByIdAndUpdate(id, { title, category, level });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const id = req.param;

        const skill = await skillModel.findById(id);
        if (!skill) throw new Exeption("Skill not found", 404);

        await skillModel.findByIdAndDelete(id);
        await cloudinary.uploader.destroy(skill.public_id);

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};