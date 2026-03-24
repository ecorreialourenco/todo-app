jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  MemoryRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useNavigate: () => jest.fn(),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { Auth } from "./Auth";

describe("Auth", () => {
  it("render login by default and toggle to signup", () => {
    render(<Auth />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Create account")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Create account"));
    expect(screen.getByText("Create account")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Login your account"));
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});