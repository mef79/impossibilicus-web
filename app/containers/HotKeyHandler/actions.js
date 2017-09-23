/*
 *
 * HotKeyHandler actions
 *
 */

import {
  ADD_TO_HANDLERS,
  ADD_TO_KEYMAP,
  REMOVE_FROM_HANDLERS,
  REMOVE_FROM_KEYMAP,
} from './constants'

export function addToHandlers(handlers) {
  return {
    type: ADD_TO_HANDLERS,
    handlers
  }
}

export function addToKeyMap(keys) {
  return {
    type: ADD_TO_KEYMAP,
    keys
  }
}

export function removeFromHandlers(handlers) {
  return {
    type: REMOVE_FROM_HANDLERS,
    handlers
  }
}

export function removeFromKeyMap(keys) {
  return {
    type: REMOVE_FROM_KEYMAP,
    keys
  }
}
