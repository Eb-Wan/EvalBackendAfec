const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "../uploads/" });

const { create, getSkills, update, remove } = require("../controllers/skillController");

router.get("/", authMiddleware, getSkills);
router.post("/", authMiddleware, upload.single("image"), create);
router.put("/", authMiddleware, update);
router.delete("/", authMiddleware, remove);

module.exports = router;