/*
 *
 * SaveDialog2 reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  CHANGE_STORY_NAME,
  SET_VALID
} from './constants'

const initialState = fromJS({
  isValid: true
})

function saveDialogReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case CHANGE_STORY_NAME:
      return state
        .set('storyName', action.storyName)
    case SET_VALID:
      const alreadyExists = action.existing.find(e => e === action.name) ? true : false
      return state
        .set('isValid', !alreadyExists)
    default:
      return state
  }
}

export default saveDialogReducer
