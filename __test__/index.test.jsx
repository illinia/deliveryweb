/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../pages/index";

describe("Index page", () => {
  it("has div container", () => {
    render(<Index />);

    const div = screen.getByText("hello world");
    expect(div).toBeInTheDocument();
  });
});
