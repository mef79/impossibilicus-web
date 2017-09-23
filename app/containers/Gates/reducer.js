/*
 *
 * Gates reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  UPDATE_FILTER_TEXT,
} from './constants'

const initialState = fromJS({
  gateTypes: ['Stat', 'Item', 'History', 'Quality', 'Open'],
  filterText: '',
})

function gatesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case UPDATE_FILTER_TEXT:
      return state.set('filterText', action.filterText)
    default:
      return state
  }
}

export default gatesReducer
