import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import { Provider } from "react-redux";
import App from "./App";

import store from "@/store";
const render = (Component: FunctionComponent) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept("./App", () => {
    //因为在App里使用的是export default语法，
    //这里使用的是require,默认不会加载default的，所以需要手动加上
    const NextApp = require("./App").default;
    // 重新渲染到 document 里面
    render(NextApp);
  });
}

render(App);
