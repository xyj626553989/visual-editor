import { AnyAction } from 'redux'
import * as types from '@/store/action-types'
export interface LoginState {
  token: string
}
const initState: LoginState = {
  token: '',
}
const HomeReducer = (state: LoginState = initState, action: AnyAction) => {
  switch (action.type) {
    case types.Login:
      state.token = action.payload
      return state
    default:
      return state
  }
}
export default HomeReducer
