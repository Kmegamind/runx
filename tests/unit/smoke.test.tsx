import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("shows the story and defaults to a 30 minute run", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Ride into a story." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /30 min/i })).toBeChecked();
    expect(
      screen.getByRole("button", { name: /start the story/i }),
    ).toBeInTheDocument();
  });

  it("updates the selected duration", () => {
    render(<Home />);

    fireEvent.click(screen.getByRole("radio", { name: /45 min/i }));

    expect(screen.getByRole("radio", { name: /45 min/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /30 min/i })).not.toBeChecked();
  });
});
