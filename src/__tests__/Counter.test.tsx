import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Counter } from "../components/Counter";

describe("<Counter>", () => {
  it("renders the initial value", () => {
    render(<Counter initial={5} />);
    expect(screen.getByTestId("count")).toHaveTextContent("5");
  });

  it("increments when + is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("decrements when − is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter initial={3} />);

    await user.click(screen.getByRole("button", { name: "−" }));
    expect(screen.getByTestId("count")).toHaveTextContent("2");
  });

  it("respects max", async () => {
    const user = userEvent.setup();
    render(<Counter initial={9} max={10} />);

    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByTestId("count")).toHaveTextContent("10");

    const inc = screen.getByRole("button", { name: "+" });
    expect(inc).toBeDisabled();
  });

  it("respects min", async () => {
    const user = userEvent.setup();
    render(<Counter initial={1} min={0} />);

    await user.click(screen.getByRole("button", { name: "−" }));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByRole("button", { name: "−" })).toBeDisabled();
  });

  it("resets to initial", async () => {
    const user = userEvent.setup();
    render(<Counter initial={5} />);

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "reset" }));

    expect(screen.getByTestId("count")).toHaveTextContent("5");
  });
});
