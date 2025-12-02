import axios from "axios";
import TaskList from "../domain/TaskList";

const API_BASE_URL = "http://localhost:8080/api/task-lists";

export const fetchTaskLists = () => axios.get(API_BASE_URL);

export const createTaskList = (taskList: TaskList) =>
axios.post(API_BASE_URL, taskList);
