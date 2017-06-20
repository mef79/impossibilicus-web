/*
 *
 * ImportDialog reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SET_VALID,
  SET_NAME,
  SET_FILE,
  RESET_DIALOG,
} from './constants'

const initialState = fromJS({
  isValid: true,
})

function importDialogReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALID:
      const isValid = action.filetype === 'text/plain'
      return state
        .set('isValid', isValid)
    case SET_NAME:
      return state
        .set('name', action.name)
    case SET_FILE:
      return state
        .set('file', action.file)
    case RESET_DIALOG:
      return initialState
    default:
      return state
  }
}

export default importDialogReducer
