import React, { FunctionComponent } from 'react'
import { Input, Row, Col, Button } from 'antd'
import { RouteChildrenProps } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '@/store/actions/login.action'
interface StateProps {
  from: string
}
type Props = RouteChildrenProps<any, StateProps> & typeof actions
const Login: FunctionComponent<Props> = (props) => {
  return (
    <Row>
      <Col>姓名</Col>
      <Col span={9}>
        <Input />
      </Col>
      <Button
        onClick={() =>
          props.login(props.location&&props.location.state && props.location.state.from)
        }
      >
        登录
      </Button>
    </Row>
  )
}

export default connect(null, actions)(Login)
