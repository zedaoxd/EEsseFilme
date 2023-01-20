import jwtDecode from "jwt-decode";

const TOKEN_KEY = "@E_ESSE_FILME:token";

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
  authorities: string[];
};

export const getLoginResponse = () => {
  try {
    const str = localStorage.getItem(TOKEN_KEY) as string;
    return JSON.parse(str) as LoginResponse;
  } catch {
    return undefined;
  }
};

export const getToken = () => {
  return getLoginResponse()?.access_token;
};

export const getTokenData = () => {
  const token = getToken();
  return jwtDecode(token as string) as TokenData;
};
