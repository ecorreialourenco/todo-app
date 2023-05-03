import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  const handleChange = jest.fn();

  const inputProps = {
    label: "Test",
    name: "input-test",
    value: "",
    onChange: handleChange,
  };

  it("Render input", () => {
    render(
      <Input
        label={inputProps.label}
        name={inputProps.name}
        value={inputProps.value}
        onChange={inputProps.onChange}
      />
    );

    expect(screen.getByText(`${inputProps.label}:`)).toBeDefined();
  });

  it("Change input value", () => {
    const { rerender } = render(
      <Input
        label={inputProps.label}
        name={inputProps.name}
        value={inputProps.value}
        onChange={inputProps.onChange}
      />
    );

    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "23" } });

    rerender(
      <Input
        label={inputProps.label}
        name={inputProps.name}
        value={"23"}
        onChange={inputProps.onChange}
      />
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(screen.getByDisplayValue("23")).toBeDefined();
  });
});
