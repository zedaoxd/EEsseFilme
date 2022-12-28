import { InitialStateType, INITIAL_STATE } from ".";
import { AppContextActions } from "../enum/AppContextActions";
import { ThemeName } from "../enum/ThemeName";
import { IDispacthAction } from "../types/IDispacthAction";

export const appContextReducer = (state = INITIAL_STATE, action: IDispacthAction): InitialStateType => {

    switch (action.type) {
        case AppContextActions.ToggleTheme:
            return {
                ...state,
                themeName: state.themeName === ThemeName.dark ? ThemeName.light : ThemeName.dark,
            };
        
        case AppContextActions.SetAuthContext:
            return {
                ...state,
                authenticated: state.authenticated ? false : true,
            }
    
        default:
            throw new Error();
            
    }

}