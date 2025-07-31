import api from "../services/api";

export const paymentAPI = async ({ orderId }) => {
  console.log(orderId);
  const response = await api.post("/payment/sendPayment", { orderId });
  console.log(response);
  return response;
};
export const invoiceAPI = async (session_id) => {
  const response = await api.get(`/payment/invoice_download/${session_id}`, {
    responseType: "blob", // << IMPORTANT
  });
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
