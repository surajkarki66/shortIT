import axios from "axios";

const nodeEnv = "production";
const instance = axios.create({
  baseURL:
    nodeEnv === "production"
      ? "https://web-production-1f15.up.railway.app"
      : "http://localhost:5000",
  withCredentials: true,
});

export default instance;
