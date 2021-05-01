import axios from "axios";

const instance = axios.create({
  baseURL: "https://shortit6.herokuapp.com" || "http://localhost:5000",
  withCredentials: true,
});

export default instance;
