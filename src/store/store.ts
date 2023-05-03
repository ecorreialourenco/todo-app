import { Dispatch, SetStateAction, createContext } from "react";
import { Task } from "../models/task.model";

export type StoreContextModel = {
  list: Task[];
  setList: Dispatch<SetStateAction<Task[]>>;
};

export const StoreContext = createContext<StoreContextModel>({
  list: [],
  setList: () => {},
});
