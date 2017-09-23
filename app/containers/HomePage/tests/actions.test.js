import {
  showImportDialog,
  hideImportDialog,
  showLoadDialog,
  hideLoadDialog,
  showSaveDialog,
  hideSaveDialog,
  loadStory,
  storyLoaded,
  storyLoadError,
  clearLoadedStory,
  saveContentItem,
  updateStoryName,
  updateStory,
  updateLastSaved,
  lockLink,
  unlockLink,
  resetStory,
  toggleOverview,
} from '../actions'
import {
  SHOW_IMPORT_DIALOG,
  HIDE_IMPORT_DIALOG,
  SHOW_LOAD_DIALOG,
  HIDE_LOAD_DIALOG,
  SHOW_SAVE_DIALOG,
  HIDE_SAVE_DIALOG,
  LOAD_STORY,
  LOAD_STORY_SUCCESS,
  LOAD_STORY_ERROR,
  CLEAR_LOADED_STORY,
  SAVE_CONTENT_ITEM,
  UPDATE_STORY_NAME,
  UPDATE_STORY,
  UPDATE_LAST_SAVED,
  LOCK_LINK,
  UNLOCK_LINK,
  RESET_STORY,
  TOGGLE_OVERVIEW,
} from '../constants'

describe('Graph actions', () => {
  describe('SHOW_IMPORT_DIALOG', () => {
    it('has a type of SHOW_IMPORT_DIALOG', () => {
      const expected = {
        type: SHOW_IMPORT_DIALOG
      }
      expect(showImportDialog()).toEqual(expected)
    })
  })
  describe('HIDE_IMPORT_DIALOG', () => {
    it('has a type of HIDE_IMPORT_DIALOG', () => {
      const expected = {
        type: HIDE_IMPORT_DIALOG
      }
      expect(hideImportDialog()).toEqual(expected)
    })
  })
  describe('SHOW_LOAD_DIALOG', () => {
    it('has a type of SHOW_LOAD_DIALOG', () => {
      const expected = {
        type: SHOW_LOAD_DIALOG
      }
      expect(showLoadDialog()).toEqual(expected)
    })
  })
  describe('HIDE_LOAD_DIALOG', () => {
    it('has a type of HIDE_LOAD_DIALOG', () => {
      const expected = {
        type: HIDE_LOAD_DIALOG
      }
      expect(hideLoadDialog()).toEqual(expected)
    })
  })
  describe('SHOW_SAVE_DIALOG', () => {
    it('has a type of SHOW_SAVE_DIALOG', () => {
      const expected = {
        type: SHOW_SAVE_DIALOG
      }
      expect(showSaveDialog()).toEqual(expected)
    })
  })
  describe('HIDE_SAVE_DIALOG', () => {
    it('has a type of HIDE_SAVE_DIALOG', () => {
      const expected = {
        type: HIDE_SAVE_DIALOG
      }
      expect(hideSaveDialog()).toEqual(expected)
    })
  })
  describe('LOAD_STORY', () => {
    it('has a type of LOAD_STORY', () => {
      const expected = {
        type: LOAD_STORY
      }
      expect(loadStory()).toEqual(expected)
    })
  })
  describe('LOAD_STORY_SUCCESS', () => {
    it('has a type of LOAD_STORY_SUCCESS', () => {
      const expected = {
        type: LOAD_STORY_SUCCESS
      }
      expect(storyLoaded()).toEqual(expected)
    })
  })
  describe('LOAD_STORY_ERROR', () => {
    it('has a type of LOAD_STORY_ERROR', () => {
      const expected = {
        type: LOAD_STORY_ERROR
      }
      expect(storyLoadError()).toEqual(expected)
    })
  })
  describe('CLEAR_LOADED_STORY', () => {
    it('has a type of CLEAR_LOADED_STORY', () => {
      const expected = {
        type: CLEAR_LOADED_STORY
      }
      expect(clearLoadedStory()).toEqual(expected)
    })
  })
  describe('SAVE_CONTENT_ITEM', () => {
    it('has a type of SAVE_CONTENT_ITEM', () => {
      const expected = {
        type: SAVE_CONTENT_ITEM
      }
      expect(saveContentItem()).toEqual(expected)
    })
  })
  describe('UPDATE_STORY_NAME', () => {
    it('has a type of UPDATE_STORY_NAME', () => {
      const expected = {
        type: UPDATE_STORY_NAME
      }
      expect(updateStoryName()).toEqual(expected)
    })
  })
  describe('UPDATE_STORY', () => {
    it('has a type of UPDATE_STORY', () => {
      const expected = {
        type: UPDATE_STORY
      }
      expect(updateStory()).toEqual(expected)
    })
  })
  describe('UPDATE_LAST_SAVED', () => {
    it('has a type of UPDATE_LAST_SAVED', () => {
      const expected = {
        type: UPDATE_LAST_SAVED
      }
      expect(updateLastSaved()).toEqual(expected)
    })
  })
  describe('LOCK_LINK', () => {
    it('has a type of LOCK_LINK', () => {
      const expected = {
        type: LOCK_LINK
      }
      expect(lockLink()).toEqual(expected)
    })
  })
  describe('UNLOCK_LINK', () => {
    it('has a type of UNLOCK_LINK', () => {
      const expected = {
        type: UNLOCK_LINK
      }
      expect(unlockLink()).toEqual(expected)
    })
  })
  describe('resetStory', () => {
    it('should handle resetStory action correctly', () => {
      const expected = {
        type: RESET_STORY
      }
      expect(resetStory()).toEqual(expected)
    })
  })
  describe('toggleOverview', () => {
    it('should handle toggleOverview action correctly', () => {
      const expected = {
        type: TOGGLE_OVERVIEW
      }
      expect(toggleOverview()).toEqual(expected)
    })
  })
})
