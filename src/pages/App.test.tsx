import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("Render App", () => {
    render(<App />);

    expect(screen.getByText("Todo App")).toBeDefined();
  });
});
