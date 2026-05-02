import { api } from "./axios";
import type { User, UserRoleRequest, UserUpdateRequest } from "../types";

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  update: async (id: string, data: UserUpdateRequest): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  updateRole: async (id: string, data: UserRoleRequest): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}/role`, data);
    return response.data;
  },
};
