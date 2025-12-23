import {
  createOrders,
  getAllOrders,
  getOrder,
} from "../models/orderHistory/orderModel.js";
import { responseClient } from "../middlewares/responseClient.js";

export const inserNewOrder = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    req.body = req.body.map((product) => {
      return {
        ...product,
        orderNumber: Math.floor(1000000000 + Math.random() * 9000000000),
        userId: _id,
      };
    });

    const order = await createOrders(req.body);
    order.length
      ? responseClient({
          req,
          res,
          message: "The order has been placed successfully!",
          payload: order,
        })
      : responseClient({
          req,
          res,
          message: "Unable to add peoduct!",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};

export const getOrderController = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const orders = await getOrder({ userId: _id });
    responseClient({
      req,
      res,
      message: "Here is the order list",
      payload: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrderController = async (req, res, next) => {
  try {
    const orders = await getAllOrders();

    orders
      ? responseClient({
          req,
          res,
          message: "Here are the all orders!",
          payload: orders,
        })
      : responseClient({
          req,
          res,
          message: "Unable to get all Orders",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};
