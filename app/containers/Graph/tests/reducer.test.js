
import { fromJS } from 'immutable'
import graphReducer from '../reducer'

describe('graphReducer', () => {
  it('returns the initial state', () => {
    expect(graphReducer(undefined, {})).toEqual(fromJS({}))
  })
})
