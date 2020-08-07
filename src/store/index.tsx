import { createHashHistory, History } from "history";
import { applyMiddleware, createStore, Middleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import createRootReducer from "./reducers";
export const history: History = createHashHistory();
const plugins: Middleware[] = [thunk, routerMiddleware(history)];
if (process.env.NODE_ENV === "development") {
    plugins.push(logger);
}
const store = applyMiddleware(...plugins)(createStore)(
    createRootReducer(history)
);

export default store;
