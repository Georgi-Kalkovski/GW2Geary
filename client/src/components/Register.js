import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

const Register = () => {
  let navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    setMessage("");
    setSuccessful(false);

    AuthService.register(data.username, data.password, data.confirmPassword)
      .then((response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        reset();

        AuthService.login(data.username, data.password)
          .then(() => {
            navigate("/profile");
            window.location.reload();
          })
          .catch((error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          });
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      });
  };

  return (
    <div className="flex center">
      <div>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {!successful && (
            <div>
              {/* Username */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  className="form-control"
                  name="username"
                  {...register("username", { required: true })}
                />
                {errors.username?.type === "required" && (
                  <div className="alert alert-danger" role="alert">
                    This field is required!
                  </div>
                )}
                {errors.username?.type === "validate" && (
                  <div className="alert alert-danger" role="alert">
                    This is not a valid username.
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  {...register("password", { required: true, minLength: 6, maxLength: 40 })}
                />
                {errors.password?.type === "required" && (
                  <div className="alert alert-danger" role="alert">
                    This field is required!
                  </div>
                )}
                {errors.password?.type === "minLength" && (
                  <div className="alert alert-danger" role="alert">
                    The password must be between 6 and 40 characters.
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === watch('password')
                  })}
                />
                {errors.confirmPassword?.type === "required" && (
                  <div className="alert alert-danger" role="alert">
                    This field is required!
                  </div>
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <div className="alert alert-danger" role="alert">
                    Passwords do not match.
                  </div>
                )}
              </div>

              {/* Sign Up */}
              <div className="form-group flex center">
                <button className="basic-button">Register</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
