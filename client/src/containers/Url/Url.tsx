import React, { useContext } from "react";
import { Row, Col } from "antd";

import UrlCard from "../../components/UI/Card/Url";
import { UrlType } from "../../types/Url";
import { AuthContext } from "../../context/AuthContext";
import { RouteComponentProps, withRouter } from "react-router";

interface PropsType extends RouteComponentProps {
  urls: UrlType[];
  loading: boolean;
  deleteConfirm: (_id: string) => void;
}

const Url: React.FC<PropsType> = (props) => {
  const { fullName } = useContext(AuthContext);

  const { urls, deleteConfirm, loading } = props;
  return (
    <div>
      {urls &&
        urls.map((url) => (
          <Row key={url._id}>
            <Col key={url._id} span={24}>
              <UrlCard
                key={url._id}
                url={url}
                fullName={fullName}
                loading={loading}
                deleteConfirm={deleteConfirm}
              />
            </Col>
          </Row>
        ))}
    </div>
  );
};

export default withRouter(Url);
