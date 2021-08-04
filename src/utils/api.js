import axios from "axios";

export const nseAPI = axios.create({
  baseURL: process.env.REACT_APP_NSE_API
});

export const ocAnalyzeAPI= axios.create({
  baseURL: process.env.REACT_APP_OCA_API
})