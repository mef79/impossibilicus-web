import {
  setSelectedStoryName,
} from '../actions'
import {
  SET_SELECTED_STORY
} from '../constants'

describe('StoryList actions', () => {
  describe('SET_SELECTED_STORY', () => {
    it('has a type of SET_SELECTED_STORY', () => {
      const expected = {
        type: SET_SELECTED_STORY
      }
      expect(setSelectedStoryName()).toEqual(expected)
    })
  })
})
