
import {
  setListening,
  setSelectedNode,
  setSelectedLink,
  setDimensions,
  incrementNodeCounter,
  incrementLinkCounter,
  setNodeCounter,
  setLinkCounter,
  setLinkingNode,
  setMousedownNode,
  setMousedownLink,
  setShouldRedraw,
  setShouldInitialize,
} from '../actions'
import {
  SET_LISTENING,
  SET_SELECTED_NODE,
  SET_SELECTED_LINK,
  SET_DIMENSIONS,
  INCREMENT_NODE_COUNTER,
  INCREMENT_LINK_COUNTER,
  SET_NODE_COUNTER,
  SET_LINK_COUNTER,
  SET_LINKING_NODE,
  SET_MOUSEDOWN_NODE,
  SET_MOUSEDOWN_LINK,
  SET_SHOULD_REDRAW,
  SET_SHOULD_INITIALIZE,
} from '../constants'

describe('Graph actions', () => {
  describe('SET_LISTENING', () => {
    it('has a type of SET_LISTENING', () => {
      const expected = {
        type: SET_LISTENING
      }
      expect(setListening()).toEqual(expected)
    })
  })
  describe('SET_SELECTED_NODE', () => {
    it('has a type of SET_SELECTED_NODE', () => {
      const expected = {
        type: SET_SELECTED_NODE
      }
      expect(setSelectedNode()).toEqual(expected)
    })
  })
  describe('SET_SELECTED_LINK', () => {
    it('has a type of SET_SELECTED_LINK', () => {
      const expected = {
        type: SET_SELECTED_LINK
      }
      expect(setSelectedLink()).toEqual(expected)
    })
  })
  describe('SET_DIMENSIONS', () => {
    it('has a type of SET_DIMENSIONS', () => {
      const expected = {
        type: SET_DIMENSIONS
      }
      expect(setDimensions()).toEqual(expected)
    })
  })
  describe('INCREMENT_NODE_COUNTER', () => {
    it('has a type of INCREMENT_NODE_COUNTER', () => {
      const expected = {
        type: INCREMENT_NODE_COUNTER
      }
      expect(incrementNodeCounter()).toEqual(expected)
    })
  })
  describe('INCREMENT_LINK_COUNTER', () => {
    it('has a type of INCREMENT_LINK_COUNTER', () => {
      const expected = {
        type: INCREMENT_LINK_COUNTER
      }
      expect(incrementLinkCounter()).toEqual(expected)
    })
  })
  describe('SET_NODE_COUNTER', () => {
    it('has a type of SET_NODE_COUNTER', () => {
      const expected = {
        type: SET_NODE_COUNTER
      }
      expect(setNodeCounter()).toEqual(expected)
    })
  })
  describe('SET_LINK_COUNTER', () => {
    it('has a type of SET_LINK_COUNTER', () => {
      const expected = {
        type: SET_LINK_COUNTER
      }
      expect(setLinkCounter()).toEqual(expected)
    })
  })
  describe('SET_LINKING_NODE', () => {
    it('has a type of SET_LINKING_NODE', () => {
      const expected = {
        type: SET_LINKING_NODE
      }
      expect(setLinkingNode()).toEqual(expected)
    })
  })
  describe('SET_MOUSEDOWN_NODE', () => {
    it('has a type of SET_MOUSEDOWN_NODE', () => {
      const expected = {
        type: SET_MOUSEDOWN_NODE
      }
      expect(setMousedownNode()).toEqual(expected)
    })
  })
  describe('SET_MOUSEDOWN_LINK', () => {
    it('has a type of SET_MOUSEDOWN_LINK', () => {
      const expected = {
        type: SET_MOUSEDOWN_LINK
      }
      expect(setMousedownLink()).toEqual(expected)
    })
  })
  describe('SET_SHOULD_REDRAW', () => {
    it('has a type of SET_SHOULD_REDRAW', () => {
      const expected = {
        type: SET_SHOULD_REDRAW
      }
      expect(setShouldRedraw()).toEqual(expected)
    })
  })
  describe('SET_SHOULD_INITIALIZE', () => {
    it('has a type of SET_SHOULD_INITIALIZE', () => {
      const expected = {
        type: SET_SHOULD_INITIALIZE
      }
      expect(setShouldInitialize()).toEqual(expected)
    })
  })
})
