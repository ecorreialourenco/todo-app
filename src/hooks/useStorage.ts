import { useContext, useEffect } from "react";
import { Status } from "../enum/status.enum";
import { Task } from "../models/task.model";
import { StoreContext } from "../store/store";

export const useStorage = () => {
  const { setList: setTaskList, list } = useContext(StoreContext);
  useEffect(() => {
    const taskItems = getList();

    if (JSON.stringify(list) !== JSON.stringify(taskItems)) {
      setTaskList(taskItems);
    }
  }, [setTaskList, list]);

  const getList = () => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  };

  const setList = (newTask: Task) => {
    let currentTasks: Task[] = [...getList()];
    currentTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(currentTasks));

    setTaskList(currentTasks);
  };

  const changeTaskStatus = (idx: number, status: Status) => {
    let currentTasks: Task[] = [...getList()];
    currentTasks[idx].status = status;
    localStorage.setItem("tasks", JSON.stringify(currentTasks));

    setTaskList(currentTasks);
  };

  const deleteTask = (idx: number) => {
    let currentTasks: Task[] = [...getList()];
    currentTasks.splice(idx, 1);
    localStorage.setItem("tasks", JSON.stringify(currentTasks));

    setTaskList(currentTasks);
  };

  return { getList, setList, changeTaskStatus, deleteTask };
};
