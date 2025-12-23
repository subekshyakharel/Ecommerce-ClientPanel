import express from "express";
import { userAuthMiddleware } from "../middlewares/authMiddlewares.js";
import {
  getAllOrderController,
  getOrderController,
  inserNewOrder,
} from "../controllers/orderController.js";
import { newOrderDataValidation } from "../middlewares/validation/orderDataValidation.js";
const router = express.Router();

router.post("/", userAuthMiddleware, newOrderDataValidation, inserNewOrder);

router.get("/", userAuthMiddleware, getOrderController);

router.get("/all-order", getAllOrderController);
export default router;
