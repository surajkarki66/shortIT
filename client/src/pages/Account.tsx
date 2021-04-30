import React, { useState, useContext, useEffect } from "react";
import { Collapse, Form, notification } from "antd";

import Axios from "../axios-url";
import ChangePasswordForm from "../components/Forms/ChangePasswordForm";
import { AuthContext } from "../context/AuthContext";

const { Panel } = Collapse;

const Account: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [changeEmailError, setChangeEmailError] = useState("");
  const [changePassError, setChangePassError] = useState("");
  const [successPassChange, setSuccessPassChange] = useState(false);
  const { userId, token } = useContext(AuthContext);

  useEffect(() => {
    if (successPassChange) {
      notification.info({ message: "Password is changed successfully" });
    }
  }, [successPassChange]);

  const onFinishPassChange = (values: any) => {
    if (values) {
      const { oldPassword, newPassword } = values;
      changePassword(oldPassword, newPassword, userId, token);
    }
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
        <h1>Change Email</h1>
      </Panel>
    </Collapse>
  );
};

export default Account;
