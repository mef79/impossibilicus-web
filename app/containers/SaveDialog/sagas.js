import request from 'utils/request'
import { SAVE_STORY } from './constants'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { getStoryName } from './selectors'
import { hideSaveDialog } from 'containers/HomePage/actions'
import { getCurrentData } from 'containers/HomePage/selectors'

/**
 * Github repos request/response handler
 */
export function* postStory() {
  const requestURL = `${process.env.API_HOST}/story`
  // Call our request helper (see 'utils/request')
  const name = yield select(getStoryName())
  const data = yield select(getCurrentData())
  const { nodes, links } = data.toJS()
  yield call(request, requestURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, nodes, links })
  })
  // TODO: feedback
  yield put(hideSaveDialog())
}

export function* rootSaga() {
  yield takeEvery(SAVE_STORY, postStory)
}

export default [
  rootSaga
]
