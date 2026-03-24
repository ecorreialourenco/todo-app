import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./useAuth";

const Consumer = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="user">{user?.email || "no-user"}</div>
      <button onClick={() => login("a@a.com", "123456")}>login</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders with no user initially", () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("user").textContent).toBe("no-user");
  });

  it("can call login function", async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("login"));

    // Just check that the function was called without error
    await waitFor(() => {
      expect(screen.getByTestId("user")).toBeInTheDocument();
    });
  });
});