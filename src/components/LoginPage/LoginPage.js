import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";
import { useForm } from "react-hook-form";
import "./LoginPage.scss";

export default function LoginPage() {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const loginHandler = (data) => {
    const { email, password } = data;

    authService
      .login(email, password)
      .then((authData) => {
        if (authData.message) {
          window.alert(authData.message);
        } else {
          console.log(authData);
          userLogin(authData);
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const emaiWatch = watch('email');
  const passwordWatch = watch("password");
  const pattern = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
  const validEmail = pattern.test(emaiWatch);

  return (
    <div className="container-login">
      <form onSubmit={handleSubmit(loginHandler)}>
        <div className="container-login">
          <h1 className="title">Login</h1>

          <label htmlFor="email">
            <b>Email</b>
          </label>

          <p className={errors.email?.message ? "error" : "non-error-state"}>
            {errors.email?.message}
          </p>

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/,
                message: "Must have a valid email",
              },
            })}
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            className={
              (Boolean(emaiWatch) === false
                ? ""
                : validEmail
                ? ""
                : "input-error") || errors.email?.message
                ? "input-error"
                : ""
            }
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>

          <p className={errors.password?.message ? "error" : "non-error-state"}>
            {errors.password?.message}
          </p>

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password must be at least 3 letters long",
              },
            })}
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            className={
              (Boolean(passwordWatch) === false
                ? ""
                : passwordWatch?.length > 2
                ? ""
                : "input-error") || errors.password?.message
                ? "input-error"
                : ""
            }
          />

          <button className="loginbtn">Login</button>
        </div>
        <p>
          Don't have an account? <NavLink to={"/register"}>Register</NavLink>
        </p>
      </form>
    </div>
  );
}
