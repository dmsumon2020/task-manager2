import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const API_URL = "http://localhost:5000/api/tasks";

export const useTasks = () => {
  return useQuery("tasks", async () => {
    const { data } = await axios.get(API_URL);
    return data;
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation((task) => axios.post(API_URL, task), {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation((task) => axios.put(`${API_URL}/${task.id}`, task), {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => axios.delete(`${API_URL}/${id}`), {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });
};
