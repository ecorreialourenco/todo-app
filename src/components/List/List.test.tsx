import { /* fireEvent, */ render, screen } from "@testing-library/react";
import { List } from "./List";
import { Task } from "../../models/task.model";

describe("List", () => {
  const list: Task[] = [
    { date: "10/04/2023", status: 0, text: "task 1" },
    { date: "11/04/2023", status: 0, text: "task 2" },
    { date: "12/04/2023", status: 0, text: "task 3" },
  ];

  it("Render empty list", async () => {
    render(<List list={[]} />);

    const divElements = screen.queryByTestId("listItem");
    expect(divElements).toBeNull();
  });

  it("Render list", () => {
    render(<List list={list} />);

    const divElements = screen.getAllByTestId("listItem");
    expect(divElements.length).toBe(3);
  });

  /* it("Complete 2nd task", async () => {
    render(<List list={list} />);

    const divElements = screen.getAllByTestId("listItem");
    const buttons = await screen.findAllByRole("button")

    fireEvent.click(buttons[1])

  
  }); */
});
