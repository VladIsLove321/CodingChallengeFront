import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Register from "./Register";
import { MemoryRouter } from "react-router-dom";
import * as RegisterApi from "./RegisterApi";

test("renders Register component ", async () => {
  render(
    <MemoryRouter>
      <Register setUserName={jest.fn()} />
    </MemoryRouter>
  );
  const submitSpy = jest.spyOn(RegisterApi, "submitRegister");
  const emailInput = screen.getByLabelText("Email address");
  const fullName = screen.getByLabelText("Full name");
  const passwordInput = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button", { name: /Submit/ });
  fireEvent.submit(submitButton);
  await screen.findByText("Email is required");
  await screen.findByText("Full name is required");
  await screen.findByText("Password is required to proceed");
  fireEvent.input(emailInput, { target: { value: "emailmail.com" } });
  fireEvent.input(fullName, { target: { value: "abc" } });
  fireEvent.input(passwordInput, { target: { value: "shortP" } });
  fireEvent.submit(submitButton);
  await screen.findByText("Please enter a valid email");
  await screen.findByText("Full name should be at least 5 char long");
  await screen.findByText("Password should be at least 8 char long");
  fireEvent.input(passwordInput, { target: { value: "password" } });
  fireEvent.submit(submitButton);
  await screen.findByText("Your password should contain at least one number");
  fireEvent.input(passwordInput, { target: { value: "324324324324" } });
  fireEvent.submit(submitButton);
  await screen.findByText(
    "Your password should contain at least one character"
  );
  fireEvent.input(emailInput, { target: { value: "email@mail.com" } });
  fireEvent.input(fullName, { target: { value: "fullName" } });
  fireEvent.input(passwordInput, { target: { value: "passwor2d" } });
  fireEvent.submit(submitButton);
  await waitFor(() => {
    expect(
      screen.queryByText("Your password should contain at least one character")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Password should be at least 8 char long")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Your password should contain at least one number")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Please enter a valid email")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Full name should be at least 5 char long")
    ).not.toBeInTheDocument();
  });
  expect(submitSpy).toBeCalledTimes(1);
  expect(submitSpy.mock.calls[0][0]).toStrictEqual({
    email: "email@mail.com",
    fullName: "fullName",
    password: "passwor2d",
  });
});
