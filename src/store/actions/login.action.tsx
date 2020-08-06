import { Dispatch } from 'redux'
import * as types from '../action-types'
import { push } from 'connected-react-router'
export default {
  login(path: string) {
    return (dispatch: Dispatch) => {
      dispatch({
        type: types.Login,
        payload: Date.now(),
      })

      dispatch(push(path || '/home'))
    }
  },
}
