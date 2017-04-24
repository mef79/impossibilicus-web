/*
 *
 * Graph reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_LISTENING,
} from './constants'

const initialState = fromJS({
  isListening: true
})

function graphReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case SET_LISTENING:
      return state
        .set('listening', action.isListening)
    default:
      return state
  }
}

export default graphReducer
