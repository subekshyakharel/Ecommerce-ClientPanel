import orderSchema from "./orderSchema.js";

export const createOrders = (orderOrg) => {
  return orderSchema.insertMany(orderOrg);
};

export const getOrder = (filter) => {
  return orderSchema.find(filter);
};

export const getAllOrders = () => {
  return orderSchema.find();
};

export const updateOrder = (_id, updateData) => {
  return orderSchema.findByIdAndUpdate(_id, updateData, { new: true });
};

export const deleteOrder = (id) => {
  return orderSchema.findByIdAndDelete(id);
};

export const getOrderWithReviews = () => {
  return orderSchema.find({ reviewId: { $exists: true, $ne: null } });
};
