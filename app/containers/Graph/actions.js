/*
 *
 * Graph actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_LISTENING,
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
