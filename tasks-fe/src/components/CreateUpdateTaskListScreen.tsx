import React, { useEffect, useState } from "react";
import { Button, Input, Textarea, Spacer, Card } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../AppProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateUpdateTaskListScreen: React.FC = () => {
  const { state, api } = useAppContext();
  const { listId } = useParams();

  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string | undefined>("");

  const navigate = useNavigate();

  const findTaskList = (taskListId: string) => {
    const filteredTaskLists = state.taskLists.filter((tl) => taskListId == tl.id);
    return filteredTaskLists.length === 1 ? filteredTaskLists[0] : null;
  };

  const populateTaskList = (taskListId: string) => {
    const taskList = findTaskList(taskListId);
    if (taskList) {
      setTitle(taskList.title);
      setDescription(taskList.description);
      setIsUpdate(true);
    }
  };

  useEffect(() => {
    if (listId) {
      if (!state.taskLists) {
        api.fetchTaskLists().then(() => populateTaskList(listId));
      } else {
        populateTaskList(listId);
      }
    }
  }, [listId]);

  const createUpdateTaskList = async () => {
    try {
      if (isUpdate && listId) {
        await api.updateTaskList(listId, {
          id: listId,
          title,
          description,
          count: undefined,
          progress: undefined,
          tasks: undefined,
        });
      } else {
        await api.createTaskList({
          title,
          description,
          count: undefined,
          progress: undefined,
          tasks: undefined,
        });
      }

      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-md mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">

        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="flat"
            className="rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300"
            onClick={() => navigate("/")}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </Button>

          <h1 className="text-2xl font-bold">
            {isUpdate ? "Update Task List" : "Create Task List"}
          </h1>
        </div>

        {error.length > 0 && (
          <Card className="mb-4 p-4 bg-red-600/30 border border-red-500 text-red-300 rounded-xl">
            {error}
          </Card>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Title"
            placeholder="Enter task list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />

          <Spacer y={1} />

          <Textarea
            label="Description"
            placeholder="Enter task list description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

          <Spacer y={1} />

          <Button
            type="submit"
            fullWidth
            onClick={createUpdateTaskList}
            className="mt-4 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shadow-lg hover:brightness-110 hover:shadow-2xl transition-all duration-300"
          >
            {isUpdate ? "Update Task List" : "Create Task List"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateUpdateTaskListScreen;
