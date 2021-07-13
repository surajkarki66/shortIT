import React, { useState, useContext } from "react";
import { Form, Spin } from "antd";

import Axios from "../../axios-url";
import { UrlType } from "../../types/Url";
import { AuthContext } from "../../context/AuthContext";
import UrlForm from "../../components/Forms/UrlForm";
import UrlResponse from "../../components/UI/Card/UrlResponse";

const CreateUrl: React.FC = () => {
  const { token, csrfToken, urls } = useContext(AuthContext);
  const [url, setUrl] = useState<UrlType>();
  const [loading, setLoading] = useState(false);
  const [urlError, setUrlError] = useState("");
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
    Axios.post("/api/url/generateUrl", inputData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const { data } = res;
        setUrl(data.data);
        setLoading(false);
        setUrlError("");
        form.resetFields();
      })
      .catch((error) => {
        const { data } = error.response;
        setUrlError(data.data.error);
        setLoading(false);
        setUrl(undefined);
        form.resetFields();
      });
  };
  return (
    <div style={{ marginTop: 45 }}>
      {!urls ? (
        <div style={{ textAlign: "center", fontSize: "20px", marginTop: 200 }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          <UrlForm
            form={form}
            formSubmitHandler={formSubmitHandler}
            loading={loading}
            urlError={urlError}
          />

          {url && !loading && <UrlResponse url={url} />}
        </>
      )}
    </div>
  );
};

export default CreateUrl;
