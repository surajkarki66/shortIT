import { notification, Form } from "antd";
import React, { useEffect, useState } from "react";

import Axios from "../axios-url";
import ForgotPasswordForm from "../components/Forms/ForgotPasswordForm";

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      notification.info({
        message: "Email is sent to you. Follow the instruction.",
      });
    }
  }, [isSuccess]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onFinish = (_values: any) => {
    forgotPassword(email);
  };

  const forgotPassword = (email: string) => {
    setLoading(true);
    Axios.post("/api/users/forgotPassword", { email })
      .then((res) => {
        const { data } = res;
        if (data) {
          setLoading(false);
          setForgotError("");
          setIsSuccess(true);
          form.resetFields();
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setLoading(false);
        setForgotError(data.data.error);
        setIsSuccess(false);
      });
  };

  return (
    <div className="forgotPassword">
      <h1>Enter your email:</h1>
      <ForgotPasswordForm
        form={form}
        email={email}
        loading={loading}
        forgotError={forgotError}
        onFinish={onFinish}
        onChangeHandler={onChange}
      />
    </div>
  );
};

export default ForgotPassword;
