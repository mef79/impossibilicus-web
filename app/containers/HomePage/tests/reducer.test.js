
import { fromJS } from 'immutable'
import homePageReducer from '../reducer'
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
  updateLastSaved,
  lockLink,
  unlockLink,
  resetStory,
  toggleOverview,
} from '../actions'

describe('homePageReducer', () => {
  let state
  const initialState = fromJS({
    isImportDialogVisible: false,
    isLoadDialogVisible: false,
    isSaveDialogVisible: false,
    loadedStory: {},
    currentData: {
      nodes: [],
      links: [],
    },
    lastSavedData: {},
    selectedNode: {},
    overview: false,
  })
  beforeEach(() => {
    const currentData = {
      nodes: [{ id: 'node-1' }],
      links: [
        {
          id: 'link-1',
          locked: false
        }, {
          id: 'link-2',
          locked: true
        }
      ]
    }
    state = fromJS({
      isImportDialogVisible: false,
      isLoadDialogVisible: false,
      isSaveDialogVisible: false,
      isListening: false,
      loadedStory: {},
      currentData,
      lastSavedData: {},
      selectedNode: {},
      overview: false,
    })
  })
  it('returns the initial state', () => {
    expect(homePageReducer(undefined, {})).toEqual(initialState)
  })
  it('should handle the showImportDialog action correctly', () => {
    const expectedResult = state.set('isImportDialogVisible', true)
    expect(homePageReducer(state, showImportDialog())).toEqual(expectedResult)
  })
  it('should handle the hideImportDialog action correctly', () => {
    const expectedResult = state.set('isImportDialogVisible', false)
    expect(homePageReducer(state, hideImportDialog())).toEqual(expectedResult)
  })
  it('should handle the showLoadDialog action correctly', () => {
    const expectedResult = state.set('isLoadDialogVisible', true)
    expect(homePageReducer(state, showLoadDialog())).toEqual(expectedResult)
  })
  it('should handle the hideLoadDialog action correctly', () => {
    const expectedResult = state.set('isLoadDialogVisible', false)
    expect(homePageReducer(state, hideLoadDialog())).toEqual(expectedResult)
  })
  it('should handle the showSaveDialog action correctly', () => {
    const expectedResult = state.set('isSaveDialogVisible', true)
    expect(homePageReducer(state, showSaveDialog())).toEqual(expectedResult)
  })
  it('should handle the hideSaveDialog action correctly', () => {
    const expectedResult = state.set('isSaveDialogVisible', false)
    expect(homePageReducer(state, hideSaveDialog())).toEqual(expectedResult)
  })
  it('should handle the loadStory action correctly', () => {
    // load story doesn't actually change anything in the state..
    const expectedResult = state.set('loadStory', undefined)
    expect(homePageReducer(state, loadStory())).toEqual(expectedResult)
  })
  it('should handle the storyLoaded action correctly', () => {
    const someStoryData = {
      attr1: 'whatever',
      attr2: 'also whatever',
      name: 'some name',
      _id: 'an ID',
    }
    const expectedResult = state
      .set('loadedStory', fromJS(someStoryData))
      .set('lastSavedData', fromJS(someStoryData))
      .setIn(['currentData', 'name'], 'some name')
      .setIn(['currentData', '_id'], 'an ID')
    expect(homePageReducer(state, storyLoaded(someStoryData))).toEqual(expectedResult)
  })
  it('should handle the storyLoadError action correctly', () => {
    const expectedResult = state.set('isListening', false)
    expect(homePageReducer(state, storyLoadError(false))).toEqual(expectedResult)
  })
  it('should handle the clearLoadedStory action correctly', () => {
    const expectedResult = state.set('isListening', false)
    expect(homePageReducer(state, clearLoadedStory(false))).toEqual(expectedResult)
  })
  it('should handle the saveContentItem action correctly', () => {
    const contentItem = {
      title: 'a title',
      content: 'a content',
    }
    const expectedResult = state
      .setIn(['currentData', 'nodes', 0, 'title'], contentItem.title)
      .setIn(['currentData', 'nodes', 0, 'content'], contentItem.content)
    expect(homePageReducer(state, saveContentItem(contentItem))).toEqual(expectedResult)
  })
  it('should handle the updateStoryName action correctly', () => {
    const expectedResult = state.setIn(['currentData', 'name'], 'whatever name')
    expect(homePageReducer(state, updateStoryName('whatever name'))).toEqual(expectedResult)
  })
  it('should handle the updateLastSaved action correctly', () => {
    const lastSaved = fromJS({
      some: 'object',
      is: 'here',
    })
    const expectedResult = state.set('lastSavedData', lastSaved)
    expect(homePageReducer(state, updateLastSaved(lastSaved))).toEqual(expectedResult)
  })
  it('should handle the lockLink action correctly', () => {
    const expectedResult = state.setIn(['currentData', 'links', 0, 'locked'], true)
    expect(homePageReducer(state, lockLink('link-1'))).toEqual(expectedResult)
  })
  it('should handle the unlockLink action correctly', () => {
    const expectedResult = state.setIn(['currentData', 'links', 1, 'locked'], false)
    expect(homePageReducer(state, unlockLink('link-2'))).toEqual(expectedResult)
  })
  it('should handle the resetStory action correctly', () => {
    const expectedResult = state.set('isListening', false)
    expect(homePageReducer(state, resetStory(false))).toEqual(expectedResult)
  })
  it('should handle the toggleOverview action correctly', () => {
    const expectedResult = state.set('overview', true)
    expect(homePageReducer(state, toggleOverview())).toEqual(expectedResult)
  })
})
