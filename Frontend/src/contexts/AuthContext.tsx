import axios from "axios";
import jwtDecode from "jwt-decode";
import qs from "qs";
import { createContext, useCallback } from "react";
import Role from "../@Types/role";

type UserLogin = {
  username: string;
  password: string;
};

type AuthContextType = {
  login: (userLogin: UserLogin) => Promise<void>;
  isAuthenticated: () => boolean;
  logout: () => void;
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
    return requestBackendLogin(userLogin).then((r) =>
      localStorage.setItem(TOKEN_KEY, JSON.stringify(r.data))
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  const isAuthenticated = useCallback(() => {
    try {
      const str = localStorage.getItem(TOKEN_KEY) as string;
      const loginResponse = JSON.parse(str) as LoginResponse;
      const tokenData = jwtDecode(loginResponse.access_token) as TokenData;
      return tokenData.exp * 1_000 > Date.now() ? true : false;
    } catch {
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
