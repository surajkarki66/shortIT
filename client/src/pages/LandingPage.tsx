import React, { useState } from "react";
import { Button, Input, Form, notification } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Axios from "../axios-url";

interface IGuestUrl {
  code: string;
  createdAt: Date;
  updatedAt: Date;
  longUrl: string;
  shortUrl: string;
}

const LandingPage: React.FC = () => {
  const [guestUrl, setGuestUrl] = useState<IGuestUrl>();
  const [loading, setLoading] = useState(false);
  const [guestUrlError, setGuestUrlError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [form] = Form.useForm();

  const formSubmitHandler = (value: any) => {
    if (value) {
      const data = { longUrl: value.Url };
      setLoading(true);
      generateUrl(data);
    }
  };
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const generateUrl = async (inputData: { longUrl: string }) => {
    try {
      const response = await Axios.post("/api/url/generateGuestUrl", inputData);
      const { data } = response;
      setGuestUrl(data.data);
      setLoading(false);
      setGuestUrlError("");
      form.resetFields();
    } catch (error) {
      const { data } = error.response;
      setGuestUrlError(data.data.error);
      setLoading(false);
      setGuestUrl(undefined);
      form.resetFields();
    }
  };

  return (
    <React.Fragment>
      <div className="landingPage">
        <div className="url-form">
          <h2 style={{ textTransform: "uppercase" }}>
            Short your freaking long URL
          </h2>
          {guestUrlError !== "" && (
            <h4 style={{ color: "red" }}>{guestUrlError}</h4>
          )}
          <Form form={form} onFinish={(value) => formSubmitHandler(value)}>
            <Form.Item
              name="Url"
              rules={[
                {
                  required: true,
                  message: "Please input your freaky long url!",
                },
              ]}
            >
              <Input
                style={{
                  width: "50%",
                }}
                type="text"
                placeholder="Enter the freaking long url"
                size="large"
                allowClear
                id="urlInput"
              />
            </Form.Item>
            <div style={{ marginTop: "20px" }}>
              <Button
                size="large"
                type="primary"
                loading={loading}
                htmlType="submit"
              >
                {loading ? "" : "Shorten"}
              </Button>
            </div>
          </Form>
        </div>
        {guestUrl && !loading && (
          <div className="urlResponse">
            <h1>Your short URL: Click the link to copy</h1>
            <CopyToClipboard text={guestUrl.shortUrl} onCopy={onCopyText}>
              <h2 style={{ color: "blue" }}>{guestUrl?.shortUrl}</h2>
            </CopyToClipboard>
            <h3>{String(new Date(guestUrl.createdAt))}</h3>

            {isCopied && notification.success({ message: "Copied" })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
