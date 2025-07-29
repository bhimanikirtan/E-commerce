import api from "../services/api";

export const loginUserAPI = async (values) => {
  const response = await api.post(`auth/login`, values);
  return response.data;
};
export const userDetailAPI = async () => {
  const response = await api.get(`auth/UserDetail`);
  return response.data;
};
export const registerUserAPI = async (values) => {
  const response = await api.post(`auth/register`, values);
  return response.data;
};
export const updateUserAPI = async (values) => {
  const response = await api.put(`auth/UserUpdate`, values);
  return response.data;
};
export const addAddressAPI = async (values) => {
  const response = await api.post(`address/addAddress`, values);
  return response.data;
};
export const getAddressAPI = async () => {
  const response = await api.get(`address/getAddress`);
  console.log(response);
  return response.data;
};
export const deleteAddressAPI = async (id) => {
  const response = await api.delete(`address/deleteAddress/${id}`);
  return response.data;
};
export const updateAddressAPI = async (id, values) => {
  const response = await api.put(`address/updateAddress/${id}`, values);
  return response.data;
};
export const setDefaultAddressAPI = async (id) => {
  const response = await api.put(`address/setDefaultAddress/${id}`);
  return response.data;
};
export const forgotPasswordAPI = async (email) => {
  console.log(email);
  const response = await api.post(`auth/forgotPassword`, email);
  return response.data;
};
export const resetPasswordAPI = async (values) => {
  console.log(values);
  const response = await api.post(`auth/resetPassword`, values);
  return response.data;
};
