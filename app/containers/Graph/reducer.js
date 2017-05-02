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
  SET_DIMENSIONS,
} from './constants'

const initialState = fromJS({
  isListening: true,
  dimensions: {
    width: window.innerWidth >= 1256 ? window.innerWidth - 600 : window.innerWidth - 20,
    height: window.innerWidth >= 1256 ? window.innerHeight - 200 : (window.innerHeight / 2) - 30,
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
        .set('selectedNode', fromJS(action.selectedNode))
    case SET_DIMENSIONS:
      return state
        .set('dimensions', fromJS(action.dimensions))
    default:
      return state
  }
}

export default graphReducer
