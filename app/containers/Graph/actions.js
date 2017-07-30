/*
 *
 * Graph actions
 *
 */

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

export function setListening() {
  return {
    type: SET_LISTENING,
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
    type: INCREMENT_NODE_COUNTER,
  }
}

export function incrementLinkCounter() {
  return {
    type: INCREMENT_LINK_COUNTER,
  }
}

export function setNodeCounter(nodeCounter) {
  return {
    type: SET_NODE_COUNTER,
    nodeCounter,
  }
}

export function setLinkCounter(linkCounter) {
  return {
    type: SET_LINK_COUNTER,
    linkCounter,
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

export function setShouldRedraw(shouldRedraw) {
  return {
    type: SET_SHOULD_REDRAW,
    shouldRedraw,
  }
}

export function setShouldInitialize(shouldInitialize) {
  return {
    type: SET_SHOULD_INITIALIZE,
    shouldInitialize,
  }
}
