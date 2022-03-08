import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Welcome from "./Welcome";
import { MemoryRouter } from "react-router-dom";

test("renders home component and checks for buttons to change color according to routes", () => {
  render(
    <MemoryRouter>
      <Welcome />
    </MemoryRouter>
  );
  const header = screen.getByText(/Hello/);
  const registerLink = screen.getByText(/Register/);
  const loginLink = screen.getByText(/Login/);
  expect(registerLink).toHaveStyle("color: white");
  expect(loginLink).toHaveStyle("color: white");
  fireEvent.click(registerLink);
  expect(registerLink).toHaveStyle("color: #ff2626");
  expect(loginLink).toHaveStyle("color: white");
  fireEvent.click(loginLink);
  expect(registerLink).toHaveStyle("color: white");
  expect(loginLink).toHaveStyle("color: #ff2626");
});
