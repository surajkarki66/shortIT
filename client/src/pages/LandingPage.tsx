import React, { useState } from "react";
import { Form } from "antd";

import Axios from "../axios-url";
import UrlForm from "../components/Forms/UrlForm";
import UrlResponse from "../components/UI/Card/UrlResponse";

export type GuestUrlType = {
  _id: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  longUrl: string;
  shortUrl: string;
};

const LandingPage: React.FC = () => {
  const [guestUrl, setGuestUrl] = useState<GuestUrlType>();
  const [loading, setLoading] = useState(false);
  const [guestUrlError, setGuestUrlError] = useState("");
  const [form] = Form.useForm();

  const formSubmitHandler = (value: any) => {
    if (value) {
      const data = { longUrl: value.Url };
      setLoading(true);
      generateUrl(data);
    }
  };

  const generateUrl = (inputData: { longUrl: string }) => {
    Axios.post("/api/url/generateGuestUrl", inputData)
      .then((res) => {
        const { data } = res;
        setGuestUrl(data.data);
        setLoading(false);
        setGuestUrlError("");
        form.resetFields();
      })
      .catch((error) => {
        const { data } = error.response;
        setGuestUrlError(data.data.error);
        setLoading(false);
        setGuestUrl(undefined);
        form.resetFields();
      });
  };
  return (
    <React.Fragment>
      <div className="landingPage">
        <UrlForm
          form={form}
          formSubmitHandler={formSubmitHandler}
          loading={loading}
          urlError={guestUrlError}
        />
        {guestUrl && !loading && <UrlResponse url={guestUrl} />}
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
