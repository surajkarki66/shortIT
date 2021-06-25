import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import Axios from "../axios-url";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/Forms/LoginForm";
import { UserLoginInputType } from "../types/UserLoginInput";

const Login: React.FC = () => {
  const { setToken, csrfToken } = useContext(AuthContext);

  const [userInputData, setUserInputData] = useState<UserLoginInputType>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputData({
      ...userInputData,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = (_values: any) => {
    setLoading(true);
    login(userInputData);
  };

  const login = (inputData: UserLoginInputType) => {
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
    Axios.post("/api/users/login", inputData)
      .then((res) => {
        const { data } = res;
        if (data) {
          setLoading(false);
          setLoginError("");
          setSuccessfulLogin(true);
          setToken(data);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setLoading(false);
        setLoginError(data.data.error);
        setSuccessfulLogin(false);
      });
  };
  if (successfulLogin) {
    return <Redirect to="/" />;
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
