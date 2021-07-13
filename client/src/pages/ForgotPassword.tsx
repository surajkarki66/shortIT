import { notification, Form, Spin } from "antd";
import React, { useEffect, useState, useContext } from "react";

import Axios from "../axios-url";
import { AuthContext } from "../context/AuthContext";
import ForgotPasswordForm from "../components/Forms/ForgotPasswordForm";

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [loading1, setLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { csrfToken, loading } = useContext(AuthContext);

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
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
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
      {loading ? (
        <div style={{ textAlign: "center", fontSize: "20px", marginTop: 200 }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          <h1>Enter your email:</h1>
          <ForgotPasswordForm
            form={form}
            email={email}
            loading={loading1}
            forgotError={forgotError}
            onFinish={onFinish}
            onChangeHandler={onChange}
          />
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
