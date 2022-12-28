import { AppContextActions } from "../enum/AppContextActions";

export interface IDispacthAction  {
    type: AppContextActions;
    payload?: any;
}