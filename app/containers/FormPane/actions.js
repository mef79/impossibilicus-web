/*
 *
 * FormPane actions
 *
 */

import {
  // UPDATE_SELECTED_NODE,
  UPDATE_FORM_VALUES,
} from './constants'

// export function updateSelectedNode(values) {
//   return {
//     type: UPDATE_SELECTED_NODE,
//     values
//   }
// }

export function updateFormValues(values) {
  return {
    type: UPDATE_FORM_VALUES,
    values
  }
}
