import React, { useState, useContext, useEffect } from "react";
import { Collapse, Form, notification, Spin } from "antd";

import Axios from "../axios-url";
import ChangePasswordForm from "../components/Forms/ChangePasswordForm";
import ChangeEmailForm from "../components/Forms/ChangeEmailForm";
import DeleteForm from "../components/Forms/DeleteForm";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router";

const { Panel } = Collapse;

const Account: React.FC = () => {
  const [changePassForm] = Form.useForm();
  const [changeEmailForm] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [panelKey, setPanelKey] = useState<string | string[]>();
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
        changeEmailForm.resetFields();
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
        changePassForm.resetFields();
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
      history.push("/");
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
        history.push("/");
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
        <Collapse
          defaultActiveKey={panelKey}
          accordion
          onChange={(key) => {
            setPanelKey(key);
          }}
        >
          <Panel header="Change Password" key="1">
            <ChangePasswordForm
              form={changePassForm}
              loading={loading}
              changeError={changePassError}
              onFinish={onFinishPassChange}
            />
          </Panel>
          <Panel header="Change Email" key="2">
            <ChangeEmailForm
              form={changeEmailForm}
              loading={loading}
              changeError={changeEmailError}
              onFinish={onFinishEmailChange}
            />
          </Panel>
          <Panel header="Delete Account" key="3">
            <DeleteForm
              loading={loading}
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
