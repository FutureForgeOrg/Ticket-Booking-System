import instance from "../lib/axios.js";

// Get all payments
export const getAllPaymentsAdmin = async (filters) => {
  const response = await instance.get("/payment/all-payments", {
    params: filters,
  });

  
  return response.data;
};

// Get single payment
export const getPaymentDetailsAdmin = async (id) => {
  const response = await instance.get(`/payment/payment-details/${id}`);
  return response.data;
  
};

// Refund
export const refundPaymentAdmin = async (paymentId) => {
  const response = await instance.post("/payments/refund", {
    paymentId,
  });

  return response.data.success;
};

// Revenue
export const getRevenueStatsAdmin = async () => {
  const response = await instance.get("/payments/revenue");
  return response.data;
};