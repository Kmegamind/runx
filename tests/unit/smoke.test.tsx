import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("shows the RunX heading and duration choices", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Run your way." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /20 MIN/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /30 MIN/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /45 MIN/i })).toBeInTheDocument();
  });

  it("starts the selected run", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("radio", { name: /45 MIN/i }));
    fireEvent.click(screen.getByRole("button", { name: /start my run/i }));

    expect(
      screen.getByRole("button", { name: /run in progress/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("45 minute run started")).toBeInTheDocument();
  });
});
