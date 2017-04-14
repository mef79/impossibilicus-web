/*
 *
 * LoadDialog reducer
 *
 */

import { fromJS } from 'immutable'
import {
  LOAD_STORIES,
  LOAD_STORIES_SUCCESS,
  LOAD_STORIES_ERROR
} from './constants'

const initialState = fromJS({
  loading: false,
  error: false,
  stories: []
})

function loadDialogReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STORIES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('stories', [])
    case LOAD_STORIES_SUCCESS:
      return state
        .set('showLoadDialog', true)
        .set('stories', action.stories)
        .set('loading', false)
    case LOAD_STORIES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
    default:
      return state;
  }
}

export default loadDialogReducer
