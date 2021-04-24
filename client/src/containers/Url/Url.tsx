import React, { useContext } from "react";
import { Row, Col } from "antd";

import UrlCard from "../../components/UI/Card/Url";
import { UserType } from "../../pages/Home";
import { AuthContext } from "../../context/AuthContext";

type PropsType = { user: UserType };

const Url: React.FC<PropsType> = (props) => {
  const { fullName } = useContext(AuthContext);
  const { urls } = props.user;
  return (
    <div>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          {urls &&
            urls.map((url) => (
              <UrlCard key={url.code} url={url} fullName={fullName} />
            ))}
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
};

export default Url;
