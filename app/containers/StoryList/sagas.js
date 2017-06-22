import request from 'utils/request'
import { LOAD_ALL_STORIES } from 'containers/LoadDialog/constants'
import { storiesLoaded, storyLoadingError } from 'containers/LoadDialog/actions'
import { call, put, takeLatest } from 'redux-saga/effects'

export function* getStories() {
  const requestURL = `${process.env.API_HOST}/stories`
  try {
    const repos = yield call(request, requestURL)
    yield put(storiesLoaded(repos))
  } catch (err) {
    yield put(storyLoadingError(err))
  }
}

export function* storyData() {
  const watcher = yield takeLatest(LOAD_ALL_STORIES, getStories) // eslint-disable-line no-unused-vars
}

export default [
  storyData
]
