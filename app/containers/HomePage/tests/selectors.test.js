import { fromJS } from 'immutable'
import {
  getImportDialogVisibility,
  getLoadDialogVisibility,
  getSaveDialogVisibility,
  getCurrentStory,
  getLoadedStoryData,
  getContentItem,
  getCurrentData,
  getCurrentName,
  getAllNodes,
  getSelectedNode,
  getSelectedLink,
  getLastSavedData,
  getSelectedNodeIncomingLinks,
  getSelectedNodeOutgoingLinks,
  isViewingOverview,
} from '../selectors'

const graphState = fromJS({
  selectedNodeId: 'node-1',
  selectedLinkId: 'link-1',
})
const lastSavedData = fromJS({
  some: 'arbitrary',
  data: 'here',
})
const node1 = fromJS({
  id: 'node-1',
})
const node2 = fromJS({
  id: 'node-2',
})
const linkObject = fromJS({
  id: 'link-1',
  source: node1,
  target: node2,
})
const currentData = fromJS({
  name: 'the name',
  nodes: [node1, node2],
  links: [linkObject],
})
const homePageState = fromJS({
  isImportDialogVisible: false,
  isLoadDialogVisible: false,
  isSaveDialogVisible: false,
  loadedStory: {},
  currentData,
  lastSavedData,
  selectedNode: {},
  overview: false,
  currentStory: 'the name of a story',
  contentItem: {},
})
const mockedState = fromJS({
  home: homePageState,
  graph: graphState,
})

describe('getImportDialogVisibility', () => {
  it('should select import dialog visibility', () => {
    const getImportDialogVisibilitySelector = getImportDialogVisibility()
    expect(getImportDialogVisibilitySelector(mockedState)).toEqual(false)
  })
})
describe('getLoadDialogVisibility', () => {
  it('should select load dialog visibility', () => {
    const getLoadDialogVisibilitySelector = getLoadDialogVisibility()
    expect(getLoadDialogVisibilitySelector(mockedState)).toEqual(false)
  })
})
describe('getSaveDialogVisibility', () => {
  it('should select save dialog visibility', () => {
    const getSaveDialogVisibilitySelector = getSaveDialogVisibility()
    expect(getSaveDialogVisibilitySelector(mockedState)).toEqual(false)
  })
})
describe('getCurrentStory', () => {
  it('should select the current story', () => {
    const getCurrentStorySelector = getCurrentStory()
    expect(getCurrentStorySelector(mockedState)).toEqual('the name of a story')
  })
})
describe('getLoadedStoryData', () => {
  it('should select the loaded story data', () => {
    const getLoadedStoryDataSelector = getLoadedStoryData()
    expect(getLoadedStoryDataSelector(mockedState).toJS()).toEqual({})
  })
})
describe('getContentItem', () => {
  it('should select the content item', () => {
    const getContentItemSelector = getContentItem()
    expect(getContentItemSelector(mockedState).toJS()).toEqual({})
  })
})
describe('getCurrentData', () => {
  it('should select the current data', () => {
    const getCurrentDataSelector = getCurrentData()
    expect(getCurrentDataSelector(mockedState)).toEqual(currentData)
  })
})
describe('getCurrentName', () => {
  it('should select the current name', () => {
    const getCurrentNameSelector = getCurrentName()
    expect(getCurrentNameSelector(mockedState)).toEqual('the name')
  })
})
describe('getAllNodes', () => {
  it('should select all nodes', () => {
    const getAllNodesSelector = getAllNodes()
    expect(getAllNodesSelector(mockedState).toArray()).toEqual([node1, node2])
  })
})
describe('getSelectedNode', () => {
  it('should select current node', () => {
    const getSelectedNodeSelector = getSelectedNode()
    expect(getSelectedNodeSelector(mockedState)).toEqual(node1)
  })
})
describe('getSelectedLink', () => {
  it('should select the current link', () => {
    const getSelectedLinkSelector = getSelectedLink()
    expect(getSelectedLinkSelector(mockedState)).toEqual(linkObject)
  })
})
describe('getLastSavedData', () => {
  it('should select last saved data', () => {
    const getLastSavedDataSelector = getLastSavedData()
    expect(getLastSavedDataSelector(mockedState)).toEqual(lastSavedData)
  })
})
describe('getSelectedNodeIncomingLinks', () => {
  it('should select current node\'s incoming link', () => {
    const getSelectedNodeIncomingLinksSelector = getSelectedNodeIncomingLinks()
    expect(getSelectedNodeIncomingLinksSelector(mockedState).toArray()).toEqual([])
  })
})
describe('getSelectedNodeOutgoingLinks', () => {
  it('should select current node\'s outgoing link', () => {
    const getSelectedNodeOutgoingLinksSelector = getSelectedNodeOutgoingLinks()
    expect(getSelectedNodeOutgoingLinksSelector(mockedState).toArray()).toEqual([linkObject])
  })
})
describe('isViewingOverview', () => {
  it('should select whether currently viewing the overview', () => {
    const isViewingOverviewSelector = isViewingOverview()
    expect(isViewingOverviewSelector(mockedState)).toEqual(false)
  })
})
