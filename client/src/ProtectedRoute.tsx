import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
interface ProtectedRouteProps extends RouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...rest }) => {
  const { token } = useContext(AuthContext);
  console.log(token);
  if (token) {
    console.log(token);
    return <Route {...rest} />;
  }
  return <Redirect to="/" />;
};

export default ProtectedRoute;
