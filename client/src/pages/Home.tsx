import React, { useContext, useState, useEffect } from "react";
import { Spin } from "antd";

import Axios from "../axios-url";
import Url from "../containers/Url/Url";
import { AuthContext } from "../context/AuthContext";

const HomePage: React.FC = () => {
  const { token, setStatus, setFullName, urls, setUrls } = useContext(
    AuthContext
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      Axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          const { data } = res;
          setUrls(data.data.urls);
          setStatus(data.data.status);
          setFullName(data.data.firstName + " " + data.data.lastName);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [setFullName, setStatus, token, setUrls]);
  return (
    <div className="landingPage">
      {urls && !loading ? (
        <Url urls={urls} />
      ) : (
        <div className="spin">
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
