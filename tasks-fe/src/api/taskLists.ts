import axios from "axios";

const API_BASE_URL =
  "https://saish-task-backend-production.up.railway.app/api/task-lists";

export const fetchTaskLists = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createTaskList = async (dto: any) => {
  const response = await axios.post(API_BASE_URL, dto);
  return response.data;
};
