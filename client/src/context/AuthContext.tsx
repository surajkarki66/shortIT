import React, { useState, createContext, ReactChild, useEffect } from "react";

import Axios from "../axios-url";

type Props = {
  children: ReactChild;
};

type AuthContextType = {
  token: string;
  getToken: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState("");

  async function getToken() {
    const { data } = await Axios.get("/api/users/loggedIn");
    setToken(data);
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, getToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};
