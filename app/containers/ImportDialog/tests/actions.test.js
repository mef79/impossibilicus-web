
import {
  setValid,
  setName,
  setFile,
  importStory,
  resetDialog,
} from '../actions'
import {
  SET_VALID,
  SET_NAME,
  SET_FILE,
  IMPORT_STORY,
  RESET_DIALOG,
} from '../constants'

describe('ImportDialog actions', () => {
  describe('SET_VALID', () => {
    it('has a type of SET_VALID', () => {
      const expected = {
        type: SET_VALID
      }
      expect(setValid()).toEqual(expected)
    })
  })
  describe('SET_NAME', () => {
    it('has a type of SET_NAME', () => {
      const expected = {
        type: SET_NAME
      }
      expect(setName()).toEqual(expected)
    })
  })
  describe('SET_FILE', () => {
    it('has a type of SET_FILE', () => {
      const expected = {
        type: SET_FILE
      }
      expect(setFile()).toEqual(expected)
    })
  })
  describe('IMPORT_STORY', () => {
    it('has a type of IMPORT_STORY', () => {
      const expected = {
        type: IMPORT_STORY
      }
      expect(importStory()).toEqual(expected)
    })
  })
  describe('RESET_DIALOG', () => {
    it('has a type of RESET_DIALOG', () => {
      const expected = {
        type: RESET_DIALOG
      }
      expect(resetDialog()).toEqual(expected)
    })
  })
})
