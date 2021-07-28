import axios from "axios";

const nse = axios.create({
  baseURL: "http://localhost:1234"
});


export const nseAPI = nse 