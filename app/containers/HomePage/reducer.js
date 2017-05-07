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
  CLEAR_LOADED_STORY,
  SAVE_CONTENT_ITEM,
  UPDATE_STORY,
} from './constants'

// The initial state of the App
const initialState = fromJS({
  isLoadDialogVisible: false,
  isSaveDialogVisible: false,
  currentStoryName: '',
  loadedStory: {},
  currentData: {
    storyName: '',
    nodes: [],
    links: [],
  },
})

function homeReducer(state = initialState, action) {
  switch (action.type) {
    // showing/hiding dialogs
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

    // loading an individual story
    case LOAD_STORY: // fire off event to make request for story
      return state
        .set('loadStory', action.story)
    case LOAD_STORY_SUCCESS: // story loaded: put the data into the store
      return state
        .set('loadedStory', fromJS(action.story))
        .set('currentStoryName', action.story.name)
    case CLEAR_LOADED_STORY: // loaded story has been processed: clear from the store
      return state
        .set('loadedStory', fromJS({}))

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
