import React, {
  useState,
  createContext,
  ReactChild,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import Cookie from "js-cookie";
import Axios from "../axios-url";
import { UrlType } from "../types/Url";

type Props = {
  children: ReactChild;
};

type AuthContextType = {
  token?: string;
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
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  getToken: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState(
    Cookie.get("token") || Cookie.get("rememberMe")
  );
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
  const getToken = useCallback(async () => {
    try {
      const { data } = await Axios.get("/api/users/loggedIn");
      setToken(data);
      const user = await Axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${data}` },
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
  }, []);

  useEffect(() => {
    getToken();
  }, [getToken]);

  const memoedValue = useMemo(
    () => ({
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
      getToken,
    }),
    [
      token,

      userId,

      status,

      fullName,

      firstName,

      lastName,

      email,

      role,

      createdAt,

      updatedAt,

      urls,

      csrfToken,

      getToken,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
