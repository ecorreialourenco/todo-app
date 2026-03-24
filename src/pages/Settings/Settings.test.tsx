const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAuth } from "../../hooks/useAuth";
import { Settings } from "./Settings";

const fakeUser = {
  id: "1",
  email: "a@a.com",
  username: "user",
  created_at: "2025-01-01",
};

describe("Settings", () => {
  it("renders settings page", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: fakeUser,
      loading: false,
      error: null,
      logout: jest.fn(),
      updateUsername: jest.fn(),
      updatePassword: jest.fn(),
    });

    render(<Settings user={fakeUser} />);

    expect(screen.getByText("Definitions")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /change username/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /change password/i }),
    ).toBeInTheDocument();
  });

  it("updates username", async () => {
    const updateUsername = jest.fn().mockResolvedValue(true);
    (useAuth as jest.Mock).mockReturnValue({
      user: fakeUser,
      loading: false,
      error: null,
      logout: jest.fn(),
      updateUsername,
      updatePassword: jest.fn(),
    });

    render(<Settings user={fakeUser} />);

    fireEvent.click(screen.getByRole("button", { name: /change username/i }));
    fireEvent.change(screen.getByLabelText("New username"), {
      target: { value: "newuser" },
    });
    fireEvent.click(screen.getByRole("button", { name: /update username/i }));

    await waitFor(() => expect(updateUsername).toHaveBeenCalledWith("newuser"));
  });

  it("updates password", async () => {
    const updatePassword = jest.fn().mockResolvedValue(true);
    (useAuth as jest.Mock).mockReturnValue({
      user: fakeUser,
      loading: false,
      error: null,
      logout: jest.fn(),
      updateUsername: jest.fn(),
      updatePassword,
    });

    render(<Settings user={fakeUser} />);

    // Click password tab to switch tabs
    const allButtons = screen.getAllByRole("button");
    // Find the tab button (second button with "Change password", not form submit)
    let passwordTabButton = null;
    for (let btn of allButtons) {
      if (btn.textContent.includes("Change password") && !btn.closest("form")) {
        passwordTabButton = btn;
        break;
      }
    }
    if (passwordTabButton) {
      fireEvent.click(passwordTabButton);
    }

    fireEvent.change(screen.getByLabelText("Current password"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("New password"), {
      target: { value: "654321" },
    });
    fireEvent.change(screen.getByLabelText("Confirm password"), {
      target: { value: "654321" },
    });

    // Click the submit button (which also says "Change password")
    const buttons = screen.getAllByRole("button", { name: /change password/i });
    const submitButton = buttons[buttons.length - 1]; // Click the last button with "change password"
    fireEvent.click(submitButton);

    await waitFor(() => expect(updatePassword).toHaveBeenCalledWith("654321"));
  });
});
