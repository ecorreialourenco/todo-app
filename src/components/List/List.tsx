import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "../../models/task.model";
import { ListHeader } from "./ListHeader";
import { ListItem } from "./ListItem";

interface ListProps {
  list: Task[];
  onStatusChange?: (taskId: string, status: Boolean) => void;
  onDelete?: (taskId: string) => void;
}

export const List: FC<ListProps> = ({ list, onStatusChange, onDelete }) => (
  <>
    <ListHeader />
    {list.map((item: Task, idx: number) => (
      <ListItem 
        key={uuidv4()} 
        pos={idx} 
        item={item} 
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    ))}
  </>
);
