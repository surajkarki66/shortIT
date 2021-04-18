import React, { useState, useContext } from "react";
import { Redirect } from "react-router";

import Axios from "../axios-url";
import LoginForm from "../components/Forms/LoginForm";
import { UserContext } from "../components/UserContext";

export interface IUserLoginInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { setToken, setIsAuthenticated } = useContext(UserContext);

  const [userInputData, setUserInputData] = useState<IUserLoginInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onFinish = (_values: any) => {
    setLoading(true);
    login(userInputData);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputData({
      ...userInputData,
      [e.target.name]: e.target.value,
    });
  };
  const login = async (inputData: IUserLoginInput) => {
    try {
      const { data } = await Axios.post("/api/users/login", inputData);
      if (data.data.accessToken) {
        setLoading(false);
        setLoginError("");
        setSuccessfulLogin(true);
        setToken(data.data.accessToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      const { data } = error.response;
      setLoading(false);
      setLoginError(data.data.error);
      setSuccessfulLogin(false);
    }
  };
  if (successfulLogin) {
    return <Redirect exact to="/dashboard" />;
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <LoginForm
        loading={loading}
        loginError={loginError}
        onFinish={onFinish}
        onChangeHandler={onChange}
      />
    </div>
  );
};

export default Login;
