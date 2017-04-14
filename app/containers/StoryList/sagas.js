// import { take, call, put, select } from 'redux-saga/effects'
import request from 'utils/request'
import { LOAD_ALL_STORIES } from 'containers/LoadDialog/constants'
import { storiesLoaded, storyLoadingError } from 'containers/LoadDialog/actions'
import { call, put, takeLatest } from 'redux-saga/effects'

/**
 * Github repos request/response handler
 */
export function* getStories() {
  const requestURL = 'http://localhost:5000/stories'
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL)
    yield put(storiesLoaded(repos))
  } catch (err) {
    yield put(storyLoadingError(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* storyData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ALL_STORIES, getStories) // eslint-disable-line no-unused-vars
}

export default [
  storyData
]
