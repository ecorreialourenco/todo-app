import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../hooks/useAuth", () => ({
  useAuth: () => ({ logout: jest.fn() }),
}));

import { Header } from "./Header";

const fakeUser = {
  id: "1",
  email: "a@a.com",
  username: "user",
  created_at: "2025-01-01",
};

describe("Header", () => {
  it("renders with username and buttons", () => {
    render(
      <BrowserRouter>
        <Header onClick={() => {}} user={fakeUser} />
      </BrowserRouter>
    );

    expect(screen.getByText("Todo App")).toBeInTheDocument();
    expect(screen.getByText("@user")).toBeInTheDocument();
    expect(screen.getByTitle("Settings")).toBeInTheDocument();
    expect(screen.getByTitle("Logout")).toBeInTheDocument();
  });

  it("calls onClick New Task", () => {
    const onClick = jest.fn();
    render(
      <BrowserRouter>
        <Header onClick={onClick} user={fakeUser} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("New Task"));
    expect(onClick).toHaveBeenCalled();
  });
});