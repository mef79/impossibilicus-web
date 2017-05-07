import { fromJS } from 'immutable'
import {
  SET_SELECTED_STORY,
} from './constants'

const initialState = fromJS({
  selectedStoryName: '',
})

function storyListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_STORY:
      return state
        .set('selectedStoryName', action.storyName)
    default:
      return state
  }
}

export default storyListReducer
