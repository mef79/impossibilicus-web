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
  HIDE_LOAD_DIALOG,
  LOAD_STORY,
  LOAD_STORY_SUCCESS,
  SET_CURRENT_STORY
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
    case LOAD_STORY:
      return state
        .set('loadStory', action.story)
    case SET_CURRENT_STORY:
      return state
        .set('currentStory', action.currentStory)
    case LOAD_STORY_SUCCESS:
      return state
        .set('storyData', action.story)
    default:
      return state
  }
}

export default homeReducer
