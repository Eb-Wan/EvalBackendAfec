const { body, validationResult } = require("express-validator");

exports.validateRegister = [
    body("name").trim().exists().notEmpty().withMessage("Username is required").isLength({max:31}).withMessage("Username max length is 31").escape(),
    body("email").trim().exists().notEmpty().withMessage("Email is required").isEmail().withMessage("Must be an email").isLength({max:63}).withMessage("Email max length is 63").escape(),
    body("password").trim().exists().notEmpty().withMessage("Password is required").isLength({max:63}).withMessage("Password max length is 63").escape()
];

exports.validateSkill = [
    body("title").trim().exists().notEmpty().withMessage("Title is required").escape(),
    body("category").trim().exists().notEmpty().withMessage("Category is required").escape(),
    body("level").trim().exists().notEmpty().withMessage("Level is required").escape()
];

exports.validateSettings = [body("acceptsCookies").isBoolean()];

exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors });
    next();
};
