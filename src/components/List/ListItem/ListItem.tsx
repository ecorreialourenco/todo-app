import { FC } from "react";
import { Task } from "../../../models/task.model";
import { BsTrash, BsCheck, BsRecycle } from "react-icons/bs";
import { IconButton, Tooltip } from "../../Form";
import { Status } from "../../../enum/status.enum";
import { useStorage } from "../../../hooks/useStorage";

interface ListItemProps {
  pos: number;
  item: Task;
}

export const ListItem: FC<ListItemProps> = ({
  pos,
  item: { text, date, status },
}) => {
  const { changeTaskStatus, deleteTask } = useStorage();

  return (
    <div
      data-testid="listItem"
      className="flex p-2 odd:bg-white even:bg-slate-50 "
    >
      <div className="block w-[64px]">#{pos + 1}</div>
      <div className="block w-[100px]">{date}</div>
      <div
        className={`block w-[calc(100%-274px)] ${
          status === Status.Completed && "line-through"
        }`}
      >
        {text}
      </div>
      <div className="block w-[110px] justify-content-end flex">
        {status === Status.Completed ? (
          <>
            <Tooltip title="Delete">
              <IconButton
                icon={<BsTrash />}
                className="bg-red-500 text-white"
                onClick={() => deleteTask(pos)}
              />
            </Tooltip>
            <Tooltip title="Recover">
              <IconButton
                icon={<BsRecycle />}
                className="bg-blue-200"
                onClick={() => changeTaskStatus(pos, Status.Created)}
              />
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Complete">
            <IconButton
              icon={<BsCheck />}
              className="bg-cyan-500 text-white"
              onClick={() => changeTaskStatus(pos, Status.Completed)}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};
