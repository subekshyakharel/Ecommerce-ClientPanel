import express from "express";
import { userAuthMiddleware } from "../middlewares/authMiddlewares.js";
import {
  getSingleProductReviewsController,
  insertReviewController,
} from "../controllers/reviewController.js";
import { newReviewDataValidation } from "../middlewares/validation/reviewDataValidation.js";

const router = express.Router();

router.post(
  "/",
  userAuthMiddleware,
  newReviewDataValidation,
  insertReviewController
);

router.get("/:id", getSingleProductReviewsController);

export default router;
