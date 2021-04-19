import React, { useState } from "react";
import { withRouter, Redirect } from "react-router";

import Axios from "../axios-url";
import RegisterForm from "../components/Forms/RegisterForm";

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
  const [loading, setLoading] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const [registerError, setRegisterError] = useState("");

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
      <h1>Register</h1>
      <RegisterForm
        loading={loading}
        registerError={registerError}
        onFinish={onFinish}
        onChangeHandler={onChange}
      />
    </div>
  );
};

export default withRouter(Register);
