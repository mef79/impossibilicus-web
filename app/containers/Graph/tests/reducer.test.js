import { fromJS } from 'immutable'
import graphReducer from '../reducer'
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

describe('graphReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      isListening: true,
      dimensions: {
        width: window.innerWidth >= 1256 ? window.innerWidth - 600 : window.innerWidth - 20,
        height: window.innerWidth >= 1256 ? window.innerHeight - 200 : (window.innerHeight / 2) - 30,
      },
      selectedNodeId: null,
      nodeCounter: 0,
      linkCounter: 0,
      linkingNode: null,
      mousedownNode: null,
      mousedownLink: null,
      selectedLinkId: null,
      shouldRedraw: false,
    })
  })
  it('returns the initial state', () => {
    const expectedResult = state
    expect(graphReducer(undefined, {})).toEqual(expectedResult)
  })
  it('should handle the setListening action correctly', () => {
    const expectedResult = state.set('isListening', false)
    expect(graphReducer(state, setListening(false))).toEqual(expectedResult)
  })
  it('should handle the setSelectedNode action correctly', () => {
    const expectedResult = state.set('selectedNodeId', 'node-1')
    expect(graphReducer(state, setSelectedNode('node-1'))).toEqual(expectedResult)
  })
  it('should handle the setSelectedLink action correctly', () => {
    const expectedResult = state.set('selectedLinkId', 'link-1')
    expect(graphReducer(state, setSelectedLink('link-1'))).toEqual(expectedResult)
  })
  it('should handle the setDimensions action correctly', () => {
    const expectedResult = state.set('dimensions', { width: 200, height: 200 })
    expect(graphReducer(state, setDimensions({ width: 200, height: 200 }))).toEqual(expectedResult)
  })
  it('should handle the incrementNodeCounter action correctly', () => {
    const expectedResult = state.set('nodeCounter', 1)
    expect(graphReducer(state, incrementNodeCounter(1))).toEqual(expectedResult)
  })
  it('should handle the incrementLinkCounter action correctly', () => {
    const expectedResult = state.set('linkCounter', 1)
    expect(graphReducer(state, incrementLinkCounter(1))).toEqual(expectedResult)
  })
  it('should handle the setNodeCounter action correctly', () => {
    const expectedResult = state.set('nodeCounter', 5)
    expect(graphReducer(state, setNodeCounter(5))).toEqual(expectedResult)
  })
  it('should handle the setLinkCounter action correctly', () => {
    const expectedResult = state.set('linkCounter', 4)
    expect(graphReducer(state, setLinkCounter(4))).toEqual(expectedResult)
  })
  it('should handle the setLinkingNode action correctly', () => {
    const expectedResult = state.set('linkingNode', 'link-1')
    expect(graphReducer(state, setLinkingNode('link-1'))).toEqual(expectedResult)
  })
  it('should handle the setMousedownNode action correctly', () => {
    const expectedResult = state.set('mousedownNode', 'node-1')
    expect(graphReducer(state, setMousedownNode('node-1'))).toEqual(expectedResult)
  })
  it('should handle the setMousedownLink action correctly', () => {
    const expectedResult = state.set('mousedownLink', 'link-1')
    expect(graphReducer(state, setMousedownLink('link-1'))).toEqual(expectedResult)
  })
  it('should handle the setShouldRedraw action correctly', () => {
    const expectedResult = state.set('shouldRedraw', true)
    expect(graphReducer(state, setShouldRedraw(true))).toEqual(expectedResult)
  })
  it('should handle the setShouldInitialize action correctly', () => {
    const expectedResult = state.set('shouldInitialize', true)
    expect(graphReducer(state, setShouldInitialize(true))).toEqual(expectedResult)
  })
})
