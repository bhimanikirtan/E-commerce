import api from "../services/api";

export const addVendorDetailsAPI = async (values) => {
  const response = await api.post(`vendor/addVendorDetails`, values);
  return response.data;
};
