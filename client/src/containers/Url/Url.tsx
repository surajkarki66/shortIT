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
    <div>
      {urls && urls.length !== 0 ? (
        urls.map((url) => (
          <Row>
            <Col key={url._id} span={24}>
              <UrlCard
                key={url._id}
                url={url}
                fullName={fullName}
                deleteConfirm={deleteConfirm}
                loading={loading}
              />
            </Col>
          </Row>
        ))
      ) : (
        <p style={{ textAlign: "center", fontSize: "20px" }}>No Links</p>
      )}
    </div>
  );
};

export default withRouter(Url);
