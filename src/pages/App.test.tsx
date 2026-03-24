import { render, screen, waitFor } from "@testing-library/react";
import { App } from "./App";

jest.mock("./Auth", () => ({ Auth: () => <div>Auth Page</div> }));
jest.mock("./Main", () => ({ Main: () => <div>Main Page</div> }));
jest.mock("./Settings", () => ({ Settings: () => <div>Settings Page</div> }));

jest.mock("../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../hooks/useSupabaseTasks", () => ({
  useSupabaseTasks: jest.fn(),
}));

import { useAuth } from "../hooks/useAuth";
import { useSupabaseTasks } from "../hooks/useSupabaseTasks";

describe("App", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false, error: null });
    (useSupabaseTasks as jest.Mock).mockReturnValue({
      tasks: [],
      loading: false,
      addTask: jest.fn(),
      updateTaskStatus: jest.fn(),
      deleteTask: jest.fn(),
    });
  });

  it("Renders Auth page when not logged in", async () => {
    render(<App />);

    await waitFor(() => expect(screen.getByText("Auth Page")).toBeInTheDocument());
  });
});
