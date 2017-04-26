/*
 *
 * Graph reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_LISTENING,
  SET_SELECTED_NODE,
} from './constants'

const initialState = fromJS({
  isListening: true,
  dimensions: {
    width: 800,
    height: 500,
  }
})

function graphReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case SET_LISTENING:
      return state
        .set('listening', action.isListening)
    case SET_SELECTED_NODE:
      return state
        .set('selectedNode', action.selectedNode)
    default:
      return state
  }
}

export default graphReducer
