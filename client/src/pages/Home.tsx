import React, { useContext, useState, useEffect } from "react";
import { Spin } from "antd";

import Axios from "../axios-url";
import Url from "../containers/Url/Url";
import { AuthContext } from "../context/AuthContext";

const HomePage: React.FC = () => {
  const { token, setStatus, urls, setUrls } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const me = async () => {
      setLoading(true);
      try {
        const { data } = await Axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUrls(data.data.urls);
        setStatus(data.data.status);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    me();
  }, [setStatus, token, setUrls]);
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
