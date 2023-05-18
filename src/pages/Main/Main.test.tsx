import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { Main } from "./Main";

describe("Main", () => {
  it("Render Main", () => {
    render(<Main />);

    expect(screen.getByText("Todo App")).toBeDefined();
  });

  it("Open add task form and close", () => {
    render(<Main />);

    const addButton = screen.getByText("New Task");
    fireEvent.click(addButton);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    console.log(prettyDOM());
  });

  it("Create task", () => {
    render(<Main />);

    const addButton = screen.getByText("New Task");
    fireEvent.click(addButton);

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "This is the new task" } });

    const closeButton = screen.getByText("Save");
    fireEvent.click(closeButton);
  });
});
