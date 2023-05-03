import React, { useContext, useState } from "react";
import { AddTaskModal } from "./AddTaskModal";
import { List } from "../../components/List";
import { Layout } from "../../components";
import { useStorage } from "../../hooks/useStorage";
import { Status } from "../../enum/status.enum";
import { StoreContext } from "../../store/store";

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setList } = useStorage();
  const { list } = useContext(StoreContext);
  const [task, setTask] = useState<string>("");

  const handleSubmit = () => {
    console.log("🚀 ~ file: Main.tsx:24 ~ handleSubmit ~ handleSubmit:")
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
      <List list={list} />

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
