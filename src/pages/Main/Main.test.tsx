import { fireEvent, render, screen } from "@testing-library/react";
import { Main } from "./Main";
import { StoreContext } from "../../store/store";

jest.mock("../../components", () => ({
  Button: ({ label, onClick }: any) => <button onClick={onClick}>{label}</button>,
  Layout: ({ onClick, children }: any) => <div>{children}</div>,
}));

const fakeUser = {
  id: "123",
  email: "test@example.com",
  username: "testuser",
  created_at: new Date().toISOString(),
};

describe("Main", () => {
  it("Shows empty state and open/close modal", () => {
    const setList = jest.fn();

    render(
      <StoreContext.Provider value={{ list: [], setList }}>
        <Main user={fakeUser} updateTaskStatus={jest.fn()} deleteTask={jest.fn()} />
      </StoreContext.Provider>
    );

    expect(screen.getByText("You don't have any task yet.")).toBeInTheDocument();

    const addButton = screen.getByText("New Task");
    fireEvent.click(addButton);

    expect(screen.getByText("Task")).toBeInTheDocument();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Task")).toBeNull();
  });

  it("Submits task through setList", () => {
    const setList = jest.fn();

    render(
      <StoreContext.Provider value={{ list: [], setList }}>
        <Main user={fakeUser} updateTaskStatus={jest.fn()} deleteTask={jest.fn()} />
      </StoreContext.Provider>
    );

    fireEvent.click(screen.getByText("New Task"));

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "my new task" } });

    fireEvent.click(screen.getByText("Save"));

    expect(setList).toHaveBeenCalledWith({ task: "my new task", status: false });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
