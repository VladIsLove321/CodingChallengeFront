import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import * as LoginApi from "./LoginApi";

test("renders Login component ", async () => {
  render(
    <MemoryRouter>
      <Login setUserName={jest.fn()} />
    </MemoryRouter>
  );
  const submitSpy = jest.spyOn(LoginApi, "submitLogin");
  const emailInput = screen.getByLabelText("Email address");
  const passwordInput = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button", { name: /Submit/ });
  fireEvent.submit(submitButton);
  await screen.findByText("Email is required");
  await screen.findByText("Password is required to proceed");
  fireEvent.input(emailInput, { target: { value: "email@mail.com" } });
  fireEvent.input(passwordInput, { target: { value: "password" } });
  fireEvent.submit(submitButton);
  await waitFor(() => {
    expect(
      screen.queryByText("Password is required to proceed")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });
  expect(submitSpy).toBeCalledTimes(1);
  expect(submitSpy.mock.calls[0][0]).toStrictEqual({
    email: "email@mail.com",
    password: "password",
  });
});
