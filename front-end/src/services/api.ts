import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { DestroyCookies } from "../contexts/AuthContext";

let cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    Authorization: `Bearer ${cookies["ventura.token"]}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status == 401) {
      DestroyCookies();
    }
  }
);
