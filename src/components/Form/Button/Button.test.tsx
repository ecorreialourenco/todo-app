import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  const handleClick = jest.fn();

  const buttonProps = {
    label: "Test",
    className: "button-test",
    onClick: handleClick,
  };

  it("Render button", () => {
    render(
      <Button
        label={buttonProps.label}
        className={buttonProps.className}
        onClick={buttonProps.onClick}
      />
    );

    expect(screen.getByText(buttonProps.label)).toBeDefined();
  });

  it("Button click", () => {
    render(
      <Button
        label={buttonProps.label}
        className={buttonProps.className}
        onClick={buttonProps.onClick}
      />
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Button disable click", () => {
    render(
      <Button
        label={buttonProps.label}
        className={buttonProps.className}
        onClick={buttonProps.onClick}
        disabled={true}
      />
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
