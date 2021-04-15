import React, { useState } from "react";
import { Form } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Axios from "../axios-url";
import UrlForm from "../components/UI/UrlForm/UrlForm";

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
        <UrlForm
          loading={loading}
          formSubmitHandler={formSubmitHandler}
          customError={guestUrlError}
          form={form}
        />
        {guestUrl && !loading && (
          <div className="urlResponse">
            <h1>Your short URL: Click the link to copy</h1>
            <CopyToClipboard text={guestUrl.shortUrl} onCopy={onCopyText}>
              <h2 style={{ color: "blue" }}>{guestUrl?.shortUrl}</h2>
            </CopyToClipboard>
            <h3>{String(new Date(guestUrl.createdAt))}</h3>

            {isCopied && <span style={{ color: "black" }}>Copied!</span>}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
