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
import { Signup } from "./Signup";

describe("Signup", () => {
  it("renders form and submits signup", async () => {
    const signupMock = jest.fn().mockResolvedValue({ id: "1" });
    (useAuth as jest.Mock).mockReturnValue({ signup: signupMock, loading: false, error: null });

    render(<Signup />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@a.com" } });
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "user" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    expect(signupMock).toHaveBeenCalledWith("a@a.com", "123456", "user");
  });
});