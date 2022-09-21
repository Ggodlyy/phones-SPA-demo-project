import { NavLink, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import { useForm } from "react-hook-form";
import "./RegisterPage.scss";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const registerHandler = (data) => {
    const { username, email, password, repass, avatar } = data;

    if (password !== repass) {
      return window.alert("passwords don't match!");
    }

    authService
      .register(username, email, password, JSON.stringify(avatar))
      .then((authData) => {
        if (authData.message) {
          window.alert(authData.message);
        } else {
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
        }
      });
  };

  const usernameWatch = watch("username");
  const emaiWatch = watch("email");
  const passwordWatch = watch("password");
  const repassWatch = watch("repass");
  const pattern = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
  const validEmail = pattern.test(emaiWatch);

  return (
    <div className="container-register">
      <form onSubmit={handleSubmit(registerHandler)}>
        <div className="container-register">
          <h1 className="title">Register</h1>

          <label htmlFor="username">
            <b>Username</b>
          </label>

          <p className={errors.username?.message ? "error" : "non-error-state"}>
            {errors.username?.message}
          </p>

          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username must be at least 2 characters long",
              },
            })}
            type="text"
            placeholder="Enter Username"
            name="username"
            id="username"
            className={errors.username?.message ? "input-error" : ""}
          />

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
                value: pattern,
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

          <label htmlFor="psw-repeat">
            <b>Repeat Password</b>
          </label>

          <p className={errors.repass?.message ? "error" : "non-error-state"}>
            {errors.repass?.message}
          </p>

          <input
            {...register("repass", {
              required: "Repeat password is required",
              minLength: {
                value: 3,
                message: "Password must be at least 3 letters long",
              },
            })}
            type="password"
            placeholder="Repeat Password"
            name="repass"
            id="repass"
            className={
              (Boolean(repassWatch) === false
                ? ""
                : repassWatch?.length > 2
                ? ""
                : "input-error") || errors.password?.message
                ? "input-error"
                : ""
            }
          />

          <button className="registerbtn">Register</button>

          <p>
            Already have an account? <NavLink to={"/login"}>Sign in</NavLink>.
          </p>
        </div>
      </form>
    </div>
  );
}
