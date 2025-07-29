import api from "../services/api";

export const getAllUsersAPI = async () => {
  const response = await api.get(`admin/AllUsers`);
  return response.data;
};
export const blockUserAPI = async (id) => {
  const response = await api.put(`admin/blockUser/${id}`);
  return response.data;
};
export const updateUserByAdminAPI = async (id, values) => {
  const response = await api.put(`admin/updateUserByAdmin/${id}`, values);
  return response.data;
};
export const getAllCountByAdminAPI = async () => {
  const response = await api.get(`admin/getAllCount`);
  return response.data;
};
export const getAllOrderAdminAPI = async (status) => {
  const response = await api.get(`admin/getAllOrder?status=${status}`);
  return response.data;
};
export const getAnalyticsAPI = async () => {
  const response = await api.get(`admin/analytics`);
  console.log(response.data);
  return response.data;
};
export const updateOrderAdminAPI = async (id) => {
  const response = await api.put(`admin/updateOrder/${id}`);
  return response.data;
};
