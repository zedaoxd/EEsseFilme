import axios from "axios";
import jwtDecode from "jwt-decode";
import qs from "qs";
import { createContext, useCallback, useState } from "react";
import Role from "../@Types/role";
import User from "../@Types/user";
import { api } from "../services/api/api";

type UserLogin = {
  username: string;
  password: string;
};

type AuthContextType = {
  login: (userLogin: UserLogin) => Promise<void>;
  isAuthenticated: () => boolean;
  logout: () => void;
  user: User | undefined;
};

type Props = {
  children: React.ReactNode;
};

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
};

type TokenData = {
  exp: number;
  user_name: string;
  authoritie: Role[];
};

export const AuthContext = createContext({} as AuthContextType);

const CLIENT_ID = "eessefilme";
const CLIENT_SECRET = "eessefilme123";
const TOKEN_KEY = "@E_ESSE_FILME:token";

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();

  const requestBackendLogin = useCallback(async (userLogin: UserLogin) => {
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    };

    const data = qs.stringify({
      ...userLogin,
      grant_type: "password",
    });

    return await axios<LoginResponse>({
      method: "POST",
      baseURL: "http://localhost:8080",
      url: "/oauth/token",
      data: data,
      headers: headers,
    });
  }, []);

  const login = useCallback(async (userLogin: UserLogin) => {
    await requestBackendLogin(userLogin).then((r) =>
      localStorage.setItem(TOKEN_KEY, JSON.stringify(r.data))
    );

    return api
      .get<User>("/users/profile", {
        headers: {
          Authorization: "Bearer " + getLoginResponse()?.access_token,
        },
      })
      .then((r) => setUser(r.data));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(undefined);
  }, []);

  const isAuthenticated = useCallback(() => {
    try {
      const loginResponse = getLoginResponse();
      if (!loginResponse) return false;

      const tokenData = jwtDecode(loginResponse.access_token) as TokenData;
      return tokenData.exp * 1_000 > Date.now() ? true : false;
    } catch {
      return false;
    }
  }, []);

  const getLoginResponse = () => {
    try {
      const str = localStorage.getItem(TOKEN_KEY) as string;
      return JSON.parse(str) as LoginResponse;
    } catch {
      return undefined;
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
