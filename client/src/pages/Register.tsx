import React, { useState, useContext } from "react";
import { withRouter, Redirect } from "react-router";

import Axios from "../axios-url";
import { AuthContext } from "../context/AuthContext";
import RegisterForm from "../components/Forms/RegisterForm";
import { Spin } from "antd";

type UserRegisterInputType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const [userInputData, setUserInputData] = useState<UserRegisterInputType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading1, setLoading] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const { csrfToken, loading } = useContext(AuthContext);

  const onFinish = (values: any) => {
    if (values) {
      setLoading(true);
      register(userInputData);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputData({
      ...userInputData,
      [e.target.name]: e.target.value,
    });
  };

  const register = (inputData: UserRegisterInputType) => {
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
    Axios.post("/api/users/register", inputData)
      .then((_res) => {
        setLoading(false);
        setRegisterError("");
        setSuccessfulRegister(true);
      })
      .catch((error) => {
        const { data } = error.response;
        setLoading(false);
        setRegisterError(data.data.error);
        setSuccessfulRegister(false);
      });
  };

  if (successfulRegister) {
    return <Redirect exact to="/login" />;
  }

  return (
    <div className="register">
      {loading ? (
        <div style={{ textAlign: "center", fontSize: "20px", marginTop: 200 }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          <h1>Register</h1>
          <RegisterForm
            loading={loading1}
            registerError={registerError}
            onFinish={onFinish}
            onChangeHandler={onChange}
          />
        </>
      )}
    </div>
  );
};

export default withRouter(Register);
