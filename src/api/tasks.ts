import { api } from "./axios";
import type { Task, TaskRequest, TaskStatusRequest } from "../types";

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },

  getById: async (id: string): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  create: async (data: TaskRequest): Promise<Task> => {
    const response = await api.post<Task>("/tasks", data);
    return response.data;
  },

  update: async (id: string, data: TaskRequest): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  updateStatus: async (id: string, data: TaskStatusRequest): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}/status`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
