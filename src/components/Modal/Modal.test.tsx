import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
  const handleClick = jest.fn();

  it("Render modal", () => {
    render(
      <Modal title="Modal title" onClose={handleClick} onSubmit={handleClick}>
        Modal
      </Modal>
    );

    expect(screen.getByText("Modal title")).toBeDefined();
  });

  it("Click to save", async () => {
    render(
      <Modal title="Modal title" onClose={handleClick} onSubmit={handleClick}>
        Modal
      </Modal>
    );

    const button = await screen.findByRole("button", { name: "Save" });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Try to save with disable button", async () => {
    render(
      <Modal
        title="Modal title"
        onClose={handleClick}
        onSubmit={handleClick}
        disabled={true}
      >
        Modal
      </Modal>
    );

    const button = await screen.findByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
  });
});
