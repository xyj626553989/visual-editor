import { ReducersMapObject, Reducer } from "redux";
import { History } from "history";
import { connectRouter, RouterState } from "connected-react-router";
import { combineReducers } from "redux-immer";
import home, { HomeState } from "./home.reducer";
import login, { LoginState } from "./login.reducer";
import produce from "immer";
export interface CombinedState {
    home: HomeState;
    router: RouterState;
    login: LoginState;
}
const createRootReducer = (history: History) => {
    const reducers: ReducersMapObject<CombinedState, any> = {
        router: connectRouter(history),
        home,
        login,
    };
    const reducer: Reducer<CombinedState> = combineReducers(produce, reducers);
    return reducer;
};
export default createRootReducer;
