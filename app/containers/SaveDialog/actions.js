/*
 *
 * SaveDialog actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_STORY_NAME,
  SET_VALID,
  SAVE_STORY,
} from './constants'

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  }
}

export function changeStoryName(storyName) {
  return {
    type: CHANGE_STORY_NAME,
    storyName
  }
}

export function setValid(name, existing) {
  return {
    type: SET_VALID,
    name,
    existing
  }
}

export function saveStory() {
  return {
    type: SAVE_STORY,
  }
}
