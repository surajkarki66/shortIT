import React, { useState } from "react";
import { notification } from "antd";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

import { GuestUrlType } from "../../../pages/LandingPage";
import { UrlType } from "../../../pages/Home";

type PropsType = {
  url: GuestUrlType | UrlType;
};

const UrlResponse: React.FC<PropsType> = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const { url } = props;
  return (
    <div className="urlResponse">
      <h1>Your short URL:</h1>
      <h2 style={{ color: "blue" }}>
        {url?.shortUrl}&nbsp;&nbsp;{" "}
        <CopyToClipboard text={url.shortUrl} onCopy={onCopyText}>
          <CopyOutlined style={{ fontSize: "20px", color: "black" }} />
        </CopyToClipboard>{" "}
      </h2>
      <h3>{String(new Date(url.createdAt))}</h3>

      {isCopied && notification.success({ message: "Copied" })}
    </div>
  );
};

export default UrlResponse;
