const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { login, logout, register, update, remove } = require("../controllers/userController");

router.post("/login", login);
router.get("/logout", logout);
router.post("/", register);
router.put("/", authMiddleware, update);
router.delete("/", authMiddleware, remove);

module.exports = router;