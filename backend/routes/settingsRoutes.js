const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/protectMiddleware");
const { validateSettings, validateRequest } = require("../middlewares/validatorMiddleware");
const { getSettings, update } = require("../controllers/settingsController");

router.get("/", authMiddleware, getSettings);
router.put("/", authMiddleware, validateSettings, validateRequest, update);

module.exports = router;
