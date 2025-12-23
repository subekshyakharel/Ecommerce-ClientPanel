import express from "express";
import {
  insertNewUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import {
  renewAccessJWTMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddlewares.js";
const router = express.Router();

//
router.post("/register", insertNewUser);
router.post("/login", loginUser);
router.get("/renew-jwt", renewAccessJWTMiddleware);
router.get("logout", userAuthMiddleware, logoutUser);

export default router;
