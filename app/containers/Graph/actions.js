/*
 *
 * Graph actions
 *
 */

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

export function setSelectedNode(selectedNodeId) {
  return {
    type: SET_SELECTED_NODE,
    selectedNodeId,
  }
}

export function setSelectedLink(selectedLinkId) {
  return {
    type: SET_SELECTED_LINK,
    selectedLinkId,
  }
}

export function setDimensions(dimensions) {
  return {
    type: SET_DIMENSIONS,
    dimensions,
  }
}

export function incrementNodeCounter() {
  return {
    type: INCREMENT_NODE_COUNTER
  }
}

export function incrementLinkCounter() {
  return {
    type: INCREMENT_LINK_COUNTER
  }
}

export function setLinkingNode(node) {
  return {
    type: SET_LINKING_NODE,
    node,
  }
}

export function setMousedownNode(node) {
  return {
    type: SET_MOUSEDOWN_NODE,
    node,
  }
}

export function setMousedownLink(link) {
  return {
    type: SET_MOUSEDOWN_LINK,
    link,
  }
}
