import axios from "axios";
export const axiosClient = axios.create({
  baseURL: `https://coachingmanagement-production.up.railway.app/api/v1/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
