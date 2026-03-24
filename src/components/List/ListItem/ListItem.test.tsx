import { fireEvent, render, screen } from "@testing-library/react";
import { ListItem } from "./ListItem";
import { Task } from "../../../models/task.model";

describe("ListItem", () => {
  const task: Task = {
    task: "task 1",
    date: "2023-05-15",
    status: false,
  };

  jest.spyOn(Storage.prototype, "setItem");
  jest.spyOn(Storage.prototype, "getItem");

  const setLocalStorage = () => {
    window.localStorage.setItem("tasks", JSON.stringify([task]));
  };

  beforeEach(() => {
    setLocalStorage();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("Render ListItem", () => {
    render(<ListItem pos={0} item={task} />);

    expect(screen.getByText(task.task)).toBeDefined();
  });

  it("Toggle item status", async () => {
    const { rerender } = render(<ListItem pos={0} item={task} />);
    expect(screen.getByText("Complete")).toBeDefined();

    const completeButton = screen.getByRole("button");
    fireEvent.click(completeButton);

    rerender(<ListItem pos={0} item={{ ...task, status: true }} />);
    expect(screen.getByText("Delete")).toBeDefined();
    expect(screen.getByText("Recover")).toBeDefined();

    const otherButtons = screen.getAllByRole("button");
    expect(otherButtons.length).toBe(2);

    const restoreButton = screen.getAllByRole("button")[1];
    fireEvent.click(restoreButton);

    rerender(<ListItem pos={0} item={task} />);
    expect(screen.getByText("Complete")).toBeDefined();
  });

  it("Delete task", async () => {
    const { rerender } = render(<ListItem pos={0} item={task} />);
    expect(screen.getByText("Complete")).toBeDefined();

    const completeButton = screen.getByRole("button");
    fireEvent.click(completeButton);

    rerender(<ListItem pos={0} item={{ ...task, status: true }} />);
    expect(screen.getByText("Delete")).toBeDefined();

    const deleteButton = screen.getAllByRole("button")[0];
    fireEvent.click(deleteButton);
  });
});
