import { fireEvent, render, screen } from "@testing-library/react";
import { Main } from "./Main";

describe("Main", () => {
  it("Render Main", () => {
    render(<Main />);

    expect(screen.getByText("Todo App")).toBeDefined();
  });

  it("Open add task form and close", () => {
    render(<Main />);

    const addButtons = screen.getAllByText("New Task");
    const addButton = addButtons[1];
    fireEvent.click(addButton);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
  });

  it("Create task", () => {
    render(<Main />);

    const addButtons = screen.getAllByText("New Task");
    expect(addButtons.length).toBe(2);

    const addButton = addButtons[1];
    fireEvent.click(addButton);

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "This is the new task" } });

    const closeButton = screen.getByText("Save");
    fireEvent.click(closeButton);
  });
});
