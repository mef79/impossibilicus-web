
import { fromJS } from 'immutable'
import graphReducer from '../reducer'

describe('graphReducer', () => {
  it('returns non-empty initial state', () => {
    expect(graphReducer(undefined, {})).not.toEqual(fromJS({}))
  })
})
