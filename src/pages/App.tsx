import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useSupabaseTasks } from "../hooks/useSupabaseTasks";
import { Task } from "../models/task.model";
import { StoreContext } from "../store/store";
import { Auth } from "./Auth";
import { Main } from "./Main";
import { Settings } from "./Settings";

export const App = () => {
  const { user, loading: authLoading } = useAuth();
  const { tasks, loading: tasksLoading, addTask, updateTaskStatus, deleteTask } = useSupabaseTasks(user);

  const value = {
    list: tasks,
    setList: (task: Task) => {
      addTask(task);
    },
  };

  if (authLoading || tasksLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-linear-to-r from-blue-600 to-cyan-500">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            user ? <Navigate to="/" replace /> : <Auth />
          }
        />

        <Route
          path="/"
          element={
            user ? (
              <StoreContext.Provider value={value}>
                <Main
                  user={user}
                  updateTaskStatus={updateTaskStatus}
                  deleteTask={deleteTask}
                />
              </StoreContext.Provider>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route
          path="/settings"
          element={
            user ? <Settings user={user} /> : <Navigate to="/auth" replace />
          }
        />

        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/auth"} replace />}
        />
      </Routes>
    </Router>
  );
};
