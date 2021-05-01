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

  useEffect(() => {
    if (isDeleteSuccess) {
      props.history.push("/home");
    }
  }, [isDeleteSuccess, props.history]);

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
      {urls && urls.length !== 0 ? (
        urls.map((url) => (
          <Col key={url._id} span={24}>
            <UrlCard
              key={url._id}
              url={url}
              loading={loading}
              fullName={fullName}
              deleteConfirm={deleteConfirm}
            />
          </Col>
        ))
      ) : (
        <p style={{ textAlign: "center", fontSize: "20px" }}>No Links</p>
      )}
    </Row>
  );
};

export default withRouter(Url);
