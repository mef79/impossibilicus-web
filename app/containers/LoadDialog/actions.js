/*
 *
 * LoadDialog actions
 *
 */

import {
  LOAD_STORIES,
  LOAD_STORIES_SUCCESS,
  LOAD_STORIES_ERROR
} from './constants'

/**
 * Load the stories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_STORIES
 */
export function loadStories() {
  return {
    type: LOAD_STORIES
  }
}

/**
 * Dispatched when the stories are loaded by the request saga
 *
 * @param  {array} stories The story data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_STORIES_SUCCESS passing the stories
 */
export function storiesLoaded(stories) {
  return {
    type: LOAD_STORIES_SUCCESS,
    stories
  }
}

/**
 * Dispatched when loading the stories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_STORIES_ERROR passing the error
 */
export function storyLoadingError(error) {
  return {
    type: LOAD_STORIES_ERROR,
    error
  }
}
