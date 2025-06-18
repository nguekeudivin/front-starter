import axios, { AxiosHeaders, AxiosInstance } from "axios";
import { NextPageContext } from "next";
import { getToken } from "./token";

let httpInstance: AxiosInstance | undefined;

export const apiClient = (context?: NextPageContext): AxiosInstance => {
  if (httpInstance) {
    return httpInstance;
  }

  const headers = AxiosHeaders.from({
    Accept: "application/json",
  });

  if (context) {
    const token = getToken(context);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const instance = axios.create({
    headers,
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.com/api/",
  });

  const isDev = process.env.NODE_ENV !== "production";

  instance.interceptors.request.use((config) => {
    if (!config.headers.get("Authorization")) {
      const token = getToken();

      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return config;
  });

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      throw error;
    }
  );

  httpInstance = instance;

  return instance;
};
