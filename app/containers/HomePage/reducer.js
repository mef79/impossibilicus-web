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
  SHOW_IMPORT_DIALOG,
  HIDE_IMPORT_DIALOG,
  SHOW_LOAD_DIALOG,
  HIDE_LOAD_DIALOG,
  SHOW_SAVE_DIALOG,
  HIDE_SAVE_DIALOG,
  LOAD_STORY,
  LOAD_STORY_SUCCESS,
  CLEAR_LOADED_STORY,
  SAVE_CONTENT_ITEM,
  UPDATE_STORY_NAME,
  UPDATE_STORY,
  UPDATE_LAST_SAVED,
  LOCK_LINK,
  UNLOCK_LINK,
  ADD_GATE_TO_SELECTED_LINK,
  REMOVE_GATE_FROM_SELECTED_LINK,
  TOGGLE_OVERVIEW,
} from './constants'

import { RESET_STORY } from 'containers/Graph/constants'

// The initial state of the App
const initialState = fromJS({
  isImportDialogVisible: false,
  isLoadDialogVisible: false,
  isSaveDialogVisible: false,
  loadedStory: {},
  currentData: {
    nodes: [],
    links: [],
  },
  lastSavedData: {},
  selectedNode: {},
  overview: false,
})

function homeReducer(state = initialState, action) {
  switch (action.type) {
    // showing/hiding dialogs
    case SHOW_IMPORT_DIALOG:
      return state.set('isImportDialogVisible', true)
    case HIDE_IMPORT_DIALOG:
      return state.set('isImportDialogVisible', false)
    case SHOW_LOAD_DIALOG:
      return state.set('isLoadDialogVisible', true)
    case HIDE_LOAD_DIALOG:
      return state.set('isLoadDialogVisible', false)
    case SHOW_SAVE_DIALOG:
      return state.set('isSaveDialogVisible', true)
    case HIDE_SAVE_DIALOG:
      return state.set('isSaveDialogVisible', false)

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

    case UPDATE_STORY_NAME:
      return state
        .setIn(['currentData', 'name'], action.name)

    case UPDATE_STORY:
      return state
        .setIn(['currentData', 'nodes'], state.get('currentData').get('nodes').mergeDeep(fromJS(action.nodes)))
        .setIn(['currentData', 'links'], state.get('currentData').get('links').mergeDeep(fromJS(action.links)))

    case UPDATE_LAST_SAVED:
      return state
        .set('lastSavedData', fromJS(action.story))

    case LOCK_LINK:

      const linkToLock = state.get('currentData').get('links')
        .findIndex(e => e.get('id') === action.linkId)
      return state
        .setIn(['currentData', 'links', linkToLock, 'locked'], true)

    case UNLOCK_LINK:
      const linkToUnlock = state.get('currentData').get('links')
        .findIndex(e => e.get('id') === action.linkId)
      return state
        .setIn(['currentData', 'links', linkToUnlock, 'locked'], false)

    case ADD_GATE_TO_SELECTED_LINK:
      const targetLinkIndex = state.get('currentData').get('links').findIndex(e => e.get('id') === action.linkId)
      return state.updateIn(['currentData', 'links', targetLinkIndex, 'gates'],
        gates => gates.push(fromJS({ gateType: action.gateType, id: `${action.linkId}-gate-${gates.size}` })))

    case REMOVE_GATE_FROM_SELECTED_LINK:
      const links = state.get('currentData').get('links')
      const linkIndex = links.findIndex(e => e.get('id') === action.linkId)
      const gateIndex = links.get(linkIndex).get('gates')
        .findIndex(e => e.get('id') === action.gateId)
      return state.deleteIn(['currentData', 'links', linkIndex, 'gates', gateIndex])
    case RESET_STORY:
      return state.set('currentData', initialState)

    case TOGGLE_OVERVIEW:
      return state.set('overview', !state.get('overview'))

    default:
      return state
  }
}

export default homeReducer
