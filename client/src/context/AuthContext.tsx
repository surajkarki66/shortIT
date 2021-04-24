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
  isActive: boolean;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [isActive, setIsActive] = useState(false);

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
      value={{
        token,
        setToken,
        fullName,
        setFullName,
        userId,
        setUserId,
        isActive,
        setIsActive,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
