import axios from "axios";
import {
  getCookie,
  setCookie,
  removeCookie
} from "../../src/utils/cookieHandler";

export const API = axios.create({
  baseURL: "http://localhost:3333"
});

API.interceptors.request.use(config => {
  const token = sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tenta renovar o token usando o refresh token
        const refreshToken = getCookie("refreshToken");

        if (!refreshToken) {
          // Redireciona se não tiver refresh token
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const response = await axios.post("http://localhost:3333/refresh", {
          refreshToken
        });

        // Armazena o novo token
        sessionStorage.setItem("accessToken", response.data.accessToken);
        setCookie("refreshToken", response.data.refreshToken, { days: 7 }); // Se necessário

        // Repete a requisição original com o novo token
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Se falhar, limpa os tokens e redireciona
        sessionStorage.removeItem("accessToken");
        removeCookie("refreshToken");
        // Se falhar, redireciona para login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
