import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import Axios from "../axios-url";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/Forms/LoginForm";
import { UserLoginInputType } from "../types/UserLoginInput";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const Login: React.FC = () => {
  const { setToken, csrfToken } = useContext(AuthContext);

  const [userInputData, setUserInputData] = useState<UserLoginInputType>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputData({
      ...userInputData,
      [event.target.name]: event.target.value,
    });
  };
  const onChangeCheckBox = (event: CheckboxChangeEvent) => {
    setUserInputData({
      ...userInputData,
      [event.target.name as string]: event.target.checked,
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
        onChangeCheckBoxHandler={onChangeCheckBox}
      />
    </div>
  );
};

export default Login;
