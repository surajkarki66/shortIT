import jwt_decode from "jwt-decode";
import React, { useState, createContext, ReactChild, useEffect } from "react";

import Axios from "../axios-url";

type Props = {
  children: ReactChild;
};

type AuthContextType = {
  token: string;
  userId: string;
  status: string;
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    Axios.get("/api/users/loggedIn").then((res) => {
      setToken(res.data);
      if (token) {
        const jwtData: any = jwt_decode(res.data);
        setUserId(jwtData._id);
        setStatus(jwtData.status);
        Axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            const { data } = res;
            setFullName(data.data.firstName + " " + data.data.lastName);
            setStatus(data.data.status);
          })
          .catch((err) => {});
      }
    });
  }, [token, setToken, fullName, setFullName]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
        status,
        setStatus,
        fullName,
        setFullName,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
