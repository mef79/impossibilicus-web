// import { take, call, put, select } from 'redux-saga/effects'
import { SET_SELECTED_NODE, SET_SELECTED_LINK } from './constants'
import { put, select, takeEvery } from 'redux-saga/effects'
import { setSelectedNode, setSelectedLink, setShouldRedraw } from './actions'
import { getSelectedNodeId, getSelectedLinkId } from './selectors'
// Individual exports for testing

export function* redrawAndClearSelectedLink() {
  const selectedLinkId = yield select(getSelectedLinkId())
  const selectedNodeId = yield select(getSelectedNodeId())
  if (selectedLinkId && selectedNodeId) {
    yield put(setSelectedLink(null))
  }
  yield put(setShouldRedraw(true))
}

export function* redrawAndClearSelectedNode() {
  const selectedNodeId = yield select(getSelectedNodeId())
  const selectedLinkId = yield select(getSelectedLinkId())
  if (selectedNodeId && selectedLinkId) {
    yield put(setSelectedNode(null))
  }
  yield put(setShouldRedraw(true))
}

export function* rootSaga() {
  // clear the selected link when selecting a node
  yield takeEvery(SET_SELECTED_NODE, redrawAndClearSelectedLink)

  // clear the selected node when selecting a link
  yield takeEvery(SET_SELECTED_LINK, redrawAndClearSelectedNode)
}

// All sagas to be loaded
export default [
  rootSaga
]
