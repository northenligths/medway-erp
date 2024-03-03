import axios from "axios";
export const axiosClient = axios.create({
  baseURL: `https://coaching-management-4.onrender.com/api/v1/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
