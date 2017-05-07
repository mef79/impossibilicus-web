/*
 *
 * StoryList actions
 *
 */

import {
  SET_SELECTED_STORY,
} from './constants'

export function setSelectedStoryName(storyName) {
  return {
    type: SET_SELECTED_STORY,
    storyName
  }
}
