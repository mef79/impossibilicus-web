/*
 *
 * Graph actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_LISTENING,
  SET_SELECTED_NODE,
} from './constants'

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  }
}

export function setListening() {
  return {
    type: SET_LISTENING
  }
}

export function setSelectedNode(selectedNode) {
  return {
    type: SET_SELECTED_NODE,
    selectedNode,
  }
}
