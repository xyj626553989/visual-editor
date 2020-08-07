import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import zhCN from "antd/es/locale/zh_CN";
import Router from "@/router";
import store, { history } from "@/store";
const render = (Component: FunctionComponent) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConfigProvider locale={zhCN}>
            <Component />
          </ConfigProvider>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept("@/router", () => {
    //因为在App里使用的是export default语法，
    //这里使用的是require,默认不会加载default的，所以需要手动加上
    const NextApp = require("@/router").default;
    // 重新渲染到 document 里面
    render(NextApp);
  });
}

render(Router);
