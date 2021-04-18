import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import React, { useState, createContext, ReactChild } from "react";

type Props = {
  children: ReactChild;
};

type UserContextType = {
  userId: string;
  token: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider: React.FC<Props> = (props) => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const jwtToken = Cookies.get("AccessToken");

  let initialState = {
    userId: userId,
    setUserId: setUserId,
    token: token,
    setToken: setToken,
  };

  if (jwtToken) {
    const decoded: any = jwt_decode(jwtToken);
    initialState = {
      ...initialState,
      userId: decoded._id,
      token: jwtToken,
    };
  }

  return (
    <UserContext.Provider value={initialState}>
      {props.children}
    </UserContext.Provider>
  );
};
