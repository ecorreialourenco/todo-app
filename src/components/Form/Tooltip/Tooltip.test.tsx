import { render, screen } from "@testing-library/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

describe("Tooltip", () => {
  const handleClick = jest.fn();

  const buttonProps = {
    label: "Test",
    className: "button-test",
    onClick: handleClick,
  };

  it("Render tooltip", () => {
    render(
      <Tooltip title="Tooltip title">
        <Button
          label={buttonProps.label}
          className={buttonProps.className}
          onClick={buttonProps.onClick}
        />
      </Tooltip>
    );

    expect(screen.getByText("Tooltip title")).toBeDefined();
  });
});
