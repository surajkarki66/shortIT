import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import Axios from "../axios-url";
import LoginForm from "../components/Forms/LoginForm";
import { AuthContext } from "../context/AuthContext";

type IUserLoginInput = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { setToken, userId } = useContext(AuthContext);
  console.log(userId);

  const [userInputData, setUserInputData] = useState<IUserLoginInput>({
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

  const login = (inputData: IUserLoginInput) => {
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
    return <Redirect to={`/${userId}/links`} />;
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
