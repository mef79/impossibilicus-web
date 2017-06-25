/*
 *
 * Stipulations actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_FILTER_TEXT
} from './constants'

export function updateFilterText(filterText) {
  return {
    type: UPDATE_FILTER_TEXT,
    filterText
  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  }
}
