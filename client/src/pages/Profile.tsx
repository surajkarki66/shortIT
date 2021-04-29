import { Button, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";

import Axios from "../axios-url";
import { AuthContext } from "../context/AuthContext";

const Profile: React.FC = () => {
  const [isSend, setIsSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const { status, token, userId } = useContext(AuthContext);

  useEffect(() => {
    if (success) {
      notification.info({ message: success });
      setSuccess("");
    }
  }, [success]);
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
  return (
    <div>
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
    </div>
  );
};

export default Profile;
