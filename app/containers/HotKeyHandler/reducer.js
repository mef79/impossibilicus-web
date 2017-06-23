/*
 *
 * HotKeyHandler reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  ADD_TO_HANDLERS,
  ADD_TO_KEYMAP,
  REMOVE_FROM_HANDLERS,
  REMOVE_FROM_KEYMAP
} from './constants'

const initialState = fromJS({
  handlers: { testLog: () => 1 },
  keyMap: { testLog: 'shift + l' }
})

function hotKeyHandlerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case ADD_TO_HANDLERS:
      return state
        .set('handlers', state.get('handlers').mergeDeep(fromJS(action.handlers)))
    case ADD_TO_KEYMAP:
      return state
        .set('keyMap', state.get('keyMap').mergeDeep(fromJS(action.keys)))
    case REMOVE_FROM_KEYMAP:
      return state
        .set('keyMap', state.get('keyMap').delete(fromJS(action.keys)))
    case REMOVE_FROM_HANDLERS:
      return state
        .set('handlers', state.get('handlers').delete(fromJS(action.handlers)))
    default:
      return state
  }
}

export default hotKeyHandlerReducer
