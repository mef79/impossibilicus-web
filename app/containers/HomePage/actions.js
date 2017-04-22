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
  SHOW_LOAD_DIALOG,
  HIDE_LOAD_DIALOG,
  LOAD_STORY,
  LOAD_STORY_SUCCESS,
  LOAD_STORY_ERROR,
  SET_CURRENT_STORY,
  CLEAR_STORY_DATA,
  SAVE_CONTENT_ITEM,
} from './constants'

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

export function setCurrentStory(currentStory) {
  return {
    type: SET_CURRENT_STORY,
    currentStory,
  }
}

export function clearStoryData() {
  return {
    type: CLEAR_STORY_DATA,
  }
}

export function saveContentItem(contentItem) {
  return {
    type: SAVE_CONTENT_ITEM,
    contentItem,
  }
}
