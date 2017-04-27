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
  SHOW_SAVE_DIALOG,
  HIDE_SAVE_DIALOG,
  LOAD_STORY,
  LOAD_STORY_SUCCESS,
  SET_CURRENT_STORY,
  CLEAR_STORY_DATA,
  SAVE_CONTENT_ITEM,
  UPDATE_STORY,
} from './constants'

// The initial state of the App
const initialState = fromJS({
  isLoadDialogVisible: false,
  isSaveDialogVisible: false,
  currentStory: '',
  stories: [],
  storyData: {
    nodes: [],
    links: [],
  },
  currentData: {
    nodes: [],
    links: [],
  },
})

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOAD_DIALOG:
      return state
        .set('isLoadDialogVisible', true)
    case HIDE_LOAD_DIALOG:
      return state
        .set('isLoadDialogVisible', false)
    case SHOW_SAVE_DIALOG:
      return state
        .set('isSaveDialogVisible', true)
    case HIDE_SAVE_DIALOG:
      return state
        .set('isSaveDialogVisible', false)
    case LOAD_STORY:
      return state
        .set('loadStory', action.story)
    case SET_CURRENT_STORY:
      return state
        .set('currentStory', action.currentStory)
    case LOAD_STORY_SUCCESS:
      return state
        .set('storyData', fromJS(action.story))
    case CLEAR_STORY_DATA:
      return state
        .set('storyData', fromJS({}))
    case SAVE_CONTENT_ITEM:
      return state
        .set('contentItem', action.contentItem)
    case UPDATE_STORY:
      return state
        .setIn(['currentData', 'nodes'], fromJS(action.nodes))
        .setIn(['currentData', 'links'], fromJS(action.links))
    default:
      return state
  }
}

export default homeReducer
