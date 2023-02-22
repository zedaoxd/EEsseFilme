import axios from "axios";
import jwtDecode from "jwt-decode";
import qs from "qs";
import { createContext, useCallback, useEffect, useState } from "react";
import Role from "../@Types/role";
import User from "../@Types/user";
import { api, BASE_URL } from "../services/api/api";
import { getCurrentUser } from "../services/api/user";
import { getToken } from "../utils/storage";

type UserLogin = {
  username: string;
  password: string;
};

type RoleOptions = "ROLE_ADMIN" | "ROLE_MEMBER";

type AuthContextType = {
  login: (userLogin: UserLogin) => Promise<void>;
  isAuthenticated: () => boolean;
  logout: () => void;
  user: User | undefined;
  setUser: (value: React.SetStateAction<User | undefined>) => void;
  hasRole: (role: RoleOptions) => boolean | undefined;
};

type Props = {
  children: React.ReactNode;
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

    const base_url = BASE_URL.replace("/api", "");

    return await axios({
      method: "POST",
      baseURL: base_url,
      url: "/oauth/token",
      data: data,
      headers: headers,
    });
  }, []);

  const login = useCallback(async (userLogin: UserLogin) => {
    await requestBackendLogin(userLogin).then((r) =>
      localStorage.setItem(TOKEN_KEY, JSON.stringify(r.data))
    );
    const token = getToken();
    api.defaults.headers.common["Authorization"] =
      token && "Bearer " + getToken();
    return await getCurrentUser().then((r) => setUser(r));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(undefined);
  }, []);

  const isAuthenticated = useCallback(() => {
    try {
      const token = getToken();
      if (!token) return false;

      const tokenData = jwtDecode(token) as TokenData;
      return tokenData.exp * 1_000 > Date.now() ? true : false;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    getCurrentUser().then((r) => setUser(r));
  }, []);

  const hasRole = (role: RoleOptions) => {
    return user?.roles.some((r) => r.name === role);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        user,
        setUser,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
