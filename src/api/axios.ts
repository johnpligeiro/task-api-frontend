import axios, { AxiosError } from "axios";
import type { ApiError } from "../types";

const TOKEN_KEY = "task_api_token";

export const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Inject JWT token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — clear session and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("task_api_user");
      // Redirect without react-router to avoid circular deps
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError | undefined;
    if (data?.message) return data.message;
    if (data?.details && data.details.length > 0) {
      return data.details.join(", ");
    }
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
}

export { TOKEN_KEY };
