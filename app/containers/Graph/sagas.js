import { put, select, takeEvery } from 'redux-saga/effects'
import { SET_SELECTED_NODE, SET_SELECTED_LINK } from './constants'
import {
  LOAD_STORY_SUCCESS,
  RESET_STORY,
  TOGGLE_OVERVIEW
} from 'containers/HomePage/constants'
import {
  setSelectedNode,
  setSelectedLink,
  setShouldRedraw,
  setShouldInitialize,
  setNodeCounter,
  setLinkCounter
} from './actions'
import { getSelectedNodeId, getSelectedLinkId } from './selectors'
import { getLoadedStoryData } from 'containers/HomePage/selectors'
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

export function* setNodeAndLinkCounters() {
  const loaded = yield select(getLoadedStoryData())
  // console.log(loaded.get('node_counter'))
  // console.log(loaded.get('link_counter'))
  const nodeCounter = loaded.get('node_counter')
  const linkCounter = loaded.get('link_counter')
  yield put(setNodeCounter(nodeCounter))
  yield put(setLinkCounter(linkCounter))
  yield put(setShouldInitialize(true))
}

export function* resetNodeAndLinkCounters() {
  yield put(setNodeCounter(0))
  yield put(setLinkCounter(0))
}

export function* redrawOnStoryReset() {
  const nodeCounter = 0
  const linkCounter = 0
  yield put(setNodeCounter(nodeCounter))
  yield put(setLinkCounter(linkCounter))
  yield put(setShouldInitialize(true))
}


export function* rootSaga() {
  // clear the selected link when selecting a node
  yield takeEvery(SET_SELECTED_NODE, redrawAndClearSelectedLink)

  // clear the selected node when selecting a link
  yield takeEvery(SET_SELECTED_LINK, redrawAndClearSelectedNode)

  // watch for story loaded to set the node and link counters
  yield takeEvery(LOAD_STORY_SUCCESS, setNodeAndLinkCounters)

  yield takeEvery(RESET_STORY, redrawOnStoryReset)

  yield takeEvery(TOGGLE_OVERVIEW, resetNodeAndLinkCounters)
}

// All sagas to be loaded
export default [
  rootSaga
]
