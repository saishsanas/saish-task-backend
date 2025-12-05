import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import TaskList from "./domain/TaskList";
import Task from "./domain/Task";

// BACKEND BASE URL
const API_BASE_URL = "https://saish-task-backend-production.up.railway.app/api";

interface AppState {
  taskLists: TaskList[];
  tasks: { [taskListId: string]: Task[] };
}

type Action =
  | { type: "FETCH_TASKLISTS"; payload: TaskList[] }
  | { type: "CREATE_TASKLIST"; payload: TaskList }
  | { type: "FETCH_TASKS"; payload: { taskListId: string; tasks: Task[] } }
  | { type: "CREATE_TASK"; payload: { taskListId: string; task: Task } };

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "FETCH_TASKLISTS":
      return { ...state, taskLists: action.payload };
    case "CREATE_TASKLIST":
      return { ...state, taskLists: [...state.taskLists, action.payload] };
    default:
      return state;
  }
};

const initialState: AppState = {
  taskLists: [],
  tasks: {},
};

interface AppContextType {
  state: AppState;
  api: {
    fetchTaskLists: () => Promise<void>;
    createTaskList: (taskList: Omit<TaskList, "id">) => Promise<void>;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const jsonHeaders = {
    headers: { "Content-Type": "application/json" },
  };

  const api: AppContextType["api"] = {
    fetchTaskLists: async () => {
      const response = await axios.get<TaskList[]>(`${API_BASE_URL}/task-lists`, jsonHeaders);
      dispatch({ type: "FETCH_TASKLISTS", payload: response.data });
    },
    createTaskList: async (taskList) => {
      const response = await axios.post<TaskList>(
        `${API_BASE_URL}/task-lists`,
        taskList,
        jsonHeaders
      );
      dispatch({ type: "CREATE_TASKLIST", payload: response.data });
    },
  };

  useEffect(() => {
    api.fetchTaskLists();
  }, []);

  return <AppContext.Provider value={{ state, api }}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppProvider");
  return context;
};
