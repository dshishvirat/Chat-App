import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  getOtherUsers,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, getMe);
router.get("/", isAuthenticated, getOtherUsers);

export default router;
