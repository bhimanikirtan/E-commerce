import api from "../services/api";

export const paymentAPI = async ({ orderId }) => {
  console.log(orderId);
  const response = await api.post("/payment/sendPayment", { orderId });
  console.log(response);
  return response;
};
export const handleSubscriptionAPI = async ({ subscribId, userId }) => {
  console.log(subscribId);
  const response = await api.post("/payment/handleSubscription", {
    subscribId,
    userId,
  });
  console.log(response);
  return response;
};
