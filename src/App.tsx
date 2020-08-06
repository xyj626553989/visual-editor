import React, { FunctionComponent, useEffect } from 'react'
import Header from '@/components/Header'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout } from 'antd'
import { cancelRequestHandle } from '@/utils/request'
import './index.less'
const { Content, Footer } = Layout
const App: FunctionComponent<RouteComponentProps> = (props) => {
  useEffect(() => {
    props.history.listen(cancelRequestHandle)
  }, [])

  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 50px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="site-layout-content"> {props.children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}
export default withRouter(App)
