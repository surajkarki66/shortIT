import moment from "moment";
import { Button, Card, Col, Row, notification } from "antd";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { UrlType } from "../../../pages/Home";
import { BarChartOutlined } from "@ant-design/icons";
import EditUrl from "../../../containers/Url/EditUrl";

type PropsType = {
  url: UrlType;
  fullName: string;
  loading: boolean;
  visible: boolean;
  Title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleEditOk: (_id: string) => void;
  handleEditCancel: () => void;
  showModal: () => void;
  deleteConfirm: (_id: string) => void;
};
const UrlCard: React.FC<PropsType> = (props) => {
  const {
    fullName,
    loading,
    deleteConfirm,
    showModal,
    Title,
    setTitle,
    visible,
    handleEditOk,
    handleEditCancel,
  } = props;
  const { _id, createdAt, title, shortUrl, longUrl, accessedDates } = props.url;
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
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
            {shortUrl.slice(7)}
          </a>
        </Col>
        <Col span={24}>
          <h3 style={{ float: "right" }}>
            {" "}
            {accessedDates && accessedDates.length}&nbsp;&nbsp;&nbsp;
            <BarChartOutlined />
            {accessedDates && accessedDates.length > 1 ? (
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
          {isCopied && notification.success({ message: "Copied" })}
          <Button
            size="small"
            style={{ marginRight: 20, fontSize: 10 }}
            onClick={showModal}
          >
            EDIT
          </Button>
          <EditUrl
            title={Title}
            setTitle={setTitle}
            urlId={_id}
            visible={visible}
            loading={loading}
            handleEditOk={handleEditOk}
            handleEditCancel={handleEditCancel}
          />

          <Button
            loading={loading}
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
