import { Button, notification, Spin, Form } from "antd";
import React, { useContext, useEffect, useState } from "react";

import Axios from "../axios-url";
import { UserType } from "../pages/Home";
import ProfileCard from "../containers/Profile";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router";

type UserEditInputType = {
  firstName: string;
  lastName: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserType>();
  const [form] = Form.useForm();
  const [userInputData, setUserInputData] = useState<UserEditInputType>({
    firstName: "",
    lastName: "",
  });
  const [isSend, setIsSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);
  const { status, token, userId, setStatus } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (success) {
      notification.info({ message: success });
      setSuccess("");
    }
    if (token) {
      setLoading(true);
      Axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          const { data } = res;
          setUser(data.data);
          setStatus(data.data.status);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [setStatus, success, token, editSuccess]);
  const onClickSendBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendVerificationEmail(userId);
  };

  const sendVerificationEmail = (userId: string) => {
    setSendLoading(true);
    Axios.post(
      "/api/users/verifyEmail",
      { userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        const { data } = res;
        setSendLoading(false);
        setIsSend(true);
        setSuccess(data.data.message);
      })
      .catch((err) => {
        setSendLoading(false);
        setIsSend(false);
        setSuccess("");
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputData({
      ...userInputData,
      [e.target.name]: e.target.value,
    });
  };
  const onFinish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    editUser(userInputData, userId);
  };

  const editUser = (userInputData: UserEditInputType, userId: string) => {
    setLoading(true);
    Axios.post(`/api/users/changeUserDetails/${userId}`, userInputData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setLoading(false);
        setEditError("");
        setEditSuccess(true);
        onClose();
        form.resetFields();
        return <Redirect to="/profile" />;
      })
      .catch((err) => {
        const { data } = err.response;
        setLoading(false);
        setEditSuccess(false);
        setEditError(data.data.error);
      });
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="profile">
      {status === "inactive" && (
        <h4 style={{ textAlign: "center" }}>
          {" "}
          Please verify your email to get all features{" "}
          <Button
            loading={sendLoading}
            type="link"
            size="middle"
            style={{ marginRight: 20, fontSize: 15 }}
            onClick={onClickSendBtn}
          >
            {isSend ? "Resend" : "Send"}
          </Button>
        </h4>
      )}

      {user ? (
        <ProfileCard
          form={form}
          user={user}
          status={status}
          loading={loading}
          editError={editError}
          onChange={onChange}
          onFinish={onFinish}
          visible={visible}
          showDrawer={showDrawer}
          onClose={onClose}
        />
      ) : (
        <div className="spin">
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </div>
  );
};

export default Profile;
