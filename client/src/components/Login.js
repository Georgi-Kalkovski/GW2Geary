import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import SendMail from "./Login/SendMail";

const Login = () => {
  let navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);

    AuthService.login(data.username, data.password).then(
      () => {
        navigate("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <div>
      <div className="flex center">
        <div>
          <h2 style={{ textAlign: 'center' }}>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <div className="alert alert-danger" role="alert">
                  This field is required!
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <div className="alert alert-danger" role="alert">
                  This field is required!
                </div>
              )}
            </div>

            <div className="form-group flex center">
              <button className="basic-button" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            <div className="form-group flex center">
              <a className="link-underline"
                onClick={toggleForgotPassword}
              >
                {showForgotPassword ? "Hide Section" : "Forgot my password"}
              </a>
            </div>

            {showForgotPassword && (
              <SendMail AuthService={AuthService} />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
