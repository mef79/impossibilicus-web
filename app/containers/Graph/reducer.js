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
  SET_SELECTED_LINK,
  SET_DIMENSIONS,
  INCREMENT_NODE_COUNTER,
  INCREMENT_LINK_COUNTER,
  SET_LINKING_NODE,
  SET_MOUSEDOWN_NODE,
  SET_MOUSEDOWN_LINK,

} from './constants'

const initialState = fromJS({
  isListening: true,
  dimensions: {
    width: window.innerWidth >= 1256 ? window.innerWidth - 600 : window.innerWidth - 20,
    height: window.innerWidth >= 1256 ? window.innerHeight - 200 : (window.innerHeight / 2) - 30,
  },
  selectedNodeId: null,
  nodeCounter: 0,
  linkCounter: 0,
  linkingNode: null,
  mousedownNode: null,
  mousedownLink: null,
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
        .set('selectedNodeId', fromJS(action.selectedNodeId))
    case SET_SELECTED_LINK:
      return state
        .set('selectedLinkId', fromJS(action.selectedLinkId))
    case SET_DIMENSIONS:
      return state
        .set('dimensions', fromJS(action.dimensions))
    case INCREMENT_NODE_COUNTER:
      return state
        .set('nodeCounter', state.get('nodeCounter') + 1)
    case INCREMENT_LINK_COUNTER:
      return state
        .set('linkCounter', state.get('linkCounter') + 1)
    case SET_LINKING_NODE:
      return state
        .set('linkingNode', action.node)
    case SET_MOUSEDOWN_NODE:
      return state
        .set('mousedownNode', action.node)
    case SET_MOUSEDOWN_LINK:
      return state
        .set('mousedownLink', action.link)
    default:
      return state
  }
}

export default graphReducer
