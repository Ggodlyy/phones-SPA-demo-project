import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const isAuth = (Component) => {
  const WrappedComponent = (props) => {
    const { isAuth } = useContext(AuthContext);

    return isAuth ? <Component {...props} /> : <Navigate to={"/login"} />;
  };

  return WrappedComponent;
};
