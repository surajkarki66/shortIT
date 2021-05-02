import React, { useContext, useState, useEffect } from "react";
import { Spin } from "antd";

import Url from "../containers/Url/Url";
import { AuthContext } from "../context/AuthContext";
import Axios from "../axios-url";

export type UrlType = {
  _id: string;
  accessedDates?: Date[];
  code: string;
  createdAt: Date;
  longUrl: string;
  shortUrl: string;
  updatedAt: Date;
  userId: string;
  title?: string;
};

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  urls: UrlType[];
};

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
