import React, { useCallback, useReducer } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContext, INITIAL_STATE } from ".";
import { AppContextActions } from "../enum/AppContextActions";
import { appContextReducer } from "./reducer";

type Props = {
  children: React.ReactNode;
};

const client = new QueryClient();

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(appContextReducer, INITIAL_STATE);

  const toggleTheme = useCallback(() => {
    dispatch({
      type: AppContextActions.ToggleTheme,
    });
  }, [dispatch]);

  const setAuthContext = useCallback(() => {
    dispatch({
      type: AppContextActions.SetAuthContext,
    });
  }, [dispatch]);

  return (
    <AppContext.Provider
      value={{ ...INITIAL_STATE, toggleTheme, setAuthContext }}
    >
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
