import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "#/auth/auth-store";
import { refreshAccessToken } from "#/features/qr-auth/api/refresh.api";

export const api = axios.create({
  baseURL: "http://192.168.1.9:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = useAuthStore.getState().refreshToken;

    if (!refreshToken) {
      useAuthStore.getState().clearAuth();

      return Promise.reject(error);
    }

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken(refreshToken)
          .then((tokens) => {
            useAuthStore
              .getState()
              .setTokens(tokens.accessToken, tokens.refreshToken);

            return tokens.accessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearAuth();

      return Promise.reject(refreshError);
    }
  },
);
