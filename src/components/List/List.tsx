import { FC } from "react";
import { ListHeader } from "./ListHeader";
import { Task } from "../../models/task.model";
import { ListItem } from "./ListItem";
import { v4 as uuidv4 } from "uuid";

interface ListProps {
  list: Task[];
}

export const List: FC<ListProps> = ({ list }) => (
  <>
    <ListHeader />
    {list.map((item: Task, idx: number) => (
      <ListItem key={uuidv4()} pos={idx} item={item} />
    ))}
  </>
);
