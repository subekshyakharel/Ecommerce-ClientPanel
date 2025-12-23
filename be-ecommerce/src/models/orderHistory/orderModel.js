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
