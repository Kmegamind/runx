import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("shows the RunX heading when rendered", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "RunX" })).toBeInTheDocument();
  });
});
