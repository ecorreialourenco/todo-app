const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth } from "../../hooks/useAuth";
import { Login } from "./Login";

describe("Login", () => {
  it("renders form and submits login", async () => {
    const loginMock = jest.fn().mockResolvedValue({ id: "1" });
    (useAuth as jest.Mock).mockReturnValue({ login: loginMock, loading: false, error: null });

    render(<Login />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@a.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(loginMock).toHaveBeenCalledWith("a@a.com", "123456");
  });
});