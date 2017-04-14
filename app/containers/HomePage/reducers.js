/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable'

import {
  SHOW_LOAD_DIALOG,
  HIDE_LOAD_DIALOG
} from './constants'

// The initial state of the App
const initialState = fromJS({
  showLoadDialog: false,
  stories: []
})

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOAD_DIALOG:
      return state
        .set('showLoadDialog', true)
    case HIDE_LOAD_DIALOG:
      return state
        .set('showLoadDialog', false)
    default:
      return state
  }
}

export default homeReducer
