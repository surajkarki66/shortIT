import React, { useContext, useState, useEffect } from "react";
import { Form } from "antd";

import UrlForm from "../components/Forms/UrlForm";
import Url from "../components/UI/Card/Url";
import { AuthContext } from "../context/AuthContext";
import Axios from "../axios-url";

export type UrlType = {
  accessedDates?: Date[];
  code: string;
  createdAt: Date;
  longUrl: string;
  shortUrl: string;
  updatedAt: Date;
  userId: string;
  title?: string;
};

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  urls: UrlType[];
};

const HomePage: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [url, setUrl] = useState<UrlType>();
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);
  const [urlError, setUrlError] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    Axios.get("/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const { data } = res;
      setUser(data.data);
      setLoading(false);
    });
  }, [token]);

  const formSubmitHandler = (value: any) => {
    if (value) {
      const data = { longUrl: value.Url };
      setLoading(true);
      generateUrl(data);
    }
  };

  const generateUrl = (inputData: { longUrl: string }) => {
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
    <React.Fragment>
      <div className="landingPage">
        <UrlForm
          form={form}
          formSubmitHandler={formSubmitHandler}
          loading={loading}
          urlError={urlError}
        />

        {url && !loading && <Url url={url} />}
      </div>
    </React.Fragment>
  );
};

export default HomePage;
