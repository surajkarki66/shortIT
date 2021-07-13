import { Button, notification, Spin, Form } from "antd";
import React, { useContext, useEffect, useState } from "react";

import Axios from "../axios-url";
import ProfileCard from "../containers/Profile";
import { AuthContext } from "../context/AuthContext";

type UserEditInputType = {
  firstName: string;
  lastName: string;
};

const Profile: React.FC = () => {
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
  const {
    status,
    token,
    userId,
    setFullName,
    fullName,
    email,
    csrfToken,
    urls,
  } = useContext(AuthContext);
  const user = { fullName, email };
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (success) {
      notification.info({ message: success, duration: 3 });
      setSuccess("");
    }
  }, [success]);
  const onClickSendBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendVerificationEmail(userId);
  };

  const sendVerificationEmail = (userId: string) => {
    setSendLoading(true);
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
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
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
    Axios.post(`/api/users/changeUserDetails/${userId}`, userInputData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setLoading(false);
        setEditError("");
        setFullName(userInputData.firstName + " " + userInputData.lastName);
        onClose();
        form.resetFields();
      })
      .catch((err) => {
        const { data } = err.response;
        setLoading(false);
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

      {urls ? (
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
        <div style={{ textAlign: "center", fontSize: "20px", marginTop: 200 }}>
          <Spin size="large" tip="Loading..." />
        </div>
      )}
    </div>
  );
};

export default Profile;
