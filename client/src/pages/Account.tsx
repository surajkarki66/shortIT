import React, { useState, useContext, useEffect } from "react";
import { Collapse, Form, notification } from "antd";

import Axios from "../axios-url";
import ChangePasswordForm from "../components/Forms/ChangePasswordForm";
import ChangeEmailForm from "../components/Forms/ChangeEmailForm";
import { AuthContext } from "../context/AuthContext";

const { Panel } = Collapse;

const Account: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [changeEmailError, setChangeEmailError] = useState("");
  const [changePassError, setChangePassError] = useState("");
  const [successPassChange, setSuccessPassChange] = useState(false);
  const [successEmailChange, setSuccessEmailChange] = useState(false);
  const { userId, token, setStatus } = useContext(AuthContext);

  useEffect(() => {
    if (successPassChange) {
      notification.info({ message: "Password is changed successfully" });
    }
    if (successEmailChange) {
      notification.info({
        message: "Email is changed successfully and confirmation email is sent",
      });
    }
  }, [successPassChange, successEmailChange]);

  const onFinishPassChange = (values: any) => {
    if (values) {
      const { oldPassword, newPassword } = values;
      changePassword(oldPassword, newPassword, userId, token);
    }
  };

  const onFinishEmailChange = (values: any) => {
    if (values) {
      const { email } = values;
      changeEmail(email, userId, token);
    }
  };

  const changeEmail = (email: string, userId: string, token: string) => {
    setLoading(true);
    Axios.post(
      `/api/users/changeEmail/${userId}`,
      { email },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        setLoading(false);
        setChangeEmailError("");
        setSuccessEmailChange(true);
        setStatus("inactive");
        form.resetFields();
      })
      .catch((error) => {
        const { data } = error.response;
        setLoading(false);
        setSuccessEmailChange(false);
        setChangeEmailError(data.data.error);
      });
  };
  const changePassword = (
    oldPassword: string,
    newPassword: string,
    userId: string,
    token: string
  ) => {
    setLoading(true);
    Axios.post(
      `/api/users/changePassword/${userId}`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        setLoading(false);
        setChangePassError("");
        setSuccessPassChange(true);
        form.resetFields();
      })
      .catch((error) => {
        const { data } = error.response;
        setLoading(false);
        setSuccessPassChange(false);
        setChangePassError(data.data.error);
      });
  };
  return (
    <Collapse>
      <Panel header="Change Password" key="1">
        <div className="changePassword">
          <ChangePasswordForm
            form={form}
            loading={loading}
            changeError={changePassError}
            onFinish={onFinishPassChange}
          />
        </div>
      </Panel>
      <Panel header="Change Email" key="2">
        <div className="changeEmail">
          <ChangeEmailForm
            form={form}
            loading={loading}
            changeError={changeEmailError}
            onFinish={onFinishEmailChange}
          />
        </div>
      </Panel>
      <Panel header="Delete Account" key="3"></Panel>
    </Collapse>
  );
};

export default Account;
