import React, { useContext, useState, useEffect } from "react";
import { Spin } from "antd";

import Axios from "../axios-url";
import Url from "../containers/Url/Url";
import { UserType } from "../types/User";
import { AuthContext } from "../context/AuthContext";

const HomePage: React.FC = (props) => {
  const { token, setStatus, setFullName } = useContext(AuthContext);
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      Axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          const { data } = res;
          setUser(data.data);
          setStatus(data.data.status);
          setFullName(data.data.firstName + " " + data.data.lastName);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [setFullName, setStatus, token]);

  return (
    <div className="landingPage">
      {user && !loading ? (
        <Url user={user} />
      ) : (
        <div className="spin">
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
