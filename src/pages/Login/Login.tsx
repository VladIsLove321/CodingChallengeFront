import { Form, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { submitLogin } from "./LoginApi";

function Login({
  setUserName,
}: {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  let navigate = useNavigate();

  const onLoginSubmit = async (data: { email: string; password: string }) => {
    const resData = await submitLogin(data);
    setUserName(resData.user.fullName);
    navigate("/home", { replace: true });
  };

  return (
    <div className="Сentered">
      <Form onSubmit={handleSubmit(onLoginSubmit)} style={{ width: 300 }}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
            }}
            render={({ field }) => (
              <Form.Control
                {...field}
                isInvalid={!!errors.email}
                type="email"
                placeholder="Enter email"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required to proceed",
            }}
            render={({ field }) => (
              <Form.Control
                {...field}
                isInvalid={!!errors.password}
                type="password"
                placeholder="Password"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
