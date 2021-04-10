import React, { useState } from "react";

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
  const formSubmitHandler = (value: any) => {
    if (value) {
      const data = { longUrl: value.Url };
      setLoading(true);
      generateUrl(data);
    }
  };
  const generateUrl = async (inputData: { longUrl: string }) => {
    try {
      const response = await Axios.post("/api/url/generateGuestUrl", inputData);
      const { data } = response;
      setGuestUrl(data.data);
      setLoading(false);
      setGuestUrlError("");
    } catch (error) {
      const { data } = error.response;
      setGuestUrlError(data.data.error);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="landingPage">
        <UrlForm
          loading={loading}
          formSubmitHandler={formSubmitHandler}
          customError={guestUrlError}
        />
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
