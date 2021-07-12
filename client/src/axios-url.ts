import axios from "axios";
let nodeEnv = "development";
const instance = axios.create({
  baseURL:
    nodeEnv === "production"
      ? "https://shortit6.herokuapp.com"
      : "http://localhost:5000",
  withCredentials: true,
});

export default instance;
