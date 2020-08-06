import React, { LazyExoticComponent, FunctionComponent, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Protect from '@/components/Protect'
import App from '@/App'
export interface RouterItem {
  path: string
  protect: boolean
  component: LazyExoticComponent<any>
  name: string
  strict?: boolean
}

//require.context()是webpack语法，创建自己的（模块）上下文。
//三个参数：搜索文件夹目录，是否搜索子目录，匹配文件的正则表达式
const files = require.context('./', false, /\.router.tsx$/)
const routes: RouterItem[] = []
files.keys().forEach((key: string) => {
  routes.push(...files(key).default)
})

const Router: FunctionComponent = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <App>
          {routes.map((item, index) => {
            if (!item.protect) {
              return (
                <Route
                  strict={item.strict}
                  key={index}
                  path={item.path}
                  component={item.component}
                />
              )
            } else {
              return (
                <Protect
                  strict={item.strict}
                  key={index}
                  path={item.path}
                  component={item.component}
                />
              )
            }
          })}
        </App>
      </Switch>
    </Suspense>
  )
}

export default Router
