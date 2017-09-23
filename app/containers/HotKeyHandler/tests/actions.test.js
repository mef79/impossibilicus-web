
import {
  addToHandlers,
  addToKeyMap,
  removeFromHandlers,
  removeFromKeyMap,
} from '../actions'
import {
  ADD_TO_HANDLERS,
  ADD_TO_KEYMAP,
  REMOVE_FROM_HANDLERS,
  REMOVE_FROM_KEYMAP,
} from '../constants'

describe('HotKeyHandler actions', () => {
  describe('ADD_TO_HANDLERS', () => {
    it('has a type of ADD_TO_HANDLERS', () => {
      const expected = {
        type: ADD_TO_HANDLERS
      }
      expect(addToHandlers()).toEqual(expected)
    })
  })
  describe('ADD_TO_KEYMAP', () => {
    it('has a type of ADD_TO_KEYMAP', () => {
      const expected = {
        type: ADD_TO_KEYMAP
      }
      expect(addToKeyMap()).toEqual(expected)
    })
  })
  describe('REMOVE_FROM_HANDLERS', () => {
    it('has a type of REMOVE_FROM_HANDLERS', () => {
      const expected = {
        type: REMOVE_FROM_HANDLERS
      }
      expect(removeFromHandlers()).toEqual(expected)
    })
  })
  describe('REMOVE_FROM_KEYMAP', () => {
    it('has a type of REMOVE_FROM_KEYMAP', () => {
      const expected = {
        type: REMOVE_FROM_KEYMAP
      }
      expect(removeFromKeyMap()).toEqual(expected)
    })
  })
})
