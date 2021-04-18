import React, { useState, createContext, ReactChild, useEffect } from "react";

import Axios from "../axios-url";

type Props = {
  children: ReactChild;
};

type AuthContextType = {
  loggedIn: boolean;
  getLoggedIn: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  async function getLoggedIn() {
    const { data } = await Axios.get("/api/users/loggedIn");
    setLoggedIn(data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};
