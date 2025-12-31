import express from "express";
import { userAuthMiddleware } from "../middlewares/authMiddlewares.js";
import {
  deleteOrderController,
  getAllOrderController,
  getOrderController,
  getOrderWithReviewsController,
  inserNewOrder,
  updateOrderController,
} from "../controllers/orderController.js";
import { newOrderDataValidation } from "../middlewares/validation/orderDataValidation.js";
const router = express.Router();

router.post("/", userAuthMiddleware, newOrderDataValidation, inserNewOrder);

router.get("/", userAuthMiddleware, getOrderController);

router.get("/all-order", getAllOrderController);

router.patch("/:id", updateOrderController);

router.delete("/:id", userAuthMiddleware, deleteOrderController);

router.get("/getProductReview", getOrderWithReviewsController);
export default router;
