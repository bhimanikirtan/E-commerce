import api from "../services/api";

export const addNewSletterAPI = async (email) => {
  console.log(email);
  const response = await api.post(`newSletter/addSletter`, email);
  return response.data;
};

export const getAllEmailsAPI = async () => {
  const response = await api.get(`newSletter/getEmails`);
  return response.data;
};
export const deleteEmailAPI = async (id) => {
  const response = await api.delete(`newSletter/deleteEmail/${id}`);
  return response.data;
};
export const sendNewsLetterAPI = async (values) => {
  console.log(values)
  const response = await api.post(`newSletter/sendNewsLetter`, values);
  return response.data;
};
