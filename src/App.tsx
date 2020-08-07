import React, { useEffect, PropsWithChildren } from "react";
import Header from "@/components/Header";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { Layout } from "antd";
import { cancelRequestHandle } from "@/utils/request";
import "./index.less";
const { Content, Footer } = Layout;
type Props = PropsWithChildren<RouteComponentProps>;
const App = (props: Props) => {
    const history = useHistory();
    useEffect(() => {
        history.listen(cancelRequestHandle);
    }, [history]);
    return (
        <Layout>
            <Header />
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content"> {props.children}</div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
};
export default withRouter(App);
