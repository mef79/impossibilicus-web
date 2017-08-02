import { fromJS } from 'immutable'
import {
  getLoadedStories,
  getLoadingError,
  getLoadingState,
} from '../selectors'

const stories = fromJS([
  {
    name: 'story 1',
    nodes: [],
    links: [],
  },
])
const loadDialogState = fromJS({
  loading: true,
  error: false,
  stories,
})
const mockedState = fromJS({
  loadDialog: loadDialogState,
})

describe('getLoadedStories', () => {
  it('should select the loaded stories', () => {
    const getLoadedStoriesSelector = getLoadedStories()
    expect(getLoadedStoriesSelector(mockedState)).toEqual(stories)
  })
})

describe('getLoadingError', () => {
  it('should select the loading error', () => {
    const getLoadingErrorSelector = getLoadingError()
    expect(getLoadingErrorSelector(mockedState)).toEqual(false)
  })
})

describe('getLoadingState', () => {
  it('should select the loading state', () => {
    const getLoadingStateSelector = getLoadingState()
    expect(getLoadingStateSelector(mockedState)).toEqual(true)
  })
})
