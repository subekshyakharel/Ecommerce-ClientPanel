import {
  createOrders,
  deleteOrder,
  getAllOrders,
  getOrder,
  getOrderWithReviews,
  updateOrder,
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

// export const updateOrderController = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     const updated = await updateOrder(id, { status });

//     updated?._id
//       ? responseClient({
//           req,
//           res,
//           message: "The Order has been updated successfully!",
//           payload: updated,
//         })
//       : responseClient({
//           req,
//           res,
//           message:
//             "Unable to update the order in the database, try again later.",
//           statusCode: 400,
//         });
//   } catch (error) {
//     next(error);
//   }
// };

export const updateOrderController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Define fields that are allowed to be updated
    const allowedFields = ["status"];
    const dataToUpdate = {};

    // Pick only allowed fields from req.body
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        dataToUpdate[field] = req.body[field];
      }
    });

    // If no valid fields are provided, return error
    if (Object.keys(dataToUpdate).length === 0) {
      return responseClient({
        req,
        res,
        message: "No valid fields provided to update.",
        statusCode: 400,
      });
    }

    // Update the order
    const updated = await updateOrder(id, dataToUpdate);

    // Check if order exists and was updated
    if (!updated) {
      return responseClient({
        req,
        res,
        message: "Order not found or cannot be updated.",
        statusCode: 404,
      });
    }

    // Success response
    return responseClient({
      req,
      res,
      message: "Order updated successfully!",
      payload: updated,
    });
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};

export const deleteOrderController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteOrder(id);

    deletedProduct?._id
      ? responseClient({
          req,
          res,
          message: "The order has been cancelled",
          payload: deletedProduct,
        })
      : responseClient({ req, res, message: "Unable to cancel the order" });
  } catch (error) {
    next(error);
  }
};

export const getOrderWithReviewsController = async (req, res, next) => {
  try {
    const result = await getOrderWithReviews();

    result
      ? responseClient({
          req,
          res,
          message: "Here are the product reviews",
          payload: result,
        })
      : responseClient({ req, res, message: "Unable to get the reviews" });
  } catch (error) {
    next(error);
  }
};
