import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { submitRegister } from "./RegisterApi";

function Register({
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
      fullName: "",
      password: "",
    },
  });
  let navigate = useNavigate();
  const onLoginSubmit = async (data: {
    email: string;
    fullName: string;
    password: string;
  }) => {
    try {
      const resData = await submitRegister(data);
      setUserName(resData.user.fullName);
      navigate("/home", { replace: true });
    } catch (error) {}
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
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
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

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full name</Form.Label>
          <Controller
            name="fullName"
            control={control}
            rules={{
              minLength: {
                value: 5,
                message: "Full name should be at least 5 char long",
              },
              required: "Full name is required",
            }}
            render={({ field }) => (
              <Form.Control
                {...field}
                isInvalid={!!errors.fullName}
                placeholder="Enter your name"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Controller
            name="password"
            control={control}
            rules={{
              minLength: {
                value: 8,
                message: "Password should be at least 8 char long",
              },
              required: "Password is required to proceed",
              validate: {
                hasNumber: (input) =>
                  /\d/.test(input) ||
                  "Your password should contain at least one number",
                hasLetter: (input) =>
                  /[a-zA-z]/.test(input) ||
                  "Your password should contain at least one character",
              },
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

export default Register;
