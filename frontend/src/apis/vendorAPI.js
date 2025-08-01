import api from "../services/api";

export const addVendorDetailsAPI = async (values) => {
  const response = await api.post(`vendor/addVendorDetails`, values);
  return response.data;
};

export const getVendorDetailsAPI = async () => {
  const response = await api.get(`vendor/getVendorDetails`);
  console.log(response);
  return response.data;
};
