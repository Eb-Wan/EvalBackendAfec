const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/protectMiddleware");
const multer = require("multer");

const upload = multer({ dest: "../uploads/" });

const { create, getSkills, update, remove } = require("../controllers/skillController");
const { validateSkill, validateRequest } = require("../middlewares/validatorMiddleware");

router.get("/:name", getSkills);
router.post("/", authMiddleware, isAdmin, upload.single("image"), validateSkill, validateRequest, create);
router.put("/:id", authMiddleware, isAdmin, upload.single("image"), validateSkill, validateRequest, update);
router.delete("/:id", authMiddleware, isAdmin, remove);

module.exports = router;