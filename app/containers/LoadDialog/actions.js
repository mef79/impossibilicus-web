import {
  LOAD_ALL_STORIES,
  LOAD_ALL_STORIES_SUCCESS,
  LOAD_ALL_STORIES_ERROR
} from './constants'

export function loadStories() {
  return {
    type: LOAD_ALL_STORIES
  }
}

export function storiesLoaded(stories) {
  return {
    type: LOAD_ALL_STORIES_SUCCESS,
    stories
  }
}

export function storyLoadingError(error) {
  return {
    type: LOAD_ALL_STORIES_ERROR,
    error
  }
}
