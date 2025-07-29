import api from "../services/api";

export const addOrderAPI = async (values) => {
  const response = await api.post(`order/addOrder`, values);
  console.log(response.data);
  return response.data;
};
export const getAllOrderAPI = async () => {
  const response = await api.get(`order/getOrder`);
  return response.data;
};

export const cancelOrderAPI = async (id) => {
  console.log(id);
  const response = await api.put(`order/cancelOrder/${id}`);
  return response.data;
};
