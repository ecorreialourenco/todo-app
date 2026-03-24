import React, { useContext, useState } from "react";

import { List } from "../../components/List";
import { Status } from "../../enum/status.enum";
import { User } from "../../models/user.model";
import { StoreContext } from "../../store/store";
import { Button, Layout } from "../../components";
import { AddTaskModal } from "./AddTaskModal";

interface MainProps {
  user: User;
  updateTaskStatus: (taskId: string, status: Boolean) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const Main = ({ user, updateTaskStatus, deleteTask }: MainProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { list, setList } = useContext(StoreContext);
  const [task, setTask] = useState<string>("");

  const handleSubmit = () => {
    setIsModalOpen(false);
    setList({
      task,
      status: false,
    });
    setTask("");
  };

  return (
    <Layout onClick={() => setIsModalOpen(true)} user={user}>
      {list.length ? (
        <List 
          list={list} 
          onStatusChange={updateTaskStatus}
          onDelete={deleteTask}
        />
      ) : (
        <div className="grid w-full h-full">
          <div className="place-self-center	text-center	">
            <h2 className="text-xl font-extrabold text-cyan-500">
              You don't have any task yet.
            </h2>
            <h2 className="text-xl font-extrabold text-cyan-500">
              Create now!
            </h2>
            <Button
              label="New Task"
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-400 text-white"
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <AddTaskModal
          value={task}
          setValue={setTask}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </Layout>
  );
};
