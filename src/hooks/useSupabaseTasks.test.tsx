import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useSupabaseTasks } from "./useSupabaseTasks";

const fakeUser = { id: "1", email: "a@a.com", username: "t", created_at: "2025-01-01" };

const TestComponent = ({ user }: any) => {
  const { tasks, loading, addTask } = useSupabaseTasks(user);

  if (loading) return <div>Loading</div>;

  return (
    <div>
      <button onClick={() => addTask({ task: "new task", status: false })}>Add</button>
      <div data-testid="task-count">{tasks.length}</div>
      <div>{tasks.map((t) => <div key={t.id}>{t.task}</div>)}</div>
    </div>
  );
};

describe("useSupabaseTasks", () => {
  it("loads tasks when user is present", async () => {
    render(<TestComponent user={fakeUser} />);

    await waitFor(() => {
      const taskCount = screen.getByTestId("task-count");
      expect(taskCount).toBeInTheDocument();
    });
  });
});