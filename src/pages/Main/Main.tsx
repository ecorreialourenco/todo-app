import React, { useContext, useState } from "react";
import { AddTaskModal } from "./AddTaskModal";
import { List } from "../../components/List";
import { Button, Layout } from "../../components";
import { useStorage } from "../../hooks/useStorage";
import { Status } from "../../enum/status.enum";
import { StoreContext } from "../../store/store";

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setList } = useStorage();
  const { list } = useContext(StoreContext);
  const [task, setTask] = useState<string>("");

  const handleSubmit = () => {
    setIsModalOpen(false);
    setList({
      text: task,
      date: new Date().toLocaleDateString(),
      status: Status.Created,
    });
    setTask("");
  };

  return (
    <Layout onClick={() => setIsModalOpen(true)}>
      {list.length ? (
        <List list={list} />
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
