import api from "../services/api";

export const addWishlistAPI = async (id) => {
    console.log(id)
    const response = await api.post(`wishList/addWishlist/${id}`);
    return response.data;
}
export const getUserWishlistAPI = async () => {
    // console.log(id)
    const response = await api.get(`wishList/getWishlist`);
    return response.data;
}
export const deleteUserWishlistAPI = async (id) => {
    console.log(id)
    const response = await api.delete(`wishList/deleteWishlist/${id}`);
    return response.data;
}