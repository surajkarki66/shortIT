import axios from "axios";
let nodeEnv = "production";
const instance = axios.create({
  baseURL:
    nodeEnv === "production"
      ? "https://shortit6.herokuapp.com"
      : "http://localhost:5000",
  withCredentials: true,
});

export default instance;
