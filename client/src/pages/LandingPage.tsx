import React, { useState, useContext } from "react";
import { Form } from "antd";

import Axios from "../axios-url";
import { GuestUrlType } from "../types/GuestUrl";
import { AuthContext } from "../context/AuthContext";
import UrlForm from "../components/Forms/UrlForm";
import UrlResponse from "../components/UI/Card/UrlResponse";

const LandingPage: React.FC = () => {
  const { csrfToken } = useContext(AuthContext);
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
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
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
      <div style={{ marginTop: 45 }}>
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
