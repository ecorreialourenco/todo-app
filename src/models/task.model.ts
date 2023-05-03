import { Status } from "../enum/status.enum";

export interface Task {
  text: string;
  date: string;
  completed?: string;
  status: Status;
}
