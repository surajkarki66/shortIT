import axios from "axios";

const nodeEnv = "development";
const instance = axios.create({
  baseURL:
    nodeEnv !== "development"
      ? "https://shortit-zme7.onrender.com"
      : "http://localhost:5000",
  withCredentials: true,
});

export default instance;
