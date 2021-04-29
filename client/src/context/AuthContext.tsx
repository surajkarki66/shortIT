import jwt_decode from "jwt-decode";
import React, { useState, createContext, ReactChild, useEffect } from "react";

import Axios from "../axios-url";

type Props = {
  children: ReactChild;
};

type AuthContextType = {
  token: string;
  userId: string;
  fullName: string;
  status: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    Axios.get("/api/users/loggedIn").then((res) => {
      setToken(res.data);
      if (token) {
        const jwtData: any = jwt_decode(res.data);
        setUserId(jwtData._id);
        setFullName(jwtData.firstName + " " + jwtData.lastName);
        setStatus(jwtData.status);
      }
    });
  }, [token, setToken]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        fullName,
        setFullName,
        userId,
        setUserId,
        status,
        setStatus,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
