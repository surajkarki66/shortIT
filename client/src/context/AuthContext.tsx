import jwt_decode from "jwt-decode";
import React, { useState, createContext, ReactChild, useEffect } from "react";

import Axios from "../axios-url";

type Props = {
  children: ReactChild;
};

type AuthContextType = {
  token: string;
  fullName: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    Axios.get("/api/users/loggedIn").then((res) => {
      setToken(res.data);
      const jwtData: any = jwt_decode(res.data);
      setFullName(jwtData.firstName + " " + jwtData.lastName);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, fullName, setFullName }}>
      {props.children}
    </AuthContext.Provider>
  );
};
