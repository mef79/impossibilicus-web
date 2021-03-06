/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SHOW_IMPORT_DIALOG,
  HIDE_IMPORT_DIALOG,
  SHOW_LOAD_DIALOG,
  HIDE_LOAD_DIALOG,
  SHOW_SAVE_DIALOG,
  HIDE_SAVE_DIALOG,
  LOAD_STORY,
  LOAD_STORY_SUCCESS,
  LOAD_STORY_ERROR,
  CLEAR_LOADED_STORY,
  SAVE_CONTENT_ITEM,
  UPDATE_STORY_NAME,
  UPDATE_STORY,
  UPDATE_LAST_SAVED,
  LOCK_LINK,
  UNLOCK_LINK,
  ADD_GATE_TO_SELECTED_LINK,
  REMOVE_GATE_FROM_SELECTED_LINK,
  RESET_STORY,
  TOGGLE_OVERVIEW,
} from './constants'

export function showImportDialog() {
  return {
    type: SHOW_IMPORT_DIALOG,
  }
}

export function hideImportDialog() {
  return {
    type: HIDE_IMPORT_DIALOG,
  }
}

export function showLoadDialog() {
  return {
    type: SHOW_LOAD_DIALOG,
  }
}

export function hideLoadDialog() {
  return {
    type: HIDE_LOAD_DIALOG,
  }
}

export function showSaveDialog() {
  return {
    type: SHOW_SAVE_DIALOG,
  }
}

export function hideSaveDialog() {
  return {
    type: HIDE_SAVE_DIALOG,
  }
}

export function loadStory() {
  return {
    type: LOAD_STORY,
  }
}

export function storyLoaded(story) {
  return {
    type: LOAD_STORY_SUCCESS,
    story,
  }
}

export function storyLoadError(error) {
  return {
    type: LOAD_STORY_ERROR,
    error,
  }
}

export function clearLoadedStory() {
  return {
    type: CLEAR_LOADED_STORY,
  }
}

export function saveContentItem(contentItem) {
  return {
    type: SAVE_CONTENT_ITEM,
    contentItem,
  }
}

export function updateStoryName(name) {
  return {
    type: UPDATE_STORY_NAME,
    name
  }
}

export function updateStory(nodes, links) {
  return {
    type: UPDATE_STORY,
    nodes,
    links
  }
}

export function updateLastSaved(story) {
  return {
    type: UPDATE_LAST_SAVED,
    story
  }
}

export function lockLink(linkId) {
  return {
    type: LOCK_LINK,
    linkId
  }
}

export function unlockLink(linkId) {
  return {
    type: UNLOCK_LINK,
    linkId
  }
}

export function addGateToSelectedLink(linkId, gateType) {
  return {
    type: ADD_GATE_TO_SELECTED_LINK,
    linkId,
    gateType
  }
}

export function removeGateFromSelectedLink(linkId, gateId) {
  return {
    type: REMOVE_GATE_FROM_SELECTED_LINK,
    linkId,
    gateId
  }
}

export function resetStory() {
  return {
    type: RESET_STORY,
  }
}

export function toggleOverview() {
  return {
    type: TOGGLE_OVERVIEW,
  }
}
