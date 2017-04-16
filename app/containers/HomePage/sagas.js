// import { take, call, put, select } from 'redux-saga/effects'
import request from 'utils/request'
import { LOAD_STORY } from './constants'
import { storyLoaded, storyLoadError } from './actions'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { makeSelectCurrentStory } from './selectors'

/**
 * Github repos request/response handler
 */
export function* getStory() {
  const storyName = yield select(makeSelectCurrentStory())
  const requestURL = `${process.env.API_HOST}/story/${storyName}`
  try {
    // Call our request helper (see 'utils/request')
    const story = yield call(request, requestURL)
    yield put(storyLoaded(story))
  } catch (err) {
    yield put(storyLoadError(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* storyData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_STORY, getStory) // eslint-disable-line no-unused-vars
}

export default [
  storyData
]
