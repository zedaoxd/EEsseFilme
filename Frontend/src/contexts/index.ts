import { createContext } from "react";
import { ThemeName } from "../enum/ThemeName";


export const INITIAL_STATE = {
    themeName: ThemeName.dark,
    toggleTheme: () => {},
    authenticated: false,
    setAuthContext: () => {},
}

export type InitialStateType = typeof INITIAL_STATE;

export const AppContext = createContext<InitialStateType>(INITIAL_STATE);