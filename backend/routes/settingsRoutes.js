const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/protectMiddleware");
const { validateSettings, validateRequest } = require("../middlewares/validatorMiddleware");
const { getSettings, update, remove } = require("../controllers/settingsController");

router.get("/", authMiddleware, getSettings);
router.put("/", authMiddleware, validateSettings, validateRequest, update);

module.exports = router;
