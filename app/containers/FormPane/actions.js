/*
 *
 * FormPane actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_SELECTED_NODE
} from './constants'

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  }
}

export function updateSelectedNode(values) {
  return {
    type: UPDATE_SELECTED_NODE,
    values
  }
}
