import React from "react";
import { Row, Col } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import UrlCard from "../../components/UI/Card/Url";
import { UserType } from "../../pages/Home";

type PropsType = { user: UserType };

const Url: React.FC<PropsType> = (props) => {
  const { urls } = props.user;
  return (
    <React.Fragment>
      <h2 style={{ textAlign: "center" }}>
        Your Links: <LinkOutlined />
      </h2>
      <Row>
        <Col span={24}>{urls && urls.map((url) => <UrlCard />)}</Col>
      </Row>
    </React.Fragment>
  );
};

export default Url;
