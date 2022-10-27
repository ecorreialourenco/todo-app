import { fireEvent, render } from "@testing-library/react";
import TaskItem from "./TaskItem";

describe("TaskItem", () => {
  it("Render TaskItem", () => {
    const item = {
      value: "Test task",
      completed: false,
    };
    const component = render(
      <TaskItem
        item={item}
        onRemove={() => console.log("remove")}
        onComplete={() => console.log("complete")}
        onReset={() => console.log("reset")}
      />
    );
    expect(component.getByText(item.value)).toBeDefined();
  });

  it("Complete TaskItem", () => {
    const completeTaskSpy = jest.fn();

    const item = {
      value: "Test task",
      completed: false,
    };

    const component = render(
      <TaskItem
        item={item}
        onRemove={() => console.log("remove")}
        onComplete={completeTaskSpy}
        onReset={() => console.log("reset")}
      />
    );

    fireEvent.click(component.baseElement.querySelector("button"));

    expect(completeTaskSpy).toBeCalled();
  });

  it("Restore completed TaskItem", () => {
    const restoreTaskSpy = jest.fn();

    const item = {
      value: "Test task",
      completed: true,
    };

    const component = render(
      <TaskItem
        item={item}
        onRemove={() => console.log("remove")}
        onComplete={() => console.log("complete")}
        onReset={restoreTaskSpy}
      />
    );

    const buttons = component.baseElement.querySelectorAll("button");
    const resetButton = buttons[1];

    fireEvent.click(resetButton);

    expect(restoreTaskSpy).toBeCalled();
  });

  it("Deleted completed TaskItem", () => {
    const deleteTaskSpy = jest.fn();

    const item = {
      value: "Test task",
      completed: true,
    };

    const component = render(
      <TaskItem
        item={item}
        onRemove={deleteTaskSpy}
        onComplete={() => console.log("complete")}
        onReset={() => console.log("reset")}
      />
    );

    const buttons = component.baseElement.querySelectorAll("button");
    const deleteButton = buttons[0];

    fireEvent.click(deleteButton);

    expect(deleteTaskSpy).toBeCalled();
  });
});
