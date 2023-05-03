import { fireEvent, render, screen } from "@testing-library/react";
import { IconButton } from "./IconButton";
import { BsTrash } from "react-icons/bs";

describe("IconButton", () => {
  const handleClick = jest.fn();

  it("Render button", () => {
    render(<IconButton icon={<BsTrash />} onClick={handleClick} />);

    expect(screen.getByRole("button")).toBeDefined();
  });

  it("IconButton click", () => {
    render(<IconButton icon={<BsTrash />} onClick={handleClick} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
