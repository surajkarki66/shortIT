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
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    Axios.get("/api/users/loggedIn").then((res) => {
      setToken(res.data);
      if (token) {
        const jwtData: any = jwt_decode(res.data);
        setUserId(jwtData._id);
        setFullName(jwtData.firstName + " " + jwtData.lastName);
      }
    });
  }, [token, setToken]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, fullName, setFullName, userId, setUserId }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
