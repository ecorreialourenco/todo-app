import { FC } from "react";

export const ListHeader: FC = () => (
  <div className="flex bg-slate-300 w-full p-2">
    <div className="block w-[64px]">Task</div>
    <div className="block w-[100px]">Date</div>
    <div className="block w-[calc(100%-274px)]">Task</div>
    <div className="block w-[110px]">Actions</div>
  </div>
);
