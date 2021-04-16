import React, { useState } from "react";
import { Redirect } from "react-router";

import Axios from "../axios-url";
import RegisterForm from "../components/Forms/RegisterForm";

export interface IUserRegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [userInputData, setUserInputData] = useState<IUserRegisterInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const onFinish = (_values: any) => {
    setLoading(true);
    register(userInputData);
  };

  const register = async (inputData: IUserRegisterInput) => {
    try {
      await Axios.post("/api/users/register", inputData);
      setLoading(false);
      setRegisterError("");
      setSuccessfulRegister(true);
    } catch (error) {
      const { data } = error.response;
      setLoading(false);
      setRegisterError(data.data.error);
      setSuccessfulRegister(false);
    }
  };

  if (successfulRegister) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="register">
      <h1>Register</h1>
      <RegisterForm
        loading={loading}
        userInputData={userInputData}
        setUserInputData={setUserInputData}
        registerError={registerError}
        onFinish={onFinish}
      />
    </div>
  );
};

export default Register;
