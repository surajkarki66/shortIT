import React, { useState, useContext, useEffect } from "react";
import { Collapse, Form, notification, Spin } from "antd";

import Axios from "../axios-url";
import ChangePasswordForm from "../components/Forms/ChangePasswordForm";
import ChangeEmailForm from "../components/Forms/ChangeEmailForm";
import DeleteForm from "../components/Forms/DeleteForm";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router";

const { Panel } = Collapse;

const Account: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [changeEmailError, setChangeEmailError] = useState("");
  const [changePassError, setChangePassError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [successPassChange, setSuccessPassChange] = useState(false);
  const [successEmailChange, setSuccessEmailChange] = useState(false);
  const { userId, token, getToken, setToken, csrfToken, urls } = useContext(
    AuthContext
  );

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
      const { oldPassword, newPassword, loggedIn } = values;
      changePassword(oldPassword, newPassword, userId, loggedIn, token);
    }
  };

  const onFinishEmailChange = (values: any) => {
    if (values) {
      const { email } = values;
      changeEmail(email, userId, token);
    }
  };

  const changeEmail = (email: string, userId: string, token?: string) => {
    setLoading(true);
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
    Axios.post(
      `/api/users/changeEmail/${userId}`,
      { email },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(async (res) => {
        setLoading(false);
        setChangeEmailError("");
        setSuccessEmailChange(true);
        form.resetFields();
        await getToken();
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
    loggedIn: boolean,
    token?: string
  ) => {
    setLoading(true);
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
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
        if (!loggedIn) {
          setSuccessPassChange(true);
          logout();
        }
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

  const onFinishDelete = (values: any) => {
    if (values) {
      const { password } = values;
      deleteAccount(password, userId, token);
    }
  };
  const logout = () => {
    Axios.get("/api/users/logout").then((res) => {
      const { data } = res;
      setToken(data);
      return <Redirect to="/" />;
    });
  };
  const deleteAccount = (password: string, userId: string, token?: string) => {
    setLoading(true);
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
    Axios.post(
      `/api/users/deleteUser/${userId}`,
      { password },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        setLoading(false);
        setDeleteError("");
        logout();
      })
      .catch((err) => {
        const { data } = err.response;
        setLoading(false);
        setDeleteError(data.data.error);
      });
  };
  return (
    <>
      {!urls ? (
        <div style={{ textAlign: "center", fontSize: "20px", marginTop: 200 }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <Collapse>
          <Panel header="Change Password" key="1">
            <ChangePasswordForm
              form={form}
              loading={loading}
              changeError={changePassError}
              onFinish={onFinishPassChange}
            />
          </Panel>
          <Panel header="Change Email" key="2">
            <ChangeEmailForm
              form={form}
              loading={loading}
              changeError={changeEmailError}
              onFinish={onFinishEmailChange}
            />
          </Panel>
          <Panel header="Delete Account" key="3">
            <DeleteForm
              loading={loading}
              form={form}
              deleteError={deleteError}
              onFinish={onFinishDelete}
            />
          </Panel>
        </Collapse>
      )}
    </>
  );
};

export default Account;
