import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import * as authService from "../services/authService";
import { isAuth } from "../hoc/isAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { user, userLogout } = useContext(AuthContext);

  useEffect(() => {
    authService
      .logout(user.accessToken)
      .then(() => {
        userLogout();
        navigate("/");
      })
      .catch((err) => {
       console.log(err);
      });
  });

  return null;
};

export default isAuth(Logout);
