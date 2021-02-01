import { ReducersMapObject, Reducer } from "redux";
import { History } from "history";
import { connectRouter, RouterState } from "connected-react-router";
import { combineReducers } from "redux-immer";
import produce from "immer";
export interface CombinedState {
  router: RouterState;
}
const createRootReducer = (history: History) => {
  const reducers: ReducersMapObject<CombinedState, any> = {
    router: connectRouter(history),
  };
  const reducer: Reducer<CombinedState> = combineReducers(produce, reducers);
  return reducer;
};
export default createRootReducer;
