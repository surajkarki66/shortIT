import moment from "moment";
import { Button, Card, Col, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { UrlType } from "../../../pages/Home";
import { BarChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type PropsType = {
  url: UrlType;
  key: string;
  fullName: string;
  loading: boolean;
  deleteConfirm: (_id: string) => void;
};
const UrlCard: React.FC<PropsType> = (props) => {
  const { fullName, deleteConfirm } = props;
  const { _id, createdAt, title, shortUrl, longUrl, accessedDates } = props.url;
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (isCopied) {
      notification.success({ message: "Copied" });
    }
  }, [isCopied]);

  return (
    <Card>
      <Row>
        <Col>
          <h4 style={{ color: "#666666" }}>
            CREATED &nbsp;&nbsp;{moment(createdAt).format("LLL")}&nbsp; | &nbsp;{" "}
            <p style={{ display: "inline", color: "#5280e9" }}>{fullName}</p>{" "}
          </h4>
          <h2>{title ? title : longUrl}</h2>
          <h4 style={{ color: "#666666" }}>{longUrl}</h4>
          <br />
          <a rel="noreferrer" href={shortUrl} target="_blank">
            {shortUrl.slice(8)}
          </a>
        </Col>
        <Col span={24}>
          <h3 style={{ float: "right" }}>
            {" "}
            {accessedDates && accessedDates.length}&nbsp;&nbsp;&nbsp;
            <BarChartOutlined />
            {accessedDates && accessedDates.length >= 1 ? (
              <p style={{ fontSize: 12 }}>
                {moment(accessedDates[accessedDates.length - 1]).fromNow()}
              </p>
            ) : (
              <p style={{ fontSize: 12 }}>Not Accessed</p>
            )}
          </h3>
          <CopyToClipboard text={shortUrl} onCopy={onCopyText}>
            <Button
              type="primary"
              size="small"
              style={{ marginRight: 20, fontSize: 10, marginTop: 20 }}
            >
              COPY
            </Button>
          </CopyToClipboard>
          <Button size="small" style={{ marginRight: 20, fontSize: 10 }}>
            <Link to={`/link/edit/${_id}`}>EDIT</Link>
          </Button>

          <Button
            onClick={() => deleteConfirm(_id)}
            type="link"
            size="small"
            style={{ marginRight: 20, fontSize: 10, color: "red" }}
          >
            DELETE
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UrlCard;
