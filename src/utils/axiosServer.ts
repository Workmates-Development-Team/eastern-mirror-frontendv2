// src/utils/axiosServer.ts
import axios from "axios";

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1",
  timeout: 10000,
});

export default axiosServer;
