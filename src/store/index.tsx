import { createHashHistory, History } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import createRootReducer from "./reducers";
export const history: History = createHashHistory();
const store = applyMiddleware(
  thunk,
  routerMiddleware(history),
  logger
)(createStore)(createRootReducer(history));

export default store;
