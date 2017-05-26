// import { take, call, put, select } from 'redux-saga/effects'
import { SET_SELECTED_NODE, SET_SELECTED_LINK } from './constants'
import { put, select, takeEvery } from 'redux-saga/effects'
import { setSelectedNode, setSelectedLink } from './actions'
import { getSelectedNodeId, getSelectedLinkId } from './selectors'
// Individual exports for testing

export function* clearSelectedLink() {
  const selectedLinkId = yield select(getSelectedLinkId())
  const selectedNodeId = yield select(getSelectedNodeId())
  if (selectedLinkId && selectedNodeId) {
    yield put(setSelectedLink(null))
  }
}

export function* clearSelectedNode() {
  const selectedNodeId = yield select(getSelectedNodeId())
  const selectedLinkId = yield select(getSelectedLinkId())
  if (selectedNodeId && selectedLinkId) {
    yield put(setSelectedNode(null))
  }
}

export function* rootSaga() {
  // clear the selected link when selecting a node
  yield takeEvery(SET_SELECTED_NODE, clearSelectedLink)

  // clear the selected node when selecting a link
  yield takeEvery(SET_SELECTED_LINK, clearSelectedNode)
}

// All sagas to be loaded
export default [
  rootSaga
]
