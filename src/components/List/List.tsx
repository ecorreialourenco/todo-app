import { FC } from "react";
import { ListHeader } from "./ListHeader";
import { Task } from "../../models/task.model";
import { ListItem } from "./ListItem";

interface ListProps {
  list: Task[];
}

export const List: FC<ListProps> = ({ list }) => {
  return (
    <>
      <ListHeader />
      {list.map((item: Task, idx: number) => (
        <ListItem key={idx} pos={idx} item={item} />
      ))}
    </>
  );
};
