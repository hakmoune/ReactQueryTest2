import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com"
});

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const deleteProduct = async ({ id }) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export default api;
