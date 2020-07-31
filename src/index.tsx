import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.less'
import App from './App'
const render = (Component: FunctionComponent) => {
  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <AppContainer>
        <Component />
      </AppContainer>
    </ConfigProvider>,
    document.getElementById('root')
  )
}
if (module.hot) {
  module.hot.accept('./App', () => {
    //因为在App里使用的是export default语法，
    //这里使用的是require,默认不会加载default的，所以需要手动加上
    const NextApp = require('./App').default
    // 重新渲染到 document 里面
    render(NextApp)
  })
}

render(App)
