import { Button } from "antd";
import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";

import Axios from "../axios-url";
import { AuthContext } from "../context/AuthContext";
const Activate: React.FC = () => {
  const { csrfToken } = useContext(AuthContext);
  const params = useParams<{ token: string }>();

  const [loading, setLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const onClickActiveBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    activate(params.token);
  };

  const activate = (token: string) => {
    setLoading(true);
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
    Axios.post("/api/users/activate", { token })
      .then((res) => {
        setLoading(false);
        setIsSuccess(true);
        setVerificationError("");
      })
      .catch((err) => {
        const { data } = err.response;
        setLoading(false);
        setIsSuccess(false);
        setVerificationError(data.data.error);
      });
  };

  if (isSuccess) {
    return <Redirect to="/" />;
  }
  return (
    <div className="verifyEmail">
      <h1>Activate your account</h1>
      <Button onClick={onClickActiveBtn} loading={loading}>
        {loading ? "" : "Activate"}
      </Button>
      {verificationError && <h4>{verificationError}</h4>}
    </div>
  );
};

export default Activate;
