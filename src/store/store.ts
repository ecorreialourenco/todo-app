import { createContext } from "react";
import { Task } from "../models/task.model";

export type StoreContextModel = {
  list: Task[];
  setList: (task: Task) => void;
};

export const StoreContext = createContext<StoreContextModel>({
  list: [],
  setList: () => {},
});
