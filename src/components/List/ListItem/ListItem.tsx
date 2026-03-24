import { FC } from "react";
import { BsTrash, BsCheck, BsRecycle } from "react-icons/bs";

import { Task } from "../../../models/task.model";
import { IconButton, Tooltip } from "../../Form";

interface ListItemProps {
  pos: number;
  item: Task;
  onStatusChange?: (taskId: string, status: Boolean) => void;
  onDelete?: (taskId: string) => void;
}

export const ListItem: FC<ListItemProps> = ({
  pos,
  item: { id, task, status },
  onStatusChange,
  onDelete,
}) => {
  const handleStatusChange = (newStatus: Boolean) => {
    if (id && onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };

  const handleDelete = () => {
    if (id && onDelete) {
      onDelete(id);
    }
  };

  return (
    <div
      data-testid="listItem"
      className="flex p-2 odd:bg-white even:bg-slate-50 "
    >
      <div className="block w-16">#{pos + 1}</div>
      <div
        className={`block w-[calc(100%-274px)] ${
          status && "line-through"
        }`}
      >
        {task}
      </div>
      <div className="w-27.5 justify-content-end flex">
        {status ? (
          <>
            <Tooltip title="Delete">
              <IconButton
                icon={BsTrash}
                className="bg-red-500 text-white"
                onClick={handleDelete}
              />
            </Tooltip>
            <Tooltip title="Recover">
              <IconButton
                icon={BsRecycle}
                className="bg-blue-200"
                onClick={() => handleStatusChange(false)}
              />
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Complete">
            <IconButton
              icon={BsCheck}
              className="bg-cyan-500 text-white"
              onClick={() => handleStatusChange(true)}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};
