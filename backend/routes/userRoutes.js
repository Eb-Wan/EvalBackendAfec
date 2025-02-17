const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/protectMiddleware");

const { validateRegister, validateRequest } = require("../middlewares/validatorMiddleware");

const { login, logout, register, update, remove, updateAdmin, removeAdmin } = require("../controllers/userController");

router.post("/login", login);
router.get("/logout", logout);
router.get("/", authMiddleware, isAdmin);
router.post("/", validateRegister, validateRequest, register);
router.put("/", authMiddleware, update);
router.delete("/", authMiddleware, remove);

router.put("/:id", authMiddleware, isAdmin, updateAdmin);
router.delete("/:id", authMiddleware, isAdmin, removeAdmin);

module.exports = router;