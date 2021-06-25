import React, { useState, createContext, ReactChild, useEffect } from "react";

import Axios from "../axios-url";
import { UrlType } from "../types/Url";

type Props = {
  children: ReactChild;
};

type AuthContextType = {
  token: string;
  userId: string;
  status: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  urls?: UrlType[];
  csrfToken: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setCreatedAt: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setUpdatedAt: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setUrls: React.Dispatch<React.SetStateAction<UrlType[] | undefined>>;
  setCsrfToken: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState<Date>();
  const [updatedAt, setUpdatedAt] = useState<Date>();
  const [urls, setUrls] = useState<UrlType[]>();
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const { data } = await Axios.get("/api/users/loggedIn");
      if (data) {
        setToken(data);
        if (token !== "") {
          try {
            const user = await Axios.get("/api/users/me", {
              headers: { Authorization: `Bearer ${token}` },
            });
            const me = user.data.data;
            setUserId(me._id);
            setFullName(me.firstName + " " + me.lastName);
            setFirstName(me.firstName);
            setLastName(me.lastName);
            setEmail(me.email);
            setRole(me.role);
            setCreatedAt(me.createdAt);
            setUpdatedAt(me.updatedAt);
            setUrls(me.urls);
            setStatus(me.status);
          } catch (error) {
            setUserId("");
            setFullName("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setRole("");
            setCreatedAt(undefined);
            setUpdatedAt(undefined);
            setUrls(undefined);
            setStatus("");
          }
        }
      }
    };
    getToken();
  }, [token]);

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
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        role,
        setRole,
        createdAt,
        setCreatedAt,
        updatedAt,
        setUpdatedAt,
        urls,
        setUrls,
        csrfToken,
        setCsrfToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
