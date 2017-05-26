import { takeEvery, put } from 'redux-saga/effects'
import { setShouldRedraw } from 'containers/Graph/actions'
import { SAVE_CONTENT_ITEM } from 'containers/HomePage/constants'

export function* setRedraw() {
  yield put(setShouldRedraw(true))
}

// Individual exports for testing
export function* defaultSaga() {
  yield takeEvery(SAVE_CONTENT_ITEM, setRedraw)
}

// All sagas to be loaded
export default [
  defaultSaga
]
