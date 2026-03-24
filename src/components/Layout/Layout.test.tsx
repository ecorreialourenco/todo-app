jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useNavigate: () => jest.fn(),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { Layout } from "./Layout";

const fakeUser = {
  id: "1",
  email: "test@a.com",
  username: "testuser",
  created_at: "2025-01-01",
};

describe("Layout", () => {
  it("renders children and header/footer", () => {
    render(
      <Layout onClick={() => {}} user={fakeUser}>
        <div data-testid="child">child content</div>
      </Layout>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Todo App")).toBeInTheDocument();
    expect(screen.getByText("footer")).toBeInTheDocument();
  });

  it("handles new task button click", () => {
    const onClick = jest.fn();
    render(
      <Layout onClick={onClick} user={fakeUser}>
        <div />
      </Layout>,
    );

    fireEvent.click(screen.getByText("New Task"));
    expect(onClick).toHaveBeenCalled();
  });
});
