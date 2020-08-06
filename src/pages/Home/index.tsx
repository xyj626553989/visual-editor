import React, { FunctionComponent, useCallback } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { CombinedState } from '@/store/reducers'
import { useImmer } from 'use-immer'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { HomeState } from '@/store/reducers/home.reducer'
import actions from '@/store/actions/user.action'
import { getUserInfo } from '@/api'
type Props = RouteChildrenProps & HomeState & typeof actions
const Home: FunctionComponent<Props> = (props) => {
  const [counter, setCounter] = useImmer({ number: 1 })
  const changeCounter = useCallback(() => {
    setCounter((counter) => {
      counter.number++
    })
  }, [])
  return (
    <div>
      <div>{props.number}</div>

      <div>{counter.number}</div>
      <Button onClick={props.add}>+</Button>
      <Button onClick={changeCounter}>state++</Button>
      <Button onClick={getUserInfo}>获取数据</Button>
    </div>
  )
}
const mapStateToProps = (state: CombinedState): HomeState => state.home
export default connect(mapStateToProps, actions)(Home)
