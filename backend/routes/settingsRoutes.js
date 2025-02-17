const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/protectMiddleware");

const { getSettings, update, remove } = require("../controllers/settingsController");

router.get("/", authMiddleware, getSettings);
router.put("/", authMiddleware, update);
router.delete("/", authMiddleware, remove);

module.exports = router;