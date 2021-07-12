import React, { useContext, useState, useEffect, useCallback } from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import Axios from "../axios-url";
import Url from "../containers/Url/Url";
import { AuthContext } from "../context/AuthContext";

const LinksPage: React.FC = () => {
  const { token, setStatus, urls, setUrls, csrfToken } = useContext(
    AuthContext
  );
  const [loading, setLoading] = useState(false);

  const me = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await Axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUrls(data.data.urls);
      setStatus(data.data.status);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [setStatus, setUrls, token]);

  useEffect(() => {
    me();
  }, [me]);
  const handleDeleteOk = (_id: string) => {
    setLoading(true);
    Axios.defaults.headers.delete["X-CSRF-Token"] = csrfToken;
    Axios.delete(`/api/url/deleteUrl/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setLoading(false);
        me();
      })
      .catch((err) => {
        setLoading(false);
        me();
      });
  };

  const deleteConfirm = (_id: string) => {
    Modal.confirm({
      title: "Are you sure to delete this link ?",
      icon: <ExclamationCircleOutlined />,
      content: " Then you will permanently loose this link.",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () => handleDeleteOk(_id),
    });
  };
  return (
    <div className="landingPage">
      {urls && (
        <Url urls={urls} deleteConfirm={deleteConfirm} loading={loading} />
      )}
      {!loading && urls && urls.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "20px" }}>No Links</p>
      )}
    </div>
  );
};

export default LinksPage;
