const Exeption = require("../classes/exeption");
const skillModel = require("../models/skillModel");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

exports.getSkills = async (req, res, next) => {
    try {
        const { userid } = req.params;
        const skills = await skillModel.find({ userid });
        if (!skills) throw new Exeption("No skills have been found", 404, true);
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
        const { id } = req.param;
        const user = req.user;

        const skill = await skillModel.findOne(id);

        if (!skill) throw new Exeption("Skill not found", 404, true);
        if (skill.userid.toString() !== user.id) throw new Exeption("You do not have the rights to access this skill", 403);

        await skillModel.findByIdAndUpdate(id, { title, category, level });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const skill = await skillModel.findById(id);
        console.log(skill.userid.toString(), user.id)

        if (!skill) throw new Exeption("Skill not found", 404, true);
        if (skill.userid.toString() !== user.id) throw new Exeption("You do not have the rights to access this skill", 403, true);

        await cloudinary.uploader.destroy(skill.imgid);
        await skillModel.findByIdAndDelete(id);

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};