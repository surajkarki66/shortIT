import React, { useContext } from "react";
import { Row, Col } from "antd";

import UrlCard from "../../components/UI/Card/Url";
import { UrlType } from "../../types/Url";
import { AuthContext } from "../../context/AuthContext";
import { RouteComponentProps, withRouter } from "react-router";

interface PropsType extends RouteComponentProps {
  urls: UrlType[];
  deleteConfirm: (_id: string) => void;
  loading: boolean;
}

const Url: React.FC<PropsType> = (props) => {
  const { fullName } = useContext(AuthContext);

  const { urls, deleteConfirm, loading } = props;

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
