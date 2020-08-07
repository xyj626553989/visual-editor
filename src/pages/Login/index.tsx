import React from "react";
import { Input, Row, Col, Button } from "antd";
import { RouteChildrenProps, useParams } from "react-router-dom";
import { connect } from "react-redux";
import actions from "@/store/actions/login.action";
interface StateProps {
  from: string;
}
type Props = RouteChildrenProps<any, StateProps> & typeof actions;
const Login = (props: Props) => {
  const params = useParams<StateProps>();
  return (
    <Row>
      <Col>姓名</Col>
      <Col span={9}>
        <Input />
      </Col>
      <Button onClick={() => props.login(params.from)}>登录</Button>
    </Row>
  );
};

export default connect(null, actions)(Login);
