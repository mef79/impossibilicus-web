/*
 *
 * Graph reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SET_LISTENING,
  SET_SELECTED_NODE,
  SET_SELECTED_LINK,
  SET_DIMENSIONS,
  INCREMENT_NODE_COUNTER,
  INCREMENT_LINK_COUNTER,
  SET_NODE_COUNTER,
  SET_LINK_COUNTER,
  SET_LINKING_NODE,
  SET_MOUSEDOWN_NODE,
  SET_MOUSEDOWN_LINK,
  SET_SHOULD_REDRAW,
  SET_SHOULD_INITIALIZE,
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
  selectedLinkId: null,
  shouldRedraw: false,
})

function graphReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LISTENING:
      return state
        .set('isListening', action.isListening)
    case SET_SELECTED_NODE:
      return state
        .set('selectedNodeId', action.selectedNodeId)
    case SET_SELECTED_LINK:
      return state
        .set('selectedLinkId', action.selectedLinkId)
    case SET_DIMENSIONS:
      return state
        .set('dimensions', action.dimensions)
    case INCREMENT_NODE_COUNTER:
      return state
        .set('nodeCounter', state.get('nodeCounter') + 1)
    case INCREMENT_LINK_COUNTER:
      return state
        .set('linkCounter', state.get('linkCounter') + 1)
    case SET_NODE_COUNTER:
      return state
        .set('nodeCounter', action.nodeCounter)
    case SET_LINK_COUNTER:
      return state
        .set('linkCounter', action.linkCounter)
    case SET_LINKING_NODE:
      return state
        .set('linkingNode', action.node)
    case SET_MOUSEDOWN_NODE:
      return state
        .set('mousedownNode', action.node)
    case SET_MOUSEDOWN_LINK:
      return state
        .set('mousedownLink', action.link)
    case SET_SHOULD_REDRAW:
      return state
        .set('shouldRedraw', action.shouldRedraw)
    case SET_SHOULD_INITIALIZE:
      return state
        .set('shouldInitialize', action.shouldInitialize)
    default:
      return state
  }
}

export default graphReducer
