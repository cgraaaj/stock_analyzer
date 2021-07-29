import axios from "axios";

const nse = axios.create({
  baseURL: process.env.REACT_APP_API_KEY
});


export const nseAPI = nse 