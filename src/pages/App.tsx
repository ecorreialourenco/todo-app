import { useMemo, useState } from "react";
import { StoreContext } from "../store/store";
import { Task } from "../models/task.model";
import { Main } from "./Main";

export const App = () => {
  const [list, setList] = useState<Task[]>([]);
  const value = useMemo(() => {
    return {
      list,
      setList,
    };
  }, [list]);

  return (
    <StoreContext.Provider value={value}>
      <Main />
    </StoreContext.Provider>
  );
};
