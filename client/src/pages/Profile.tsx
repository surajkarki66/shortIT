import { Button, notification, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";

import Axios from "../axios-url";
import { UserType } from "../pages/Home";
import ProfileForm from "../components/Forms/ProfileForm";
import { AuthContext } from "../context/AuthContext";

type UserEditInputType = {
  firstName: string;
  lastName: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserType>();
  const [userInputData, setUserInputData] = useState<UserEditInputType>({
    firstName: "",
    lastName: "",
  });
  const [isSend, setIsSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [editError, setEditError] = useState("");
  const { status, token, userId, setStatus } = useContext(AuthContext);

  useEffect(() => {
    if (success) {
      notification.info({ message: success });
      setSuccess("");
    }
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
  }, [setStatus, success, token]);
  const onClickSendBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendVerificationEmail(userId);
  };

  const sendVerificationEmail = (userId: string) => {
    setLoading(true);
    Axios.post(
      "/api/users/verifyEmail",
      { userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        const { data } = res;
        setLoading(false);
        setIsSend(true);
        setSuccess(data.data.message);
      })
      .catch((err) => {
        setLoading(false);
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
  const onFinish = (values: any) => {
    if (values) {
      setLoading(true);
      editUser(userInputData, userId);
    }
  };

  const editUser = (userInputData: UserEditInputType, userId: string) => {
    setLoading(true);
    Axios.post(`/api/users/changeUserDetails/${userId}`, userInputData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setLoading(false);
        setEditError("");
      })
      .catch((err) => {
        const { data } = err.response;
        setLoading(false);
        setEditError(data.data.error);
      });
  };
  return (
    <div className="profile">
      {status === "inactive" && (
        <h4 style={{ textAlign: "center" }}>
          {" "}
          Please verify your email to get all features{" "}
          <Button
            loading={loading}
            type="link"
            size="middle"
            style={{ marginRight: 20, fontSize: 15 }}
            onClick={onClickSendBtn}
          >
            {isSend ? "Resend" : "Send"}
          </Button>
        </h4>
      )}
      <h1>Profile</h1>
      {user ? (
        <ProfileForm
          loading={loading}
          user={user}
          onChangeHandler={onChange}
          onFinish={onFinish}
          editError={editError}
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
