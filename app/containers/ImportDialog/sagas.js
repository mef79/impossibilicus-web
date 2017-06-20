import request from 'utils/request'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { IMPORT_STORY } from './constants'
import { getFile, getName } from './selectors'
import { updateLastSaved, hideImportDialog, storyLoaded } from 'containers/HomePage/actions'

export function* importStory() {
  const file = yield select(getFile())
  const name = yield select(getName())
  const requestURL = `${process.env.API_HOST}/storyImport/${name}`
  const data = new FormData()
  data.append('file', file)

  try {
    const story = yield call(request, requestURL, {
      method: 'POST',
      body: data,
    })

    yield put(updateLastSaved(data))
    yield put(hideImportDialog())
    yield put(storyLoaded(story))
  }
  catch (err) {
    // todo: feedback
  }
}

export function* rootSaga() {
  yield takeEvery(IMPORT_STORY, importStory)
}

export default [
  rootSaga
]
