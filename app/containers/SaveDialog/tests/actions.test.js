
import {
  changeStoryName,
  setValid,
  saveStory,
} from '../actions'
import {
  CHANGE_STORY_NAME,
  SET_VALID,
  SAVE_STORY,
} from '../constants'

describe('SaveDialog actions', () => {
  describe('CHANGE_STORY_NAME', () => {
    it('has a type of CHANGE_STORY_NAME', () => {
      const expected = {
        type: CHANGE_STORY_NAME
      }
      expect(changeStoryName()).toEqual(expected)
    })
  })
  describe('SET_VALID', () => {
    it('has a type of SET_VALID', () => {
      const expected = {
        type: SET_VALID
      }
      expect(setValid()).toEqual(expected)
    })
  })
  describe('SAVE_STORY', () => {
    it('has a type of SAVE_STORY', () => {
      const expected = {
        type: SAVE_STORY
      }
      expect(saveStory()).toEqual(expected)
    })
  })
})
