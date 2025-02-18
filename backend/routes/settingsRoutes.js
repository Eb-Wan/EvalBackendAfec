const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/protectMiddleware");
const { validateSettings, validateRequest } = require("../middlewares/validationMiddleware");
const { getSettings, update, remove } = require("../controllers/settingsController");

router.get("/", authMiddleware, getSettings);
router.put("/", authMiddleware, validateSettings, validateRequest, update);
router.delete("/", authMiddleware, remove);

module.exports = router;
