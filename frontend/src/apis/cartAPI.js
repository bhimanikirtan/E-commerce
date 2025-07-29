import api from "../services/api";

export const addToCartAPI = async (values) => {
  const response = await api.post(`cart/add`, values);
  return response.data;
};
export const getAllCartAPI = async () => {
  const response = await api.get(`cart/get`);
  return response.data;
};
export const removeFromCartAPI = async (id) => {
  const response = await api.delete(`cart/delete/${id}`);
  return response.data;
};
export const clearCartAPI = async () => {
  const response = await api.delete(`cart/clear`);
  return response.data;
};
export const plusAPI = async (id) => {
  const response = await api.get(`cart/plus/${id}`);
  return response.data;
};
export const minusAPI = async (id) => {
  const response = await api.get(`cart/minus/${id}`);
  return response.data;
};
