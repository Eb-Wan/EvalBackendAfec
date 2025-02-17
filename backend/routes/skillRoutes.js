const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/protectMiddleware");
const multer = require("multer");

const upload = multer({ dest: "../uploads/" });

const { create, getSkills, update, remove } = require("../controllers/skillController");
const { validateSkill, validateRequest } = require("../middlewares/validatorMiddleware");

router.get("/", authMiddleware, getSkills);
router.post("/", authMiddleware, upload.single("image"), validateSkill, validateRequest, create);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

module.exports = router;