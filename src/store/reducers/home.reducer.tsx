import { AnyAction } from "redux";
import * as types from "@/store/action-types";
export interface HomeState {
  number: number;
}
const initState: HomeState = {
  number: 1,
};
const HomeReducer = (state: HomeState = initState, action: AnyAction) => {
  switch (action.type) {
    case types.ADD:
      state.number = state.number + 1;
      return state;
    default:
      return state;
  }
};
export default HomeReducer;
