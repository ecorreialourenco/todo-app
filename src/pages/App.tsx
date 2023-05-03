import { useState } from "react";
import { StoreContext } from "../store/store";
import { Task } from "../models/task.model";
import { Main } from "./Main";

export const App = () => {
  const [list, setList] = useState<Task[]>([]);

  return (
    <StoreContext.Provider value={{ list, setList }}>
      <Main />
    </StoreContext.Provider>
  );
};
