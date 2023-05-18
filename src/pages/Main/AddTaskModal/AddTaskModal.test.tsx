import { fireEvent, render, screen } from "@testing-library/react";
import { AddTaskModal } from "./AddTaskModal";

describe("AddTaskModal", () => {
  const setValue = jest.fn();
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  it("Render AddTaskModal", () => {
    render(
      <AddTaskModal
        value=""
        setValue={setValue}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByText("Task")).toBeDefined();
  });

  it("Change task value", () => {
    const { rerender } = render(
      <AddTaskModal
        value=""
        setValue={setValue}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "New task" } });

    rerender(
      <AddTaskModal
        value="New task"
        setValue={setValue}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    expect(setValue).toHaveBeenCalledTimes(1);
    expect(screen.getByDisplayValue("New task")).toBeDefined();
  });
});
