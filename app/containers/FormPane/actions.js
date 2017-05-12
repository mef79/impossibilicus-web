/*
 *
 * FormPane actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_SELECTED_NODE,
  UPDATE_FORM_VALUES,
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

export function updateFormValues(values) {
  return {
    type: UPDATE_FORM_VALUES,
    values
  }
}
