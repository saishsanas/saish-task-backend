import { Button, Card, CardBody, Progress, Spinner } from "@nextui-org/react";
import { List, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppProvider";

const TaskListScreen: React.FC = () => {
  const { state, api } = useAppContext();

  // Fetch task lists when the component mounts
  useEffect(() => {
    if (null == state.taskLists) {
      api.fetchTaskLists();
    }
  }, [state]);

  // Get a handle on the router
  const navigate = useNavigate();

  const handleCreateTaskList = () => {
    navigate("/new-task-list");
  };

  const handleSelectTaskList = (taskListId: string | undefined) => {
    navigate(`/task-lists/${taskListId}`);
    console.log(`Navigating to task list ${taskListId}`);
  };
if (state.taskLists === null) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="lg" />
    </div>
  );
}
  return (
    <div className="min-h-screen p-6 w-full max-w-5xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
     <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent drop-shadow-md">
       SaishTask
     </h1>
      <Button
        onPress={handleCreateTaskList}
        startContent={<Plus size={20} aria-hidden="true" />}
         className="w-full mb-6 py-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shadow-lg hover:brightness-110 hover:shadow-2xl transition-all duration-300"
        aria-label="Create New Task List"
      >
        Create New Task List
      </Button>
      {state.taskLists.length === 0 ? (
        <div className="text-center py-10 opacity-70">
          <p className="text-xl font-semibold mb-3">No Task Lists Found</p>
          <p className="text-sm mb-4">Create your first task list to get started 🚀</p>
          <Button
            onPress={handleCreateTaskList}
            startContent={<Plus size={20} />}
             className="mt-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white font-semibold shadow-md hover:brightness-110 hover:shadow-xl transition-all duration-300"
          >
            Create Task List
          </Button>
        </div>
      ) : (
        state.taskLists.map((list) => (
          <Card
            key={list.id}
            isPressable
            onPress={() => handleSelectTaskList(list.id)}
            className="mb-4 w-full rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <CardBody>
              <div className="flex items-center">
                <List size={20} className="mr-2 opacity-50" />
                <h2 className="text-lg font-bold">{list.title}</h2>
              </div>
              <p className="text-sm text-gray-500 mt-2">{list.count} tasks</p>
              <Progress
                value={list.progress ? list.progress * 100 : 0}
                className="mt-2"
              />
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default TaskListScreen;
