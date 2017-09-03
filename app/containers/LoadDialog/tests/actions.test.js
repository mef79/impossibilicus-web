
import {
  loadStories,
  storiesLoaded,
  storyLoadingError,
} from '../actions'
import {
  LOAD_ALL_STORIES,
  LOAD_ALL_STORIES_SUCCESS,
  LOAD_ALL_STORIES_ERROR,
} from '../constants'

describe('LoadDialog actions', () => {
  describe('LOAD_ALL_STORIES', () => {
    it('has a type of LOAD_ALL_STORIES', () => {
      const expected = {
        type: LOAD_ALL_STORIES
      }
      expect(loadStories()).toEqual(expected)
    })
  })
  describe('LOAD_ALL_STORIES_SUCCESS', () => {
    it('has a type of LOAD_ALL_STORIES_SUCCESS', () => {
      const expected = {
        type: LOAD_ALL_STORIES_SUCCESS
      }
      expect(storiesLoaded()).toEqual(expected)
    })
  })
  describe('LOAD_ALL_STORIES_ERROR', () => {
    it('has a type of LOAD_ALL_STORIES_ERROR', () => {
      const expected = {
        type: LOAD_ALL_STORIES_ERROR
      }
      expect(storyLoadingError()).toEqual(expected)
    })
  })
})
