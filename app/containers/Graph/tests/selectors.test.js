import { fromJS } from 'immutable'
import {
  isListening,
  getSelectedNodeId,
  getSelectedLinkId,
  getNodeCount,
  getLinkCount,
  getLinkingNode,
  getMousedownNode,
  getMousedownLink,
  getShouldRedraw,
  getShouldInitialize,
} from '../selectors'

const graphState = fromJS({
  isListening: true,
  selectedNodeId: 'node-selected',
  selectedLinkId: 'link-selected',
  nodeCounter: 4,
  linkCounter: 5,
  linkingNode: 'node-linking',
  mousedownNode: 'node-mousedown',
  mousedownLink: 'link-mousedown',
  dimensions: {
    width: window.innerWidth >= 1256 ? window.innerWidth - 600 : window.innerWidth - 20,
    height: window.innerWidth >= 1256 ? window.innerHeight - 200 : (window.innerHeight / 2) - 30,
  },
  shouldRedraw: false,
  shouldInitialize: true,
})

const mockedState = fromJS({
  graph: graphState,
})

describe('isListening', () => {
  it('should select key map', () => {
    const isListeningSelector = isListening()
    expect(isListeningSelector(mockedState)).toEqual(true)
  })
})

describe('getSelectedNodeId', () => {
  it('should select handlers', () => {
    const getSelectedNodeIdSelector = getSelectedNodeId()
    expect(getSelectedNodeIdSelector(mockedState)).toEqual('node-selected')
  })
})

describe('getSelectedLinkId', () => {
  it('should select handlers', () => {
    const getSelectedLinkIdSelector = getSelectedLinkId()
    expect(getSelectedLinkIdSelector(mockedState)).toEqual('link-selected')
  })
})

describe('getNodeCount', () => {
  it('should select handlers', () => {
    const getNodeCountSelector = getNodeCount()
    expect(getNodeCountSelector(mockedState)).toEqual(4)
  })
})

describe('getLinkCount', () => {
  it('should select handlers', () => {
    const getLinkCountSelector = getLinkCount()
    expect(getLinkCountSelector(mockedState)).toEqual(5)
  })
})

describe('getLinkingNode', () => {
  it('should select handlers', () => {
    const getLinkingNodeSelector = getLinkingNode()
    expect(getLinkingNodeSelector(mockedState)).toEqual('node-linking')
  })
})

describe('getMousedownNode', () => {
  it('should select handlers', () => {
    const getMousedownNodeSelector = getMousedownNode()
    expect(getMousedownNodeSelector(mockedState)).toEqual('node-mousedown')
  })
})

describe('getMousedownLink', () => {
  it('should select handlers', () => {
    const getMousedownLinkSelector = getMousedownLink()
    expect(getMousedownLinkSelector(mockedState)).toEqual('link-mousedown')
  })
})

describe('getShouldRedraw', () => {
  it('should select handlers', () => {
    const getShouldRedrawSelector = getShouldRedraw()
    expect(getShouldRedrawSelector(mockedState)).toEqual(false)
  })
})

describe('getShouldInitialize', () => {
  it('should select handlers', () => {
    const getShouldInitializeSelector = getShouldInitialize()
    expect(getShouldInitializeSelector(mockedState)).toEqual(true)
  })
})
