import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import React, { useState, createContext, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type UserContextType = {
  userId: string;
  token: string;
  isAuthenticated: boolean;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider: React.FC<Props> = (props) => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const jwtToken = Cookies.get("AccessToken");

  let initialState = {
    userId: userId,
    setUserId: setUserId,
    token: token,
    setToken: setToken,
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
  };

  if (jwtToken) {
    const decoded: any = jwt_decode(jwtToken);
    initialState = {
      ...initialState,
      userId: decoded._id,
      token: jwtToken,
      isAuthenticated: true,
    };
  }

  return (
    <UserContext.Provider value={initialState}>
      {props.children}
    </UserContext.Provider>
  );
};
