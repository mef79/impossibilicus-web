/*
 *
 * OverviewPage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION
} from './constants'

const initialState = fromJS({
  variables: [{
    name: 'intelligence',
    type: 'stat',
    min: 0,
    max: 100,
  }, {
    name: 'book',
    type: 'item',
  }]
})

function overviewPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    default:
      return state
  }
}

export default overviewPageReducer
