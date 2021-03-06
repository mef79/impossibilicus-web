import request from 'utils/request'
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { SAVE_STORY } from './constants'
import { getEnteredName } from './selectors'
import { hideSaveDialog, updateLastSaved, updateStoryName } from 'containers/HomePage/actions'
import { UPDATE_STORY, SAVE_CONTENT_ITEM } from 'containers/HomePage/constants'
import { getCurrentData, getLastSavedData } from 'containers/HomePage/selectors'
import { getNodeCount, getLinkCount } from 'containers/Graph/selectors'

/**
 * Github repos request/response handler
 */
export function* postNewStory() {
  const requestURL = `${process.env.API_HOST}/story`
  // Call our request helper (see 'utils/request')
  const name = yield select(getEnteredName())
  const data = yield select(getCurrentData())

  // underscores instead of camel case because the API is in Python
  const link_counter = yield select(getLinkCount()) // eslint-disable-line camelcase
  const node_counter = yield select(getNodeCount()) // eslint-disable-line camelcase

  const { nodes, links } = data.toJS()

  yield call(request, requestURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, nodes, links, link_counter, node_counter })
  })
  // TODO: feedback
  yield put(updateStoryName(name))
  yield put(updateLastSaved(data))
  yield put(hideSaveDialog())
}

export function* postUpdatedStory() {
  const current = yield select(getCurrentData())
  const lastSaved = yield select(getLastSavedData())

  const changed = nodesChanged(current.get('nodes'), lastSaved.get('nodes')) ||
    linksChanged(current.get('links'), lastSaved.get('links'))

  if (changed) {
    const requestURL = `${process.env.API_HOST}/story/${current.get('name')}`
    try {
      yield call(request, requestURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: current.get('name'),
          nodes: current.get('nodes').toJS(),
          links: current.get('links').toJS(),
          node_counter: yield select(getNodeCount()), // eslint-disable-line camelcase
          link_counter: yield select(getLinkCount()), // eslint-disable-line camelcase
        })
      })
      // make API call
      // update lastSaved in state
      yield put(updateLastSaved(current))
    }
    catch (err) {
      // todo: some form of feedback
      // console.log('update failed')
    }
  }
}

function nodesChanged(newNodes, oldNodes) {
  // nothing to compare against
  if (!oldNodes) {
    return false
  }

  // skip all comparison if there is a different number of nodes
  if (newNodes.size !== oldNodes.size) {
    return true
  }

  const newMap = generateMap(newNodes)
  const oldMap = generateMap(oldNodes)

  // equally lame huge chain of comparisons, not sure how to get around this
  // use .some() to break out as soon as a comparison shows it's changed
  let changed = Object.keys(newMap).some(e => {
    const a = newMap[e]
    const b = oldMap[e]
    changed = changed || !b
    changed = changed || a.content !== b.content
    changed = changed || a.title !== b.title
    changed = changed || a.x - b.x > 5
    changed = changed || a.y - b.y > 5
    changed = changed || a.px - b.px > 5
    changed = changed || a.py - b.py > 5
    return changed
  })
  return changed
}

function linksChanged(newLinks, oldLinks) {
  if (!oldLinks) {
    return false
  }
  if (newLinks.size !== oldLinks.size) {
    return true
  }
  const newMap = generateMap(newLinks)
  const oldMap = generateMap(oldLinks)

  let changed = Object.keys(newMap).some(e => {
    const a = newMap[e]
    const b = oldMap[e]
    changed = changed || !b
    changed = changed || a.target.id !== b.target.id
    changed = changed || a.source.id !== b.source.id
    return changed
  })
  return changed
}

function generateMap(immutableList) {
  const tempArray = immutableList.toJS()
  const map = {}
  tempArray.forEach(e => {
    map[e.id] = e
  })
  return map
}

export function* rootSaga() {
  yield takeEvery(SAVE_STORY, postNewStory)
  yield takeLatest(UPDATE_STORY, postUpdatedStory)
  yield takeEvery(SAVE_CONTENT_ITEM, postUpdatedStory)
}

export default [
  rootSaga
]
