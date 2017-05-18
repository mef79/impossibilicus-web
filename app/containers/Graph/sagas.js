// import { take, call, put, select } from 'redux-saga/effects'
import { SET_SELECTED_NODE, SET_SELECTED_LINK } from './constants'
import { put, select, takeEvery } from 'redux-saga/effects'
import { setSelectedNode, setSelectedLink } from './actions'
import { getSelectedNodeId, getSelectedLinkId } from './selectors'
// Individual exports for testing

export function* clearSelectedLink() {
  const selectedLinkId = yield select(getSelectedLinkId())
  if (selectedLinkId) {
    yield put(setSelectedLink(null))
  }
}

export function* clearSelectedNode() {
  const selectedNodeId = yield select(getSelectedNodeId())
  if (selectedNodeId) {
    yield put(setSelectedNode(null))
  }
}

export function* rootSaga() {
  yield takeEvery(SET_SELECTED_NODE, clearSelectedLink)
  yield takeEvery(SET_SELECTED_LINK, clearSelectedNode)
}

// All sagas to be loaded
export default [
  rootSaga
]
