import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import Axios from "../../axios-url";
import UrlCard from "../../components/UI/Card/Url";
import { UserType } from "../../pages/Home";
import { AuthContext } from "../../context/AuthContext";
import { RouteComponentProps, withRouter } from "react-router";

interface PropsType extends RouteComponentProps {
  user: UserType;
}

const Url: React.FC<PropsType> = (props) => {
  const { fullName, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isDeleteSuccess || isEditSuccess) {
      props.history.push("/");
    }
  }, [isEditSuccess, isDeleteSuccess, props.history]);

  const handleEditOk = (_id: string) => {
    setLoading(true);
    Axios.patch(
      `/api/url/updateUrl/${_id}`,
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        setLoading(false);
        setIsEditSuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setIsEditSuccess(false);
      });
  };
  const handleEditCancel = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleDeleteOk = (_id: string) => {
    setLoading(true);
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
      okText: "Submit",
      cancelText: "Cancel",
      onOk: () => handleDeleteOk(_id),
    });
  };

  const { urls } = props.user;

  return (
    <Row>
      {urls &&
        urls.map((url) => (
          <Col key={url._id} span={24} style={{ border: "3px solid black" }}>
            <UrlCard
              key={url._id}
              url={url}
              loading={loading}
              fullName={fullName}
              deleteConfirm={deleteConfirm}
              visible={visible}
              handleEditOk={handleEditOk}
              handleEditCancel={handleEditCancel}
              showModal={showModal}
              Title={title}
              setTitle={setTitle}
            />
          </Col>
        ))}
      <Col span={6} />
    </Row>
  );
};

export default withRouter(Url);
