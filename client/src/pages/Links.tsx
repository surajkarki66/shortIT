import React, { useContext, useState, useEffect } from "react";
import { Modal } from "antd";

import { ExclamationCircleOutlined } from "@ant-design/icons";

import Axios from "../axios-url";
import Url from "../containers/Url/Url";
import { AuthContext } from "../context/AuthContext";
import { RouteComponentProps, withRouter } from "react-router";
interface PropsType extends RouteComponentProps {}

const LinksPage: React.FC<PropsType> = (props) => {
  const { token, setStatus, urls, setUrls, csrfToken } = useContext(
    AuthContext
  );
  const [loading, setLoading] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  useEffect(() => {
    const me = async () => {
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
    };
    me();
  }, [setStatus, token, setUrls, isDeleteSuccess]);

  const handleDeleteOk = (_id: string) => {
    setLoading(true);
    Axios.defaults.headers.delete["X-CSRF-Token"] = csrfToken;
    Axios.delete(`/api/url/deleteUrl/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setIsDeleteSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
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
    </div>
  );
};

export default withRouter(LinksPage);
