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
  UPDATE_LAST_SAVED,
} from './constants'

// The initial state of the App
const initialState = fromJS({
  isLoadDialogVisible: false,
  isSaveDialogVisible: false,
  loadedStory: {},
  currentData: {
    nodes: [],
    links: [],
  },
  lastSavedData: {},
  selectedNode: {},
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
        .set('lastSavedData', fromJS(action.story))
        .setIn(['currentData', 'name'], action.story.name)
        .setIn(['currentData', '_id'], action.story._id)
    case CLEAR_LOADED_STORY: // loaded story has been processed: clear from the store
      return state
        .set('loadedStory', fromJS({}))

    case SAVE_CONTENT_ITEM:
      const indexToUpdate = state.get('currentData').get('nodes')
        .findIndex(e => e.get('id') === action.contentItem.id)
      return state
        .setIn(['currentData', 'nodes', indexToUpdate, 'title'], action.contentItem.title)
        .setIn(['currentData', 'nodes', indexToUpdate, 'content'], action.contentItem.content)

    case UPDATE_STORY:
      return state
        .setIn(['currentData', 'nodes'], state.get('currentData').get('nodes').mergeDeep(fromJS(action.nodes)))
        .setIn(['currentData', 'links'], state.get('currentData').get('links').mergeDeep(fromJS(action.links)))

    case UPDATE_LAST_SAVED:
      return state
        .set('lastSavedData', fromJS(action.story))
    default:
      return state
  }
}

export default homeReducer
