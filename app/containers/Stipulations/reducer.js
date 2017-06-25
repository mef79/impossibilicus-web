/*
 *
 * Stipulations reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION
} from './constants'

const initialState = fromJS({
  stipulations: ['some', 'stipulations', 'here', 'quite', 'good', 'stipu', 'som']
})

function stipulationsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    default:
      return state
  }
}

export default stipulationsReducer
