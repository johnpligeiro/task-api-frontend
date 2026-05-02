import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { extractErrorMessage } from "../api/axios";
import type { LoginRequest, RegisterRequest } from "../types";

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      setAuth(response.accessToken, response.user);
      toast.success(`Bem-vindo, ${response.user.name}!`);
      navigate("/tasks");
    },
    onError: (error: unknown) => {
      toast.error(extractErrorMessage(error));
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      setAuth(response.accessToken, response.user);
      toast.success("Conta criada com sucesso!");
      navigate("/tasks");
    },
    onError: (error: unknown) => {
      toast.error(extractErrorMessage(error));
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return () => {
    clearAuth();
    toast.success("Sessão encerrada.");
    navigate("/login");
  };
}
