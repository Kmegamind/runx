import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeScreen } from "@/components/home-screen";

describe("Home page", () => {
  it("preselects 30 minutes and shows the start control", () => {
    render(<HomeScreen />);

    expect(screen.getByRole("radio", { name: /30\s*min/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(
      screen.getByRole("button", { name: /start the story/i }),
    ).toBeInTheDocument();
  });

  it("changes the selected preset", () => {
    render(<HomeScreen />);

    fireEvent.click(screen.getByRole("radio", { name: /45\s*min/i }));

    expect(screen.getByRole("radio", { name: /45\s*min/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: /30\s*min/i })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("accepts a custom duration in five-minute steps", () => {
    render(<HomeScreen />);
    const input = screen.getByRole("spinbutton", { name: /custom length/i });

    fireEvent.change(input, { target: { value: "25" } });

    expect(input).toHaveValue(25);
    expect(screen.getByText(/story ends at/i)).toBeInTheDocument();
  });
});
