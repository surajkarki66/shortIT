import { notification, Form, Spin } from "antd";
import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";

import Axios from "../axios-url";
import { AuthContext } from "../context/AuthContext";
import ResetPasswordForm from "../components/Forms/ResetPasswordForm";

const ResetPassword: React.FC = () => {
  const params = useParams<{ token: string }>();

  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [loading1, setLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { csrfToken, loading } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onFinish = (_values: any) => {
    resetPassword(password);
  };

  const resetPassword = (password: string) => {
    setLoading(true);
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
    Axios.post("/api/users/resetPassword", {
      newPassword: password,
      token: params.token,
    })
      .then((res) => {
        const { data } = res;
        if (data) {
          setLoading(false);
          setResetError("");
          setIsSuccess(true);
          form.resetFields();
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setLoading(false);
        setResetError(data.data.error);
        setIsSuccess(false);
      });
  };
  if (isSuccess) {
    notification.info({
      message: "Password changed successfully",
    });
    return <Redirect to="/" />;
  }
  return (
    <div className="forgotPassword">
      {loading ? (
        <div style={{ textAlign: "center", fontSize: "20px", marginTop: 200 }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          <h1>Reset Password</h1>
          <ResetPasswordForm
            password={password}
            form={form}
            loading={loading1}
            resetError={resetError}
            onFinish={onFinish}
            onChangeHandler={onChange}
          />
        </>
      )}
    </div>
  );
};

export default ResetPassword;
