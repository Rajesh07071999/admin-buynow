import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    navigate("/dashboard");
    // You can handle API call or auth logic here
  };

  return (
    <div className="wrapper vh-100">
      <div className="row align-items-center h-100">
        <form
          className="col-lg-3 col-md-4 col-10 mx-auto text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Link
            className="navbar-brand mx-auto mt-2 flex-fill text-center"
            to="/login"
            style={{ fontSize: "5rem" }}
          >
            🛍️
          </Link>
          <h1 className="h6 mb-3">Sign in</h1>

          <div className="form-group mb-3">
            <input
              type="email"
              className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""
                }`}
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <input
              type="password"
              className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""
                }`}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Stay logged in{" "}
            </label>
          </div>

          <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
            Login
          </button>
          <p className="mt-5 mb-3 text-muted">© 2025</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
