import { act, fireEvent, render, waitFor } from "@testing-library/react";
import TooltipButton from "./TooltipButton";
import { FaTrashAlt } from "react-icons/fa";

describe("TooltipButton", () => {
  it("Render TooltipButton", () => {
    const component = render(
      <TooltipButton
        variant="outline-danger"
        onClick={() => console.log("remove")}
        tooltip="Remove"
      >
        <FaTrashAlt />
      </TooltipButton>
    );

    fireEvent.mouseEnter(component.baseElement.querySelector("button"));

    waitFor(() => {}, { timeout: 1500 });
    expect(component.getByText("Remove")).toBeDefined();
  });
});
