import axios from "axios";

const instance = axios.create({
  baseURL: "https://shortit6.herokuapp.com",
  withCredentials: true,
});

export default instance;
